/**
 * Filter logic utilities for the Student Past Papers Portal
 */

/**
 * Apply all filters to a list of papers
 * @param {Array} papers - Array of paper objects
 * @param {Object} filters - Filter state object
 * @returns {Array} Filtered papers
 */
export const applyFilters = (papers, filters) => {
  if (!papers || !Array.isArray(papers)) {
    return [];
  }

  return papers.filter(paper => {
    // Grade filter
    if (filters.grade !== null && filters.grade !== undefined && paper.grade !== filters.grade) {
      return false;
    }

    // Subject filter
    if (filters.subject && paper.subject !== filters.subject) {
      return false;
    }

    // Year filter
    if (filters.year !== null && filters.year !== undefined && paper.year !== filters.year) {
      return false;
    }

    // Exam type filter
    if (filters.examType && paper.examType !== filters.examType) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      const searchableFields = [
        paper.subject,
        paper.title,
        paper.examType,
        paper.year?.toString(),
        ...(paper.tags || [])
      ];
      
      const matches = searchableFields.some(field => 
        field && field.toString().toLowerCase().includes(query)
      );
      
      if (!matches) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Group papers by academic year
 * @param {Array} papers - Array of paper objects
 * @returns {Object} Papers grouped by year
 */
export const groupByYear = (papers) => {
  if (!papers || !Array.isArray(papers)) {
    return {};
  }

  const grouped = papers.reduce((acc, paper) => {
    const year = paper.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(paper);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(grouped).sort((a, b) => b - a);
  const sortedGrouped = {};
  sortedYears.forEach(year => {
    sortedGrouped[year] = grouped[year];
  });

  return sortedGrouped;
};

/**
 * Group papers by grade level
 * @param {Array} papers - Array of paper objects
 * @returns {Object} Papers grouped by grade
 */
export const groupByGrade = (papers) => {
  if (!papers || !Array.isArray(papers)) {
    return {};
  }

  return papers.reduce((acc, paper) => {
    const grade = paper.grade;
    if (!acc[grade]) {
      acc[grade] = [];
    }
    acc[grade].push(paper);
    return acc;
  }, {});
};

/**
 * Get recently added papers
 * @param {Array} papers - Array of paper objects
 * @param {number} count - Number of papers to return
 * @returns {Array} Recently added papers
 */
export const getRecentlyAdded = (papers, count = 10) => {
  if (!papers || !Array.isArray(papers)) {
    return [];
  }

  return [...papers]
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, count);
};

/**
 * Check if a paper is new (uploaded within specified days)
 * @param {string} uploadDate - ISO date string
 * @param {number} days - Number of days to consider as "new"
 * @returns {boolean}
 */
export const isNewPaper = (uploadDate, days = 30) => {
  if (!uploadDate) return false;
  
  const uploaded = new Date(uploadDate);
  const now = new Date();
  const diffTime = Math.abs(now - uploaded);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= days;
};

/**
 * Get statistics from papers
 * @param {Array} papers - Array of paper objects
 * @returns {Object} Statistics object
 */
export const getStatistics = (papers) => {
  if (!papers || !Array.isArray(papers)) {
    return {
      totalPapers: 0,
      totalSubjects: 0,
      totalYears: 0,
      byGrade: {},
      bySubject: {}
    };
  }

  const subjects = new Set();
  const years = new Set();
  const byGrade = {};
  const bySubject = {};

  papers.forEach(paper => {
    subjects.add(paper.subject);
    years.add(paper.year);
    
    // Count by grade
    if (!byGrade[paper.grade]) {
      byGrade[paper.grade] = 0;
    }
    byGrade[paper.grade]++;
    
    // Count by subject
    if (!bySubject[paper.subject]) {
      bySubject[paper.subject] = 0;
    }
    bySubject[paper.subject]++;
  });

  return {
    totalPapers: papers.length,
    totalSubjects: subjects.size,
    totalYears: years.size,
    byGrade,
    bySubject
  };
};

/**
 * Get papers by subject and grade combination
 * @param {Array} papers - Array of paper objects
 * @param {string} subject - Subject ID
 * @param {number} grade - Grade level
 * @returns {Array} Filtered papers
 */
export const getPapersBySubjectAndGrade = (papers, subject, grade) => {
  if (!papers || !Array.isArray(papers)) {
    return [];
  }

  return papers.filter(paper => 
    paper.subject === subject && paper.grade === grade
  );
};

/**
 * Sort papers by various criteria
 * @param {Array} papers - Array of paper objects
 * @param {string} sortBy - Sort criteria ('date', 'subject', 'grade', 'year')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted papers
 */
export const sortPapers = (papers, sortBy = 'date', order = 'desc') => {
  if (!papers || !Array.isArray(papers)) {
    return [];
  }

  const sorted = [...papers];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.uploadDate) - new Date(b.uploadDate);
        break;
      case 'subject':
        comparison = a.subject.localeCompare(b.subject);
        break;
      case 'grade':
        comparison = a.grade - b.grade;
        break;
      case 'year':
        comparison = a.year - b.year;
        break;
      default:
        comparison = 0;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

/**
 * Check if filters are active
 * @param {Object} filters - Filter state object
 * @returns {boolean}
 */
export const hasActiveFilters = (filters) => {
  return !!(
    filters.grade !== null ||
    filters.subject !== null ||
    filters.year !== null ||
    filters.examType !== null ||
    (filters.searchQuery && filters.searchQuery.trim() !== '')
  );
};

/**
 * Clear all filters
 * @returns {Object} Empty filter state
 */
export const clearFilters = () => {
  return {
    grade: null,
    subject: null,
    year: null,
    examType: null,
    searchQuery: ''
  };
};
