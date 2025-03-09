
// Cookie management utility functions

/**
 * Sets a cookie with the specified name, value, and expiry days
 */
export const setCookie = (name, value, expiryDays) => {
  const date = new Date();
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Gets a cookie value by name
 */
export const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
};

/**
 * Checks if a cookie exists
 */
export const checkCookie = (name) => {
  const cookie = getCookie(name);
  return cookie !== "";
};

/**
 * Deletes a cookie by name
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};
