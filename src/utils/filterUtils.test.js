/**
 * Property-based tests for filter utilities
 * Feature: student-past-papers-portal
 */

const fc = require('fast-check');
const { applyFilters, clearFilters } = require('./filterUtils');
const { SUBJECTS, EXAM_TYPES, GRADES } = require('./portalConstants');

// Custom generator for paper metadata
const paperGenerator = fc.record({
  id: fc.uuid(),
  subject: fc.constantFrom(...SUBJECTS.map(s => s.id)),
  grade: fc.constantFrom(...GRADES),
  year: fc.integer({ min: 2015, max: 2024 }),
  examType: fc.constantFrom(...EXAM_TYPES.map(e => e.id)),
  title: fc.string({ minLength: 10, maxLength: 100 }),
  pdfUrl: fc.webUrl(),
  memoUrl: fc.option(fc.webUrl(), { nil: null }),
  fileSize: fc.integer({ min: 100000, max: 10000000 }),
  uploadDate: fc.date({ min: new Date('2020-01-01'), max: new Date() }).map(d => d.toISOString()),
  pageCount: fc.integer({ min: 1, max: 50 }),
  tags: fc.array(fc.string({ minLength: 3, maxLength: 15 }), { maxLength: 5 })
});

// Generator for filter state
const filterStateGenerator = fc.record({
  grade: fc.option(fc.constantFrom(...GRADES), { nil: null }),
  subject: fc.option(fc.constantFrom(...SUBJECTS.map(s => s.id)), { nil: null }),
  year: fc.option(fc.integer({ min: 2015, max: 2024 }), { nil: null }),
  examType: fc.option(fc.constantFrom(...EXAM_TYPES.map(e => e.id)), { nil: null }),
  searchQuery: fc.option(fc.string({ maxLength: 20 }), { nil: '' })
});

describe('Filter Utils - Property Tests', () => {
  /**
   * Feature: student-past-papers-portal, Property 5: Multi-filter AND logic
   * Validates: Requirements 2.2
   */
  it('Property 5: Multi-filter AND logic - all filtered papers match ALL active filter criteria', () => {
    fc.assert(
      fc.property(
        fc.array(paperGenerator, { minLength: 0, maxLength: 100 }),
        filterStateGenerator,
        (papers, filters) => {
          const filtered = applyFilters(papers, filters);
          
          // All filtered papers must match ALL active filters
          return filtered.every(paper => {
            const matchesGrade = filters.grade === null || filters.grade === undefined || paper.grade === filters.grade;
            const matchesSubject = !filters.subject || paper.subject === filters.subject;
            const matchesYear = filters.year === null || filters.year === undefined || paper.year === filters.year;
            const matchesExamType = !filters.examType || paper.examType === filters.examType;
            
            let matchesSearch = true;
            if (filters.searchQuery && filters.searchQuery.trim() !== '') {
              const query = filters.searchQuery.toLowerCase();
              const searchableFields = [
                paper.subject,
                paper.title,
                paper.examType,
                paper.year?.toString(),
                ...(paper.tags || [])
              ];
              matchesSearch = searchableFields.some(field => 
                field && field.toString().toLowerCase().includes(query)
              );
            }
            
            return matchesGrade && matchesSubject && matchesYear && matchesExamType && matchesSearch;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 6: Filter clear round trip
   * Validates: Requirements 2.4
   */
  it('Property 6: Filter clear round trip - clearing filters restores complete list', () => {
    fc.assert(
      fc.property(
        fc.array(paperGenerator, { minLength: 0, maxLength: 100 }),
        filterStateGenerator,
        (papers, filters) => {
          // Apply filters
          const filtered = applyFilters(papers, filters);
          
          // Clear filters
          const clearedFilters = clearFilters();
          
          // Apply cleared filters
          const afterClear = applyFilters(papers, clearedFilters);
          
          // Should get back all papers
          return afterClear.length === papers.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 4: Grade filter correctness
   * Validates: Requirements 1.4
   */
  it('Property 4: Grade filter correctness - all papers match selected grade', () => {
    fc.assert(
      fc.property(
        fc.array(paperGenerator, { minLength: 0, maxLength: 100 }),
        fc.constantFrom(...GRADES),
        (papers, selectedGrade) => {
          const filters = {
            grade: selectedGrade,
            subject: null,
            year: null,
            examType: null,
            searchQuery: ''
          };
          
          const filtered = applyFilters(papers, filters);
          
          // All filtered papers must have the selected grade
          return filtered.every(paper => paper.grade === selectedGrade);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 25: Year filter correctness
   * Validates: Requirements 10.5
   */
  it('Property 25: Year filter correctness - all papers match selected year', () => {
    fc.assert(
      fc.property(
        fc.array(paperGenerator, { minLength: 0, maxLength: 100 }),
        fc.integer({ min: 2015, max: 2024 }),
        (papers, selectedYear) => {
          const filters = {
            grade: null,
            subject: null,
            year: selectedYear,
            examType: null,
            searchQuery: ''
          };
          
          const filtered = applyFilters(papers, filters);
          
          // All filtered papers must have the selected year
          return filtered.every(paper => paper.year === selectedYear);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 12: Search filter correctness
   * Validates: Requirements 5.1
   */
  it('Property 12: Search filter correctness - all papers contain search query', () => {
    fc.assert(
      fc.property(
        fc.array(paperGenerator, { minLength: 1, maxLength: 100 }),
        fc.string({ minLength: 1, maxLength: 10 }),
        (papers, searchQuery) => {
          const filters = {
            grade: null,
            subject: null,
            year: null,
            examType: null,
            searchQuery: searchQuery
          };
          
          const filtered = applyFilters(papers, filters);
          
          // All filtered papers must contain the search query in at least one searchable field
          return filtered.every(paper => {
            const query = searchQuery.toLowerCase();
            const searchableFields = [
              paper.subject,
              paper.title,
              paper.examType,
              paper.year?.toString(),
              ...(paper.tags || [])
            ];
            
            return searchableFields.some(field => 
              field && field.toString().toLowerCase().includes(query)
            );
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: student-past-papers-portal, Property 36: Client-side filtering
   * Validates: Requirements 15.4
   */
  it('Property 36: Client-side filtering - filtering is synchronous without side effects', () => {
    fc.assert(
      fc.property(
        fc.array(paperGenerator, { minLength: 0, maxLength: 100 }),
        filterStateGenerator,
        (papers, filters) => {
          // Store original papers
          const originalPapers = JSON.parse(JSON.stringify(papers));
          
          // Apply filters
          const filtered = applyFilters(papers, filters);
          
          // Original papers should be unchanged (no mutation)
          const papersUnchanged = JSON.stringify(papers) === JSON.stringify(originalPapers);
          
          // Filtered result should be an array
          const isArray = Array.isArray(filtered);
          
          return papersUnchanged && isArray;
        }
      ),
      { numRuns: 100 }
    );
  });
});
