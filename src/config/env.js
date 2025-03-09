
/**
 * Environment configuration
 * 
 * This file centralizes access to environment variables
 * Import this file instead of directly using import.meta.env
 */

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://merchant-cug.twidpay.com",
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 30000,
};

// Auth configuration
export const AUTH_CONFIG = {
  TOKEN_EXPIRY_DAYS: import.meta.env.VITE_TOKEN_EXPIRY_DAYS || 1,
  AUTH_COOKIE_NAME: import.meta.env.VITE_AUTH_COOKIE_NAME || "auth_token",
};

// App configuration
export const APP_CONFIG = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Twid Dashboard",
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === "true" || false,
};

