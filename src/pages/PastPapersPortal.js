import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { getSubjectById, getExamTypeById } from '../utils/portalConstants';
import { FaBookOpen, FaTimes, FaExternalLinkAlt, FaDownload, FaFileAlt, FaLayerGroup, FaCalendarAlt } from 'react-icons/fa';

const PreviewModal = ({ paper, onClose, onDownload, onDownloadMemo }) => {
  const subject = getSubjectById(paper.subject);
  const examType = getExamTypeById(paper.examType);
  const isExternal = paper.isExternal || /^https?:\/\//i.test(paper.pdfUrl);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Preview: ${paper.title}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b border-neutral-100">
          <div className="flex-1 min-w-0">
            <div
              className="w-full h-1 rounded-full mb-3"
              style={{ backgroundColor: subject?.color ?? '#0D4E25' }}
            />
            <h2 className="font-heading font-bold text-neutral-800 text-base leading-snug">
              {paper.title}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <FaLayerGroup className="text-primary/60" /> Grade {paper.grade}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-primary/60" /> {paper.year}
              </span>
              {examType && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary font-semibold rounded-full">
                  {examType.shortName}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="flex-shrink-0 w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        {isExternal ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <FaBookOpen className="text-3xl text-primary" />
            </div>
            <h3 className="font-heading font-bold text-neutral-800 mb-2">Official Source</h3>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mb-7">
              This paper is hosted on an official DBE or government education website.
              Click below to open the source page in a new tab where you can view and download the paper.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                <FaExternalLinkAlt className="text-xs" />
                Open Official Source
              </a>
              <button
                onClick={() => onDownload(paper)}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-primary/30 text-primary rounded-xl text-sm font-semibold hover:bg-primary/5 transition-colors"
              >
                <FaDownload className="text-xs" />
                Download
              </button>
              {paper.memoUrl && paper.memoUrl !== paper.pdfUrl && (
                <button
                  onClick={() => onDownloadMemo(paper)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-neutral-200 text-neutral-600 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
                >
                  <FaFileAlt className="text-xs" />
                  Download Memo
                </button>
              )}
            </div>
            <p className="text-xs text-neutral-400 mt-5">
              Source: {new URL(paper.pdfUrl).hostname}
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            <iframe
              src={paper.pdfUrl}
              title={paper.title}
              className="flex-1 w-full border-0"
              style={{ minHeight: '500px' }}
            />
            <div className="flex gap-3 p-4 border-t border-neutral-100 justify-end">
              <button
                onClick={() => onDownload(paper)}
                className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                <FaDownload className="text-xs" /> Download Paper
              </button>
              {paper.memoUrl && (
                <button
                  onClick={() => onDownloadMemo(paper)}
                  className="inline-flex items-center gap-2 px-5 py-2 border border-primary/30 text-primary rounded-xl text-sm font-semibold hover:bg-primary/5 transition-colors"
                >
                  <FaFileAlt className="text-xs" /> Download Memo
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PastPapersPortal = () => {
  const [papers, setPapers] = useState([]);
  const [filters, setFilters] = useState({ grade: null, subject: null, year: null, examType: null, searchQuery: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [error, setError] = useState(null);
  const [previewPaper, setPreviewPaper] = useState(null);
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

  const handleDownload = useCallback(async (paper) => {
    const ok = await downloadPDF(paper.pdfUrl, formatFilename(paper, 'paper'));
    if (!ok) alert('Download failed. Please try again.');
  }, []);

  const handleDownloadMemo = useCallback(async (paper) => {
    if (paper.memoUrl) {
      const ok = await downloadPDF(paper.memoUrl, formatFilename(paper, 'memo'));
      if (!ok) alert('Download failed. Please try again.');
    }
  }, []);

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
                { label: 'Years Available', value: '2015 – 2024' },
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
                <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-[120px] lg:max-h-[calc(100vh-136px)] lg:overflow-y-auto">
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
                    onDownload={handleDownload}
                    onPreview={(paper) => setPreviewPaper(paper)}
                    onBookmark={(id) => {
                      if (getIsBookmarked(id)) {
                        removeBookmark(id);
                        setBookmarkedIds(prev => prev.filter(b => b !== id));
                      } else {
                        addBookmark(id);
                        setBookmarkedIds(prev => [...prev, id]);
                      }
                    }}
                    onDownloadMemo={handleDownloadMemo}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewPaper && (
        <PreviewModal
          paper={previewPaper}
          onClose={() => setPreviewPaper(null)}
          onDownload={handleDownload}
          onDownloadMemo={handleDownloadMemo}
        />
      )}
    </>
  );
};

export default PastPapersPortal;
