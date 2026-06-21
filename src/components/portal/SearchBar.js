import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { SEARCH_DEBOUNCE_MS } from '../../utils/portalConstants';

const SearchBar = ({ value, onChange, placeholder = 'Search by subject, grade, year or exam type…', resultCount }) => {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => onChange(local), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [local, onChange]);

  useEffect(() => { setLocal(value); }, [value]);

  const clear = useCallback(() => { setLocal(''); onChange(''); }, [onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('portal-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div>
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none" />
        <input
          id="portal-search"
          type="text"
          value={local}
          onChange={e => setLocal(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-12 py-3.5 bg-white border border-neutral-200 rounded-2xl text-sm text-neutral-700 placeholder-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          aria-label="Search past papers"
          aria-describedby="search-hint"
        />
        {local ? (
          <button
            onClick={clear}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
            aria-label="Clear search"
          >
            <FaTimes className="text-neutral-500 text-xs" />
          </button>
        ) : (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none">
            <kbd className="text-[10px] px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-neutral-400 font-mono">⌃K</kbd>
          </span>
        )}
      </div>

      {local && (
        <p
          id="search-hint"
          className="mt-2 text-xs text-neutral-500 pl-1"
          role="status"
          aria-live="polite"
        >
          {resultCount === 0
            ? 'No papers match your search.'
            : `${resultCount} ${resultCount === 1 ? 'paper' : 'papers'} found`}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
