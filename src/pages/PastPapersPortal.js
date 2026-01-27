import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AuthenticationGate from '../components/portal/AuthenticationGate';
import FilterPanel from '../components/portal/FilterPanel';
import SearchBar from '../components/portal/SearchBar';
import PapersList from '../components/portal/PapersList';
import { applyFilters, clearFilters, getStatistics } from '../utils/filterUtils';
import { getPreferences, isAuthenticated, isBookmarked, addBookmark, removeBookmark, updateViewMode } from '../utils/portalStorage';
import { downloadPDF, downloadBoth, formatFilename } from '../utils/downloadUtils';

const PastPapersPortal = () => {
  // State management
  const [papers, setPapers] = useState([]);
  const [filters, setFilters] = useState({
    grade: null,
    subject: null,
    year: null,
    examType: null,
    searchQuery: ''
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [error, setError] = useState(null);

  // Load papers data on mount
  useEffect(() => {
    const loadPapersData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/papers-metadata.json');
        
        if (!response.ok) {
          throw new Error('Failed to load papers data');
        }
        
        const data = await response.json();
        setPapers(data);
        
        // Check authentication
        const isAuth = isAuthenticated();
        setAuthenticated(isAuth);
        
        // Load saved preferences if authenticated
        if (isAuth) {
          const prefs = getPreferences();
          if (prefs.filters) {
            setFilters(prefs.filters);
          }
          if (prefs.viewMode) {
            setViewMode(prefs.viewMode);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading papers:', err);
        setError('Failed to load past papers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPapersData();
  }, []);

  // Apply filters to papers
  const filteredPapers = useMemo(() => {
    return applyFilters(papers, filters);
  }, [papers, filters]);

  // Get statistics
  const statistics = useMemo(() => {
    return getStatistics(filteredPapers);
  }, [filteredPapers]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters(clearFilters());
  };

  // Handle authentication
  const handleAuthentication = (success) => {
    setAuthenticated(success);
  };

  return (
    <>
      <SEO
        title="Past Papers Portal - Harding Secondary School"
        description="Access past examination papers and marking memos for all subjects. Browse by grade, subject, and year to find study materials."
        keywords="past papers, exam papers, study materials, marking memos, Harding Secondary School"
      />

      <div>
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Portal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary-dark to-primary text-white py-12 md:py-16"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 !text-white">
              Past Papers Portal
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl !text-white">
              Access historical examination papers and marking memos across all subjects. 
              Browse, preview, and download study materials to help you prepare for exams.
            </p>
            
            {/* Statistics */}
            {!loading && (
              <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold !text-white">{statistics.totalPapers}</div>
                  <div className="text-sm opacity-90 !text-white">Papers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold !text-white">{statistics.totalSubjects}</div>
                  <div className="text-sm opacity-90 !text-white">Subjects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold !text-white">{statistics.totalYears}</div>
                  <div className="text-sm opacity-90 !text-white">Years</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading past papers...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : !authenticated ? (
            <AuthenticationGate onAuthenticate={handleAuthentication} />
          ) : (
            <div className="space-y-6">
              {/* Search Bar */}
              <SearchBar
                value={filters.searchQuery}
                onChange={(query) => setFilters({ ...filters, searchQuery: query })}
                resultCount={filteredPapers.length}
              />

              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                resultCount={filteredPapers.length}
              />

              {/* Papers List */}
              <PapersList
                papers={filteredPapers}
                viewMode={viewMode}
                onViewModeChange={(mode) => {
                  setViewMode(mode);
                  updateViewMode(mode);
                }}
                isBookmarked={(paperId) => isBookmarked(paperId)}
                onDownload={async (paper) => {
                  const filename = formatFilename(paper, 'paper');
                  const success = await downloadPDF(paper.pdfUrl, filename);
                  if (!success) {
                    alert('Download failed. Please try again.');
                  }
                }}
                onPreview={(paper) => console.log('Preview:', paper)}
                onBookmark={(paperId) => {
                  if (isBookmarked(paperId)) {
                    removeBookmark(paperId);
                  } else {
                    addBookmark(paperId);
                  }
                }}
                onDownloadMemo={async (paper) => {
                  if (paper.memoUrl) {
                    const filename = formatFilename(paper, 'memo');
                    const success = await downloadPDF(paper.memoUrl, filename);
                    if (!success) {
                      alert('Download failed. Please try again.');
                    }
                  }
                }}
              />
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PastPapersPortal;
