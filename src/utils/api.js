/**
 * API utility functions for making HTTP requests
 */

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://merchant-cug.twidpay.com";
import { getCookie, checkCookie } from "./cookieUtils";
import { AUTH_CONFIG } from "../config/env";

/**
 * Makes a fetch request with common headers and error handling
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<any>} - Response data
 */
export const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Get auth token from cookie if available
    const auth_token = checkCookie(AUTH_CONFIG.AUTH_COOKIE_NAME) ? getCookie(AUTH_CONFIG.AUTH_COOKIE_NAME) : null;
    
    // Default headers
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(auth_token && { Authorization: `Bearer ${auth_token}` }),
      ...(options.headers || {})
    };

    // Default options
    const fetchOptions = {
      mode: "cors",
      credentials: "include",
      ...options,
      headers,
    };

    console.info(`API Request: ${options.method || "GET"} ${url}`);
    console.log('Request payload:', options.body);

    const response = await fetch(url, fetchOptions);
    
    // Try to parse JSON response, but handle non-JSON responses gracefully
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
      try {
        // Try to parse as JSON in case content type header is wrong
        data = JSON.parse(data);
      } catch (e) {
        // Keep as text if not JSON
      }
    }

    console.log('API Response:', data);

    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

/**
 * Login API call
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Response with token and user data
 */
export const loginApi = (email, password) => {
  return fetchApi("/dashboard/auth-dashboard/v1/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Fetch analytics data for dashboard graphs using POST request
 * @param {string} graphType - Type of graph (transactions, users, etc.)
 * @param {string} range - Range period (7days, 30days, 12months)
 * @param {Date} fromDate - Start date for the range
 * @param {Date} toDate - End date for the range
 * @returns {Promise<Object>} - Graph data and options
 */
export const fetchAnalyticsData = (graphType, range, fromDate, toDate) => {
  return fetchApi(
    `/dashboard/merchant-dashboard/v1/analytics/aggregated?graphType=${graphType}`,
    {
      method: "POST",
      body: JSON.stringify({
        range: range || "last7days",
        fromDate: fromDate ? fromDate.toISOString() : null,
        toDate: toDate ? toDate.toISOString() : null,
        graphType: graphType,
      }),
    }
  );
};

/**
 * Process the analytics API response to extract graph data
 * @param {Object} response - The API response object
 * @returns {Object} - Processed data for dashboard display
 */
export const processAnalyticsResponse = (response) => {
  // For debugging
  console.log('Processing analytics response:', response);
  
  if (!response || !response.data) {
    console.warn('No data in response:', response);
    return {
      successRate: null,
      transactionData: [],
    };
  }

  const data = response.data;
  
  // Check if data is an array of objects (success rate format)
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null) {
    console.log('Detected object format data');
    
    const successRateData = data.find(item => item && item.title === "Success Rate") || null;
    
    // Transform transaction data if it's in the right format
    let transactionData = [];
    
    // Look for transaction data
    const transactionItem = data.find(item => 
      item && item.title && 
      (item.title.includes('Transaction') || item.title.includes('transactions'))
    );
    
    if (transactionItem && Array.isArray(transactionItem.dataArray)) {
      transactionData = transactionItem.dataArray.map((value, index) => ({
        name: `Day ${index + 1}`,
        value: Number(value) || 0
      }));
    }
    
    return {
      successRate: successRateData,
      transactionData: transactionData.length > 0 ? transactionData : []
    };
  }

  // Check if data is in the transaction format (array of arrays)
  if (Array.isArray(data) && data.length > 0) {
    console.log('Detected array format data');
    
    // If first item is an array, it's likely [headers, ...data] format
    if (Array.isArray(data[0])) {
      // Skip the header row (index 0) if it exists
      const processedData = data.slice(1).map((item) => {
        return {
          name: item[0] || `Item ${item}`,
          value: typeof item[1] === 'number' ? item[1] : parseInt(item[1], 10) || 0
        };
      });
      
      return {
        successRate: null,
        transactionData: processedData
      };
    }
    
    // Otherwise, try to map each item as a data point
    const processedData = data.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        return {
          name: item.name || item.label || `Item ${index + 1}`,
          value: item.value || item.count || 0
        };
      }
      return {
        name: `Item ${index + 1}`,
        value: typeof item === 'number' ? item : 0
      };
    });
    
    return {
      successRate: null,
      transactionData: processedData
    };
  }

  // Try to handle data if it's a single object with nested arrays/properties
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    console.log('Detected complex object data');
    
    // Look for arrays that might contain our data
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        const processedData = data[key].map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return {
              name: item.name || item.label || `Item ${index + 1}`,
              value: Number(item.value || item.count) || 0
            };
          }
          return {
            name: `Item ${index + 1}`,
            value: Number(item) || 0
          };
        });
        
        return {
          successRate: null,
          transactionData: processedData
        };
      }
    }
  }

  // Default return if data format doesn't match known patterns
  console.warn('Could not process data format:', data);
  return {
    successRate: null,
    transactionData: [],
  };
};

// Mock data generation for fallback when API fails
export const getMockTransactionData = (timeframe) => {
  const mockData = {
    "7days": [
      { name: "Mon", value: 18885 },
      { name: "Tue", value: 31888 },
      { name: "Wed", value: 327023 },
      { name: "Thu", value: 1159839 },
    ],
    "30days": [
      { name: "Week 1", value: 245000 },
      { name: "Week 2", value: 320000 },
      { name: "Week 3", value: 480000 },
      { name: "Week 4", value: 560000 },
    ],
    "12months": [
      { name: "Jan", value: 1200000 },
      { name: "Feb", value: 1350000 },
      { name: "Mar", value: 1100000 },
      { name: "Apr", value: 1450000 },
      { name: "May", value: 1600000 },
      { name: "Jun", value: 1750000 },
    ],
  };
  return mockData[timeframe] || [];
};

export const getMockUserData = (timeframe) => {
  const mockData = {
    "7days": [
      { name: "Mon", value: 28276 },
      { name: "Tue", value: 225498 },
      { name: "Wed", value: 693058 },
    ],
    "30days": [
      { name: "Week 1", value: 190000 },
      { name: "Week 2", value: 230000 },
      { name: "Week 3", value: 310000 },
      { name: "Week 4", value: 380000 },
    ],
    "12months": [
      { name: "Jan", value: 850000 },
      { name: "Feb", value: 920000 },
      { name: "Mar", value: 880000 },
      { name: "Apr", value: 980000 },
      { name: "May", value: 1050000 },
      { name: "Jun", value: 1150000 },
    ],
  };
  return mockData[timeframe] || [];
};
