import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { SEARCH_DEBOUNCE_MS } from '../../utils/portalConstants';

const SearchBar = ({ value, onChange, placeholder = 'Search papers...', resultCount }) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  // Keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          id="search-input"
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          aria-label="Search past papers"
          aria-describedby="search-results-count"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>
      {localValue && (
        <div
          id="search-results-count"
          className="mt-2 text-sm text-gray-600"
          role="status"
          aria-live="polite"
        >
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </div>
      )}
      <div className="mt-1 text-xs text-gray-500">
        Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">Ctrl</kbd> +{' '}
        <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">K</kbd> to focus
      </div>
    </div>
  );
};

export default SearchBar;
