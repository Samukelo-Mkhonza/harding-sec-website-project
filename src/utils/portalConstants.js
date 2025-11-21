/**
 * Constants for the Student Past Papers Portal
 */

// Subject definitions with icons and colors
export const SUBJECTS = [
  { id: 'accounting', name: 'Accounting', icon: 'calculator', color: '#0D4E25' },
  { id: 'afrikaans', name: 'Afrikaans', icon: 'language', color: '#0D4E25' },
  { id: 'business-studies', name: 'Business Studies', icon: 'briefcase', color: '#147538' },
  { id: 'economics', name: 'Economics', icon: 'trending-up', color: '#147538' },
  { id: 'english', name: 'English Home Language', icon: 'book', color: '#147538' },
  { id: 'geography', name: 'Geography', icon: 'globe', color: '#0D4E25' },
  { id: 'history', name: 'History', icon: 'clock', color: '#147538' },
  { id: 'life-orientation', name: 'Life Orientation', icon: 'heart', color: '#147538' },
  { id: 'life-sciences', name: 'Life Sciences', icon: 'dna', color: '#147538' },
  { id: 'mathematics', name: 'Mathematics', icon: 'calculator', color: '#147538' },
  { id: 'physical-sciences', name: 'Physical Sciences', icon: 'atom', color: '#147538' }
];

// Exam type definitions
export const EXAM_TYPES = [
  { id: 'midyear', name: 'Mid-Year Examination', shortName: 'Mid-Year' },
  { id: 'final', name: 'Final Examination', shortName: 'Final' },
  { id: 'trial', name: 'Trial Examination', shortName: 'Trial' },
  { id: 'preliminary', name: 'Preliminary Examination', shortName: 'Prelim' },
  { id: 'test', name: 'Class Test', shortName: 'Test' }
];

// Grade levels
export const GRADES = [8, 9, 10, 11, 12];

// Year range for papers
export const MIN_YEAR = 2015;
export const MAX_YEAR = new Date().getFullYear();

// Local storage keys
export const STORAGE_KEYS = {
  BOOKMARKS: 'hss_portal_bookmarks',
  RECENT: 'hss_portal_recent',
  AUTH: 'hss_portal_auth',
  PREFERENCES: 'hss_portal_preferences'
};

// Authentication
export const AUTH_EXPIRY_DAYS = 30;

// UI Constants
export const PAPERS_PER_PAGE = 50;
export const RECENTLY_ADDED_COUNT = 10;
export const NEW_BADGE_DAYS = 30;
export const SEARCH_DEBOUNCE_MS = 300;
export const FILTER_UPDATE_MS = 400;

// Helper functions
export const getSubjectById = (id) => SUBJECTS.find(s => s.id === id);
export const getExamTypeById = (id) => EXAM_TYPES.find(e => e.id === id);
