/**
 * Property-based tests for portal storage utilities
 * Feature: student-past-papers-portal
 */

const fc = require('fast-check');
const {
  addBookmark,
  removeBookmark,
  getBookmarks,
  isBookmarked,
  setAuthToken,
  getAuthToken,
  isAuthenticated,
  clearAuth,
  getPreferences,
  savePreferences,
  clearAllPortalData
} = require('./portalStorage');
const { STORAGE_KEYS } = require('./portalConstants');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Portal Storage - Property Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  /**
   * Feature: student-past-papers-portal, Property 18: Bookmark persistence
   * Validates: Requirements 8.1, 8.4
   */
  it('Property 18: Bookmark persistence - bookmarks persist across operations', () => {
    fc.assert(
      fc.property(
        fc.array(fc.uuid(), { minLength: 1, maxLength: 20 }),
        (paperIds) => {
          // Clear storage
          localStorage.clear();
          
          // Add all bookmarks
          paperIds.forEach(id => addBookmark(id));
          
          // Get bookmarks
          const bookmarks = getBookmarks();
          
          // All paper IDs should be in bookmarks
          const allPresent = paperIds.every(id => bookmarks.includes(id));
          
          // Bookmarks should persist (can be retrieved again)
          const bookmarksAgain = getBookmarks();
          const stillPresent = paperIds.every(id => bookmarksAgain.includes(id));
          
          return allPresent && stillPresent;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 19: Bookmark removal correctness
   * Validates: Requirements 8.3
   */
  it('Property 19: Bookmark removal correctness - removed bookmarks are not present', () => {
    fc.assert(
      fc.property(
        fc.array(fc.uuid(), { minLength: 2, maxLength: 20 }),
        (paperIds) => {
          // Clear storage
          localStorage.clear();
          
          // Add all bookmarks
          paperIds.forEach(id => addBookmark(id));
          
          // Remove first bookmark
          const toRemove = paperIds[0];
          removeBookmark(toRemove);
          
          // Get bookmarks
          const bookmarks = getBookmarks();
          
          // Removed ID should not be present
          const notPresent = !bookmarks.includes(toRemove);
          
          // Other IDs should still be present
          const othersPresent = paperIds.slice(1).every(id => bookmarks.includes(id));
          
          return notPresent && othersPresent;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 20: Favorites display accuracy
   * Validates: Requirements 8.2
   */
  it('Property 20: Favorites display accuracy - bookmarks match stored IDs', () => {
    fc.assert(
      fc.property(
        fc.array(fc.uuid(), { minLength: 0, maxLength: 20 }),
        (paperIds) => {
          // Clear storage
          localStorage.clear();
          
          // Add bookmarks
          paperIds.forEach(id => addBookmark(id));
          
          // Get bookmarks
          const bookmarks = getBookmarks();
          
          // Should have exactly the same IDs (order may differ)
          const sameLength = bookmarks.length === paperIds.length;
          const allPresent = paperIds.every(id => bookmarks.includes(id));
          
          return sameLength && allPresent;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 26: Authentication token storage
   * Validates: Requirements 11.2
   */
  it('Property 26: Authentication token storage - token stored with 30-day expiry', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 50 }),
        (token) => {
          // Clear storage
          localStorage.clear();
          
          // Set auth token
          const now = new Date();
          setAuthToken(token);
          
          // Get auth data
          const authData = getAuthToken();
          
          // Should have token
          const hasToken = authData && authData.token === token;
          
          // Should have expiry
          const hasExpiry = authData && authData.expiry;
          
          // Expiry should be in the future
          if (hasExpiry) {
            const expiryDate = new Date(authData.expiry);
            const diffDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
            
            // Should be approximately 30 days (allow 29-31 for timing)
            const correctExpiry = diffDays >= 29 && diffDays <= 31;
            
            return hasToken && correctExpiry;
          }
          
          return false;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 27: Expired session handling
   * Validates: Requirements 11.4
   */
  it('Property 27: Expired session handling - expired tokens are not authenticated', () => {
    // Clear storage
    localStorage.clear();
    
    // Set an expired token manually
    const expiredAuthData = {
      token: 'test-token',
      expiry: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // Yesterday
    };
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(expiredAuthData));
    
    // Should not be authenticated
    const authenticated = isAuthenticated();
    
    expect(authenticated).toBe(false);
  });

  it('Property 27b: Valid session handling - valid tokens are authenticated', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 50 }),
        (token) => {
          // Clear storage
          localStorage.clear();
          
          // Set valid token
          setAuthToken(token);
          
          // Should be authenticated
          const authenticated = isAuthenticated();
          
          return authenticated === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 28: Filter preferences persistence
   * Validates: Requirements 11.5
   */
  it('Property 28: Filter preferences persistence - preferences persist across operations', () => {
    fc.assert(
      fc.property(
        fc.record({
          filters: fc.record({
            grade: fc.option(fc.integer({ min: 8, max: 12 }), { nil: null }),
            subject: fc.option(fc.string(), { nil: null }),
            year: fc.option(fc.integer({ min: 2015, max: 2024 }), { nil: null }),
            examType: fc.option(fc.string(), { nil: null }),
            searchQuery: fc.string()
          }),
          viewMode: fc.constantFrom('grid', 'list')
        }),
        (preferences) => {
          // Clear storage
          localStorage.clear();
          
          // Save preferences
          savePreferences(preferences);
          
          // Get preferences
          const retrieved = getPreferences();
          
          // Should match saved preferences
          const filtersMatch = JSON.stringify(retrieved.filters) === JSON.stringify(preferences.filters);
          const viewModeMatches = retrieved.viewMode === preferences.viewMode;
          
          return filtersMatch && viewModeMatches;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Bookmark idempotence
   */
  it('Bookmark idempotence - adding same bookmark multiple times results in single entry', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.integer({ min: 2, max: 10 }),
        (paperId, times) => {
          // Clear storage
          localStorage.clear();
          
          // Add same bookmark multiple times
          for (let i = 0; i < times; i++) {
            addBookmark(paperId);
          }
          
          // Get bookmarks
          const bookmarks = getBookmarks();
          
          // Should only have one entry
          const count = bookmarks.filter(id => id === paperId).length;
          
          return count === 1 && bookmarks.length === 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Clear all portal data
   */
  it('Clear all portal data removes all storage keys', () => {
    // Add various data
    addBookmark('test-id-1');
    addBookmark('test-id-2');
    setAuthToken('test-token');
    savePreferences({ filters: {}, viewMode: 'grid' });
    
    // Clear all
    clearAllPortalData();
    
    // All should be empty/default
    const bookmarks = getBookmarks();
    const authData = getAuthToken();
    const prefs = getPreferences();
    
    expect(bookmarks).toEqual([]);
    expect(authData).toBeNull();
    // Preferences return default values, not null
    expect(prefs).toHaveProperty('filters');
    expect(prefs).toHaveProperty('viewMode');
  });
});
