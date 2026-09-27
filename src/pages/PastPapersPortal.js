import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SEO from '../components/SEO';
import { PageHero, LoadingState, ErrorState } from '../components';
import AuthenticationGate from '../components/portal/AuthenticationGate';
import FilterPanel from '../components/portal/FilterPanel';
import SearchBar from '../components/portal/SearchBar';
import PapersList from '../components/portal/PapersList';
import { applyFilters, clearFilters } from '../utils/filterUtils';
import { getPreferences, isAuthenticated, isBookmarked as getIsBookmarked, addBookmark, removeBookmark, updateViewMode } from '../utils/portalStorage';
import { downloadPDF, formatFilename } from '../utils/downloadUtils';
import useUrlFilters from '../hooks/useUrlFilters';
import { useToast } from '../contexts/ToastContext';
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
  const [filters, setFilters] = useUrlFilters(
    { grade: null, subject: null, year: null, examType: null, searchQuery: '' },
    { grade: 'number', year: 'number' }
  );
  const toast = useToast();
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
        const response = await fetch(`${process.env.PUBLIC_URL}/data/papers-metadata.json`);
        if (!response.ok) throw new Error('Failed to load papers data');
        const data = await response.json();
        setPapers(data);
        const isAuth = isAuthenticated();
        setAuthenticated(isAuth);
        if (isAuth) {
          const prefs = getPreferences();
          // A shared/bookmarked link wins over the last-used filters
          const urlHasFilters = /[?&](grade|subject|year|examType|searchQuery)=/.test(window.location.search);
          if (prefs.filters && !urlHasFilters) setFilters(prefs.filters);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPapers = useMemo(() => applyFilters(papers, filters), [papers, filters]);

  const handleDownload = useCallback(async (paper) => {
    const ok = await downloadPDF(paper.pdfUrl, formatFilename(paper, 'paper'));
    if (!ok) toast.error('Download failed. Please try again.');
  }, [toast]);

  const handleDownloadMemo = useCallback(async (paper) => {
    if (paper.memoUrl) {
      const ok = await downloadPDF(paper.memoUrl, formatFilename(paper, 'memo'));
      if (!ok) toast.error('Download failed. Please try again.');
    }
  }, [toast]);

  return (
    <>
      <SEO
        title="Past Papers Portal | Harding Secondary School"
        description="Access past examination papers and marking memos for all subjects. Browse by grade, subject, and year."
        keywords="past papers, exam papers, study materials, marking memos, Harding Secondary School"
      />
      <div>
        <PageHero
          eyebrow="Study Resources"
          eyebrowIcon={FaBookOpen}
          title="Past Papers Portal"
          description="Browse, preview and download past examination papers and marking memos for Grades 8–12"
          image={HERO_IMAGES.library}
          stats={[
            { label: 'Subjects', value: '11' },
            { label: 'Grades', value: '8 – 12' },
            { label: 'Years Available', value: '2015 – 2024' },
          ]}
        />

        {/* Main Content */}
        <div className="bg-neutral-50 min-h-screen">
          <div className="container-custom py-10 md:py-16">
            {loading ? (
              <LoadingState label="Loading past papers…" />
            ) : error ? (
              <ErrorState message={error} />
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
