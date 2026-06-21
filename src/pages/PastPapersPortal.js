import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AuthenticationGate from '../components/portal/AuthenticationGate';
import FilterPanel from '../components/portal/FilterPanel';
import SearchBar from '../components/portal/SearchBar';
import PapersList from '../components/portal/PapersList';
import { applyFilters, clearFilters } from '../utils/filterUtils';
import { getPreferences, isAuthenticated, isBookmarked as getIsBookmarked, addBookmark, removeBookmark, updateViewMode } from '../utils/portalStorage';
import { downloadPDF, formatFilename } from '../utils/downloadUtils';
import { HERO_IMAGES } from '../utils/imageConstants';
import { FaBookOpen } from 'react-icons/fa';

const PastPapersPortal = () => {
  const [papers, setPapers] = useState([]);
  const [filters, setFilters] = useState({ grade: null, subject: null, year: null, examType: null, searchQuery: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [error, setError] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hss_portal_bookmarks') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/papers-metadata.json');
        if (!response.ok) throw new Error('Failed to load papers data');
        const data = await response.json();
        setPapers(data);
        const isAuth = isAuthenticated();
        setAuthenticated(isAuth);
        if (isAuth) {
          const prefs = getPreferences();
          if (prefs.filters) setFilters(prefs.filters);
          if (prefs.viewMode) setViewMode(prefs.viewMode);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load past papers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredPapers = useMemo(() => applyFilters(papers, filters), [papers, filters]);

  return (
    <>
      <SEO
        title="Past Papers Portal | Harding Secondary School"
        description="Access past examination papers and marking memos for all subjects. Browse by grade, subject, and year."
        keywords="past papers, exam papers, study materials, marking memos, Harding Secondary School"
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden">
          <img
            src={HERO_IMAGES.library}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/87" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaBookOpen className="text-xs" />
              Study Resources
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Past Papers Portal
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Browse, preview and download past examination papers and marking memos for Grades 8–12
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { label: 'Subjects', value: '11' },
                { label: 'Grades', value: '8 – 12' },
                { label: 'Years Available', value: '2015 – 2025' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-heading font-bold text-accent-neon">{value}</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="bg-neutral-50 min-h-screen">
          <div className="container-custom py-10 md:py-16">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-neutral-500 text-sm">Loading past papers…</p>
              </div>
            ) : error ? (
              <div className="max-w-md mx-auto bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
                <p className="text-red-700 mb-5 text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : !authenticated ? (
              <AuthenticationGate onAuthenticate={setAuthenticated} />
            ) : (
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 flex-shrink-0">
                  <FilterPanel
                    filters={filters}
                    onFilterChange={setFilters}
                    onClearFilters={() => setFilters(clearFilters())}
                    resultCount={filteredPapers.length}
                  />
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0 space-y-5">
                  <SearchBar
                    value={filters.searchQuery}
                    onChange={(query) => setFilters(f => ({ ...f, searchQuery: query }))}
                    resultCount={filteredPapers.length}
                  />
                  <PapersList
                    papers={filteredPapers}
                    viewMode={viewMode}
                    onViewModeChange={(mode) => { setViewMode(mode); updateViewMode(mode); }}
                    isBookmarked={(id) => bookmarkedIds.includes(id)}
                    onDownload={async (paper) => {
                      const ok = await downloadPDF(paper.pdfUrl, formatFilename(paper, 'paper'));
                      if (!ok) alert('Download failed. Please try again.');
                    }}
                    onPreview={(paper) => console.log('Preview:', paper)}
                    onBookmark={(id) => {
                      if (getIsBookmarked(id)) {
                        removeBookmark(id);
                        setBookmarkedIds(prev => prev.filter(b => b !== id));
                      } else {
                        addBookmark(id);
                        setBookmarkedIds(prev => [...prev, id]);
                      }
                    }}
                    onDownloadMemo={async (paper) => {
                      if (paper.memoUrl) {
                        const ok = await downloadPDF(paper.memoUrl, formatFilename(paper, 'memo'));
                        if (!ok) alert('Download failed. Please try again.');
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PastPapersPortal;
