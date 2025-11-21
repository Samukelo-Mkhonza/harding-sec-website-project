import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';
import { VALIDATION } from '../utils/constants';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= VALIDATION.MIN_SEARCH_CHARS) {
      const timer = setTimeout(() => {
        performSearch(query);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const performSearch = (searchQuery) => {
    const mockResults = [
      { id: '1', title: 'About Us', excerpt: 'Learn about our school', category: 'Pages', url: '/about' },
      { id: '2', title: 'Academics', excerpt: 'Our academic programs', category: 'Pages', url: '/academics' },
      { id: '3', title: 'Admissions', excerpt: 'How to apply', category: 'Pages', url: '/admissions' },
    ].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(mockResults);
  };

  const handleSelect = (result) => {
    navigate(result.url);
    onClose();
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  const highlightMatch = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200">{part}</mark>
        : part
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-3xl mx-auto mt-20 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <FaSearch className="text-2xl text-neutral-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="flex-1 text-2xl outline-none"
                />
                <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {query.length > 0 && query.length < VALIDATION.MIN_SEARCH_CHARS && (
                <p className="text-sm text-neutral-500">Type at least 3 characters to search...</p>
              )}

              {results.length > 0 && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        index === selectedIndex ? 'bg-primary/10' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-primary uppercase">{result.category}</span>
                          </div>
                          <h3 className="font-semibold text-neutral-900">
                            {highlightMatch(result.title, query)}
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">{result.excerpt}</p>
                        </div>
                        <FaArrowRight className="text-neutral-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {query.length >= VALIDATION.MIN_SEARCH_CHARS && results.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-neutral-600 mb-4">No results found for "{query}"</p>
                  <p className="text-sm text-neutral-500">Try: "admissions", "academics", "contact"</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
