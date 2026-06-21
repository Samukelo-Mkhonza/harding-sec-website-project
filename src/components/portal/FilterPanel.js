import React, { useState } from 'react';
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SUBJECTS, EXAM_TYPES, GRADES, MIN_YEAR, MAX_YEAR } from '../../utils/portalConstants';
import { hasActiveFilters } from '../../utils/filterUtils';

const years = [];
for (let y = MAX_YEAR; y >= MIN_YEAR; y--) years.push(y);

const SectionHeading = ({ children }) => (
  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2.5">{children}</p>
);

const PillButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
      active
        ? 'bg-primary text-white shadow-sm'
        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
    }`}
  >
    {children}
  </button>
);

const FilterSelect = ({ id, label, value, onChange, options, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-neutral-600 mb-1.5">{label}</label>
    <div className="relative">
      <select
        id={id}
        value={value || ''}
        onChange={onChange}
        className="w-full appearance-none px-3 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-8"
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs pointer-events-none" />
    </div>
  </div>
);

const FilterPanel = ({ filters, onFilterChange, onClearFilters, resultCount }) => {
  const [collapsed, setCollapsed] = useState(false);

  const set = (key, value) => onFilterChange({ ...filters, [key]: value });

  const activeCount = [filters.grade, filters.subject, filters.year, filters.examType]
    .filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden sticky top-[130px]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <FaFilter className="text-primary text-sm" />
          <span className="font-heading font-bold text-neutral-800 text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(c => !c)}
          className="text-neutral-400 hover:text-neutral-600 transition-colors lg:hidden"
          aria-label="Toggle filters"
        >
          {collapsed ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>

      <div className={`${collapsed ? 'hidden' : 'block'} lg:block`}>
        <div className="px-5 py-5 space-y-6">

          {/* Grade */}
          <div>
            <SectionHeading>Grade</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {GRADES.map(g => (
                <PillButton
                  key={g}
                  active={filters.grade === g}
                  onClick={() => set('grade', filters.grade === g ? null : g)}
                >
                  Gr {g}
                </PillButton>
              ))}
            </div>
          </div>

          {/* Exam Type */}
          <div>
            <SectionHeading>Exam Type</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {EXAM_TYPES.map(t => (
                <PillButton
                  key={t.id}
                  active={filters.examType === t.id}
                  onClick={() => set('examType', filters.examType === t.id ? null : t.id)}
                >
                  {t.shortName}
                </PillButton>
              ))}
            </div>
          </div>

          {/* Subject */}
          <FilterSelect
            id="filter-subject"
            label="Subject"
            value={filters.subject}
            onChange={e => set('subject', e.target.value || null)}
            placeholder="All Subjects"
            options={SUBJECTS.map(s => ({ value: s.id, label: s.name }))}
          />

          {/* Year */}
          <FilterSelect
            id="filter-year"
            label="Year"
            value={filters.year}
            onChange={e => set('year', e.target.value ? parseInt(e.target.value) : null)}
            placeholder="All Years"
            options={years.map(y => ({ value: y, label: y }))}
          />
        </div>

        {/* Active chips + clear */}
        {hasActiveFilters(filters) && (
          <div className="px-5 pb-5 border-t border-neutral-100 pt-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {filters.grade && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  Grade {filters.grade}
                  <button onClick={() => set('grade', null)} aria-label="Remove grade filter">
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}
              {filters.examType && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {EXAM_TYPES.find(t => t.id === filters.examType)?.shortName}
                  <button onClick={() => set('examType', null)} aria-label="Remove exam type filter">
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}
              {filters.subject && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {SUBJECTS.find(s => s.id === filters.subject)?.name}
                  <button onClick={() => set('subject', null)} aria-label="Remove subject filter">
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}
              {filters.year && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {filters.year}
                  <button onClick={() => set('year', null)} aria-label="Remove year filter">
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={onClearFilters}
              className="text-xs text-neutral-400 hover:text-primary transition-colors flex items-center gap-1"
            >
              <FaTimes className="text-[10px]" />
              Clear all filters
            </button>
          </div>
        )}

        {/* Result count footer */}
        <div className="px-5 pb-5">
          <p className="text-xs text-neutral-400 text-center">
            <span className="font-semibold text-primary">{resultCount}</span>{' '}
            {resultCount === 1 ? 'paper' : 'papers'} found
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
