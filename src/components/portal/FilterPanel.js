import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { SUBJECTS, EXAM_TYPES, GRADES, MIN_YEAR, MAX_YEAR } from '../../utils/portalConstants';
import { hasActiveFilters } from '../../utils/filterUtils';

const FilterPanel = ({ filters, onFilterChange, resultCount, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleFilterUpdate = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      grade: null,
      subject: null,
      year: null,
      examType: null,
      searchQuery: ''
    });
  };

  const activeFiltersCount = [
    filters.grade,
    filters.subject,
    filters.year,
    filters.examType
  ].filter(f => f !== null && f !== undefined).length;

  const years = [];
  for (let year = MAX_YEAR; year >= MIN_YEAR; year--) {
    years.push(year);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Filter Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-label="Toggle filters"
      >
        <div className="flex items-center gap-3">
          <FiFilter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{resultCount} results</span>
          <FiChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Filter Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="p-4 space-y-4">
              {/* Grade Filter */}
              <div>
                <label
                  htmlFor="grade-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Grade
                </label>
                <select
                  id="grade-filter"
                  value={filters.grade || ''}
                  onChange={(e) =>
                    handleFilterUpdate('grade', e.target.value ? parseInt(e.target.value) : null)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Filter by grade"
                >
                  <option value="">All Grades</option>
                  {GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      Grade {grade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label
                  htmlFor="subject-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject-filter"
                  value={filters.subject || ''}
                  onChange={(e) => handleFilterUpdate('subject', e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Filter by subject"
                >
                  <option value="">All Subjects</option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label
                  htmlFor="year-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Year
                </label>
                <select
                  id="year-filter"
                  value={filters.year || ''}
                  onChange={(e) =>
                    handleFilterUpdate('year', e.target.value ? parseInt(e.target.value) : null)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Filter by year"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exam Type Filter */}
              <div>
                <label
                  htmlFor="examtype-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Exam Type
                </label>
                <select
                  id="examtype-filter"
                  value={filters.examType || ''}
                  onChange={(e) => handleFilterUpdate('examType', e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Filter by exam type"
                >
                  <option value="">All Types</option>
                  {EXAM_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Filter Chips */}
              {hasActiveFilters(filters) && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {filters.grade && (
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        Grade {filters.grade}
                        <button
                          onClick={() => handleFilterUpdate('grade', null)}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                          aria-label="Remove grade filter"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {filters.subject && (
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {SUBJECTS.find((s) => s.id === filters.subject)?.name}
                        <button
                          onClick={() => handleFilterUpdate('subject', null)}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                          aria-label="Remove subject filter"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {filters.year && (
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {filters.year}
                        <button
                          onClick={() => handleFilterUpdate('year', null)}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                          aria-label="Remove year filter"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {filters.examType && (
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {EXAM_TYPES.find((t) => t.id === filters.examType)?.shortName}
                        <button
                          onClick={() => handleFilterUpdate('examType', null)}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                          aria-label="Remove exam type filter"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-primary hover:text-primary-dark underline"
                    aria-label="Clear all filters"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
