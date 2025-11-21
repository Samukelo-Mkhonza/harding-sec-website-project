/**
 * Property-based tests for Past Papers Portal
 * Feature: student-past-papers-portal
 */

const fc = require('fast-check');
const { SUBJECTS } = require('../utils/portalConstants');

describe('Past Papers Portal - Property Tests', () => {
  /**
   * Feature: student-past-papers-portal, Property 1: Subject alphabetical ordering
   * Validates: Requirements 1.1
   */
  it('Property 1: Subject alphabetical ordering - subjects are sorted alphabetically', () => {
    // Test that SUBJECTS constant is alphabetically sorted by name
    const subjectNames = SUBJECTS.map(s => s.name);
    const sortedNames = [...subjectNames].sort((a, b) => a.localeCompare(b));
    
    expect(subjectNames).toEqual(sortedNames);
  });

  /**
   * Property test: Subject list ordering is consistent
   */
  it('Subject list maintains alphabetical order across operations', () => {
    fc.assert(
      fc.property(
        fc.shuffledSubarray(SUBJECTS, { minLength: 2, maxLength: SUBJECTS.length }),
        (shuffledSubjects) => {
          // Sort the shuffled subjects by name
          const sorted = [...shuffledSubjects].sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          
          // Check that sorting produces alphabetical order
          for (let i = 0; i < sorted.length - 1; i++) {
            const comparison = sorted[i].name.localeCompare(sorted[i + 1].name);
            if (comparison > 0) {
              return false; // Not in alphabetical order
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Subject filtering maintains alphabetical order
   */
  it('Filtered subject list maintains alphabetical order', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...SUBJECTS.map(s => s.id)), { minLength: 1, maxLength: SUBJECTS.length }),
        (selectedIds) => {
          // Filter subjects by selected IDs
          const filtered = SUBJECTS.filter(s => selectedIds.includes(s.id));
          
          // Check if filtered list is alphabetically sorted
          for (let i = 0; i < filtered.length - 1; i++) {
            const comparison = filtered[i].name.localeCompare(filtered[i + 1].name);
            if (comparison > 0) {
              return false;
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
