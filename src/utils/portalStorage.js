/**
 * Local Storage utilities for the Student Past Papers Portal
 */

import { STORAGE_KEYS, AUTH_EXPIRY_DAYS } from './portalConstants';

/**
 * Safely parse JSON from localStorage
 */
const safeJSONParse = (value, defaultValue = null) => {
  try {
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 */
const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error setting localStorage item:', error);
    return false;
  }
};

/**
 * Bookmark Management
 */
export const getBookmarks = () => {
  const bookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  return safeJSONParse(bookmarks, []);
};

export const addBookmark = (paperId) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.includes(paperId)) {
    bookmarks.push(paperId);
    return safeSetItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
  }
  return true;
};

export const removeBookmark = (paperId) => {
  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter(id => id !== paperId);
  return safeSetItem(STORAGE_KEYS.BOOKMARKS, filtered);
};

export const isBookmarked = (paperId) => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(paperId);
};

/**
 * Recently Viewed Management
 */
export const getRecentlyViewed = () => {
  const recent = localStorage.getItem(STORAGE_KEYS.RECENT);
  return safeJSONParse(recent, []);
};

export const addToRecent = (paperId, maxItems = 10) => {
  let recent = getRecentlyViewed();
  // Remove if already exists
  recent = recent.filter(id => id !== paperId);
  // Add to beginning
  recent.unshift(paperId);
  // Limit to maxItems
  recent = recent.slice(0, maxItems);
  return safeSetItem(STORAGE_KEYS.RECENT, recent);
};

/**
 * Authentication Management
 */
export const setAuthToken = (token) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + AUTH_EXPIRY_DAYS);
  
  const authData = {
    token,
    expiry: expiry.toISOString()
  };
  
  return safeSetItem(STORAGE_KEYS.AUTH, authData);
};

export const getAuthToken = () => {
  const authData = localStorage.getItem(STORAGE_KEYS.AUTH);
  return safeJSONParse(authData, null);
};

export const isAuthenticated = () => {
  const authData = getAuthToken();
  if (!authData || !authData.token || !authData.expiry) {
    return false;
  }
  
  const expiryDate = new Date(authData.expiry);
  const now = new Date();
  
  return expiryDate > now;
};

export const clearAuth = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    return true;
  } catch (error) {
    console.error('Error clearing auth:', error);
    return false;
  }
};

/**
 * User Preferences Management
 */
export const getPreferences = () => {
  const prefs = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return safeJSONParse(prefs, {
    filters: {
      grade: null,
      subject: null,
      year: null,
      examType: null,
      searchQuery: ''
    },
    viewMode: 'grid'
  });
};

export const savePreferences = (preferences) => {
  return safeSetItem(STORAGE_KEYS.PREFERENCES, preferences);
};

export const updateFilterPreferences = (filters) => {
  const prefs = getPreferences();
  prefs.filters = filters;
  return savePreferences(prefs);
};

export const updateViewMode = (viewMode) => {
  const prefs = getPreferences();
  prefs.viewMode = viewMode;
  return savePreferences(prefs);
};

/**
 * Clear all portal data
 */
export const clearAllPortalData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing portal data:', error);
    return false;
  }
};

// Export all functions as a single object for convenience
export const PortalStorage = {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  getRecentlyViewed,
  addToRecent,
  setAuthToken,
  getAuthToken,
  isAuthenticated,
  clearAuth,
  getPreferences,
  savePreferences,
  updateFilterPreferences,
  updateViewMode,
  clearAllPortalData
};
