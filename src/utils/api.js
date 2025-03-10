
/**
 * API utility functions for making HTTP requests
 */

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://merchant-cug.twidpay.com";

/**
 * Makes a fetch request with common headers and error handling
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<any>} - Response data
 */
export const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default headers
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...(options.headers || {})
    };

    // Default options
    const fetchOptions = {
      mode: "cors",
      credentials: "include",
      ...options,
      headers
    };

    console.info(`API Request: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

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
    body: JSON.stringify({ email, password })
  });
};

/**
 * Fetch analytics data for dashboard graphs
 * @param {string} graphType - Type of graph (transactions, users, etc.)
 * @param {string} range - Range period (7days, 30days, 12months)
 * @param {Date} fromDate - Start date for the range
 * @param {Date} toDate - End date for the range
 * @returns {Promise<Object>} - Graph data and options
 */
export const fetchAnalyticsData = (graphType, range, fromDate, toDate) => {
  const params = new URLSearchParams();
  params.append('graphType', graphType);
  
  if (range) {
    params.append('range', range);
  }
  
  if (fromDate) {
    params.append('fromDate', fromDate.toISOString().split('T')[0]);
  }
  
  if (toDate) {
    params.append('toDate', toDate.toISOString().split('T')[0]);
  }
  
  return fetchApi(`/dashboardmerchant-dashboard/v1/analytics/aggregated?${params.toString()}`);
};

/**
 * Process the analytics API response to extract graph data
 * @param {Object} response - The API response object
 * @returns {Object} - Processed data for dashboard display
 */
export const processAnalyticsResponse = (response) => {
  if (!response || !response.data) {
    return {
      successRate: null,
      transactionData: []
    };
  }

  const data = response.data;
  
  // Check if data is an array of objects (success rate format)
  if (data.some(item => item && typeof item === 'object' && item.title === "Success Rate")) {
    const successRateData = data.find(item => item && item.title === "Success Rate") || null;
    return {
      successRate: successRateData,
      transactionData: []
    };
  }
  
  // Check if data is in the transaction format (array of arrays)
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    // Skip the header row (index 0)
    const processedData = data.slice(1).map(item => {
      return {
        name: item[0],
        value: parseInt(item[1], 10)
      };
    });
    
    return {
      successRate: null,
      transactionData: processedData
    };
  }
  
  // Default return if data format doesn't match known patterns
  return {
    successRate: null,
    transactionData: []
  };
};

// Add more API functions as needed
