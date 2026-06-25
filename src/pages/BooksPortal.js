import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import SearchBar from '../components/portal/SearchBar';
import { HERO_IMAGES } from '../utils/imageConstants';
import { SUBJECTS, GRADES, getSubjectById } from '../utils/portalConstants';
import {
  FaBook, FaBookOpen, FaTimes, FaDownload,
  FaGlobe, FaFilter, FaExternalLinkAlt
} from 'react-icons/fa';

// ─── Constants ───────────────────────────────────────────────────────────────

const BOOK_CATEGORIES = [
  { id: 'textbook', label: 'Textbook' },
  { id: 'study-guide', label: 'Study Guide' },
  { id: 'reference', label: 'Reference' },
];

const COVER_COLORS = {
  'mathematics': '#147538',
  'physical-sciences': '#1565C0',
  'life-sciences': '#2E7D32',
  'accounting': '#5D4037',
  'business-studies': '#BF360C',
  'economics': '#0277BD',
  'english': '#6A1B9A',
  'afrikaans': '#283593',
  'history': '#B71C1C',
  'geography': '#00695C',
  'life-orientation': '#E65100',
};

const getCoverColor = (subject) => COVER_COLORS[subject] || '#0D4E25';

const getHostname = (url) => {
  try { return new URL(url).hostname; }
  catch { return url; }
};

// ─── Book Preview Modal ───────────────────────────────────────────────────────

const BookPreviewModal = ({ book, onClose }) => {
  const subject = getSubjectById(book.subject);
  const coverColor = getCoverColor(book.subject);

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
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Details: ${book.title}`}
      >
        {/* Colored header */}
        <div className="relative p-6 rounded-t-2xl" style={{ backgroundColor: coverColor }}>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          >
            <FaTimes />
          </button>

          {book.isOpenAccess && (
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              <FaGlobe className="text-xs" /> Free &amp; Open Access
            </span>
          )}

          <h2 className="text-xl font-heading font-bold text-white leading-snug pr-10">
            {book.title}
          </h2>
          <p className="text-white/75 text-sm mt-1">{book.author}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {book.grades.map((g) => (
              <span key={g} className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Grade {g}
              </span>
            ))}
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
              {book.category.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-neutral-600 text-sm leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'Publisher', value: book.publisher },
              { label: 'Edition', value: book.edition },
              { label: 'Subject', value: subject?.name || book.subject },
              { label: 'Pages', value: book.pageCount ? `~${book.pageCount} pages` : 'N/A' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-neutral-50 rounded-xl p-3">
                <p className="text-xs text-neutral-400 uppercase tracking-wide font-semibold mb-0.5">{label}</p>
                <p className="text-neutral-700 font-medium text-sm">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={book.readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
              style={{ backgroundColor: coverColor }}
            >
              <FaBookOpen className="text-xs" />
              Read Online
            </a>
            <a
              href={book.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-neutral-200 text-neutral-700 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              <FaDownload className="text-xs" />
              Download PDF
            </a>
          </div>

          <p className="text-xs text-neutral-400 flex items-center gap-1.5">
            <FaExternalLinkAlt className="text-[10px]" />
            Source: {getHostname(book.readUrl)}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Book Card ────────────────────────────────────────────────────────────────

const BookCard = ({ book, onPreview }) => {
  const coverColor = getCoverColor(book.subject);
  const subject = getSubjectById(book.subject);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
      onClick={() => onPreview(book)}
    >
      {/* Book cover */}
      <div className="relative p-5 pt-6" style={{ backgroundColor: coverColor }}>
        {book.isOpenAccess && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 bg-white/25 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <FaGlobe className="text-[9px]" /> Free
            </span>
          </div>
        )}
        <FaBook className="text-white/40 text-3xl mb-3" />
        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">
          {book.category.replace('-', ' ')}
        </p>
        <h3 className="text-white font-heading font-bold text-sm leading-snug line-clamp-3">
          {book.title}
        </h3>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div>
          <p className="text-neutral-600 text-xs font-medium leading-snug">{book.author}</p>
          <p className="text-neutral-400 text-xs">{book.publisher}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {book.grades.map((g) => (
            <span
              key={g}
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: coverColor }}
            >
              Gr {g}
            </span>
          ))}
          {subject && (
            <span className="text-xs text-neutral-500 px-2 py-0.5 bg-neutral-100 rounded-full">
              {subject.name}
            </span>
          )}
        </div>

        <button
          className="w-full mt-1 py-2 text-sm font-semibold rounded-xl text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: coverColor }}
          onClick={(e) => { e.stopPropagation(); onPreview(book); }}
        >
          <FaBookOpen className="inline mr-1.5 text-xs" />
          View Details
        </button>
      </div>
    </div>
  );
};

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

const BookFilterSidebar = ({ filters, onFilterChange, resultCount, availableGrades }) => {
  const hasFilters = filters.subject || filters.grade || filters.category || filters.openAccessOnly;

  const clearAll = () => onFilterChange({
    subject: null, grade: null, category: null, openAccessOnly: false, searchQuery: filters.searchQuery
  });

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFilter className="text-primary text-sm" />
          <span className="font-heading font-bold text-neutral-800 text-sm">Filters</span>
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-primary font-semibold hover:underline">
            Clear all
          </button>
        )}
      </div>

      <p className="text-xs text-neutral-400 -mt-2">
        {resultCount} book{resultCount !== 1 ? 's' : ''} found
      </p>

      {/* Subject */}
      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Subject</p>
        <select
          value={filters.subject || ''}
          onChange={(e) => onFilterChange({ ...filters, subject: e.target.value || null })}
          className="w-full text-sm border border-neutral-200 rounded-xl px-3 py-2 text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="">All Subjects</option>
          {SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Grade */}
      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Grade</p>
        <div className="flex flex-wrap gap-1.5">
          {availableGrades.map((g) => (
            <button
              key={g}
              onClick={() => onFilterChange({ ...filters, grade: filters.grade === g ? null : g })}
              className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors ${
                filters.grade === g
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Type</p>
        <div className="flex flex-col gap-1">
          {BOOK_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onFilterChange({ ...filters, category: filters.category === c.id ? null : c.id })}
              className={`text-left text-sm px-3 py-2 rounded-xl font-medium transition-colors ${
                filters.category === c.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Open Access toggle */}
      <button
        onClick={() => onFilterChange({ ...filters, openAccessOnly: !filters.openAccessOnly })}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          filters.openAccessOnly
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
        }`}
      >
        <FaGlobe className="text-xs flex-shrink-0" />
        Free / Open Access Only
      </button>
    </div>
  );
};

// ─── Main Portal ──────────────────────────────────────────────────────────────

const BooksPortal = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    subject: null, grade: null, category: null, openAccessOnly: false, searchQuery: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewBook, setPreviewBook] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/data/books-metadata.json');
        if (!res.ok) throw new Error('Failed to load books data');
        const data = await res.json();
        setBooks(data);
      } catch {
        setError('Failed to load the library. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const availableGrades = useMemo(() => {
    const gradeSet = new Set(books.flatMap((b) => b.grades));
    return GRADES.filter((g) => gradeSet.has(g));
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = books;
    if (filters.subject) result = result.filter((b) => b.subject === filters.subject);
    if (filters.grade) result = result.filter((b) => b.grades.includes(filters.grade));
    if (filters.category) result = result.filter((b) => b.category === filters.category);
    if (filters.openAccessOnly) result = result.filter((b) => b.isOpenAccess);
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [books, filters]);

  const stats = useMemo(() => ({
    total: books.length,
    subjects: new Set(books.map((b) => b.subject)).size,
    openAccess: books.filter((b) => b.isOpenAccess).length,
  }), [books]);

  return (
    <>
      <SEO
        title="Books & Textbooks Library | Harding Secondary School"
        description="Access free CAPS-aligned textbooks and study guides for Grades 10–12. Includes Siyavula textbooks and DBE Mind the Gap study guides."
        keywords="textbooks, study guides, CAPS, Siyavula, Mind the Gap, free books, secondary school, Harding"
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.library}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/87" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaBook className="text-xs" />
              Digital Library
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Books &amp; Textbooks
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Free, CAPS-aligned textbooks and study guides for Grades 10–12. Access official resources anytime, anywhere.
            </p>

            {!loading && !error && (
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {[
                  { label: 'Books Available', value: stats.total },
                  { label: 'Subjects Covered', value: stats.subjects },
                  { label: 'Free to Access', value: stats.openAccess },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-heading font-bold text-accent-neon">{value}</p>
                    <p className="text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <div className="bg-neutral-50 min-h-screen">
          <div className="container-custom py-10 md:py-16">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-neutral-500 text-sm">Loading library…</p>
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
            ) : (
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar */}
                <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-[120px] lg:max-h-[calc(100vh-136px)] lg:overflow-y-auto">
                  <BookFilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    resultCount={filteredBooks.length}
                    availableGrades={availableGrades}
                  />
                </aside>

                {/* Main area */}
                <div className="flex-1 min-w-0 space-y-5">
                  <SearchBar
                    value={filters.searchQuery}
                    onChange={(query) => setFilters((f) => ({ ...f, searchQuery: query }))}
                    resultCount={filteredBooks.length}
                  />

                  {filteredBooks.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                      <FaBook className="text-4xl text-neutral-300 mx-auto mb-4" />
                      <h3 className="font-heading font-bold text-neutral-700 mb-2">No books found</h3>
                      <p className="text-neutral-400 text-sm">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} onPreview={setPreviewBook} />
                      ))}
                    </div>
                  )}

                  {/* Attribution note */}
                  <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 text-sm text-neutral-600">
                    <p className="font-semibold text-primary mb-1">About these resources</p>
                    <p>
                      All books listed here are freely available from official sources including{' '}
                      <a
                        href="https://www.siyavula.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        Siyavula
                      </a>{' '}
                      and the{' '}
                      <a
                        href="https://www.education.gov.za"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        Department of Basic Education
                      </a>
                      . For physical copies, grades 8–9 resources, or print-outs, visit the school library.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {previewBook && (
        <BookPreviewModal book={previewBook} onClose={() => setPreviewBook(null)} />
      )}
    </>
  );
};

export default BooksPortal;
