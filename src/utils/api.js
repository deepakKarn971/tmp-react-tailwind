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
    if (options.body) console.log('Request payload:', options.body);

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
