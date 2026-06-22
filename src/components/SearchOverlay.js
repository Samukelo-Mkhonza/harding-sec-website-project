import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaSearch, FaTimes, FaArrowRight,
  FaHome, FaInfoCircle, FaBook, FaUserGraduate, FaImages, FaEnvelope,
  FaFileAlt, FaUsers, FaUserTie, FaCalendarAlt, FaFolderOpen, FaBriefcase,
  FaShieldAlt, FaGavel, FaStar,
} from 'react-icons/fa';
import { VALIDATION } from '../utils/constants';

/* ── Searchable page index ───────────────────────────────────────────── */
const ALL_PAGES = [
  { id: 'home',           title: 'Home',                  excerpt: 'Welcome to Harding Secondary School',              category: 'Pages',      url: '/',                Icon: FaHome },
  { id: 'about',          title: 'About Us',               excerpt: 'Our history, values and school story since 1950',  category: 'Pages',      url: '/about',           Icon: FaInfoCircle },
  { id: 'academics',      title: 'Academics',              excerpt: 'Subjects, curriculum and academic excellence',      category: 'Pages',      url: '/academics',       Icon: FaBook },
  { id: 'admissions',     title: 'Admissions',             excerpt: 'Enrolment process and application requirements',    category: 'Pages',      url: '/admissions',      Icon: FaUserGraduate },
  { id: 'student-life',   title: 'Student Life',           excerpt: 'Clubs, sports, culture and extracurriculars',      category: 'Pages',      url: '/student-life',    Icon: FaStar },
  { id: 'gallery',        title: 'Gallery',                excerpt: 'Photos from school events and activities',          category: 'Pages',      url: '/gallery',         Icon: FaImages },
  { id: 'contact',        title: 'Contact Us',             excerpt: 'Get in touch with the school office',              category: 'Pages',      url: '/contact',         Icon: FaEnvelope },
  { id: 'past-papers',    title: 'Past Papers Portal',     excerpt: 'Download past exam papers and marking memos',      category: 'Resources',  url: '/past-papers',     Icon: FaFileAlt },
  { id: 'parent-portal',  title: 'Parent Portal',          excerpt: 'Access your child\'s academic reports',            category: 'Resources',  url: '/parent-portal',   Icon: FaUsers },
  { id: 'student-portal', title: 'Student Portal',         excerpt: 'Study resources, timetables and downloads',        category: 'Resources',  url: '/student-portal',  Icon: FaUserGraduate },
  { id: 'staff-portal',   title: 'Staff Portal',           excerpt: 'Secure access for educators and admin staff',      category: 'Resources',  url: '/staff-portal',    Icon: FaUserTie },
  { id: 'calendar',       title: 'School Calendar',        excerpt: 'Term dates, exams, events and public holidays',    category: 'Information',url: '/school-calendar', Icon: FaCalendarAlt },
  { id: 'policies',       title: 'Policies & Documents',   excerpt: 'Code of conduct, assessment and safety policies',  category: 'Information',url: '/policies',        Icon: FaFolderOpen },
  { id: 'careers',        title: 'Career Opportunities',   excerpt: 'Current vacancies and how to apply',               category: 'Information',url: '/careers',         Icon: FaBriefcase },
  { id: 'privacy',        title: 'Privacy Policy',         excerpt: 'How we collect and protect your information',      category: 'Legal',      url: '/privacy-policy',  Icon: FaShieldAlt },
  { id: 'terms',          title: 'Terms of Use',           excerpt: 'Terms governing use of this website',             category: 'Legal',      url: '/terms-of-use',    Icon: FaGavel },
];

const QUICK_LINKS = ALL_PAGES.filter(p =>
  ['home', 'about', 'academics', 'admissions', 'past-papers', 'contact'].includes(p.id)
);

const CATEGORY_ORDER = ['Pages', 'Resources', 'Information', 'Legal'];

/* ── Highlight matched text ──────────────────────────────────────────── */
const Highlight = ({ text, query }) => {
  if (!query) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} className="bg-primary/15 text-primary font-semibold not-italic">{part}</mark>
          : part
      )}
    </>
  );
};

/* ── Single result row ───────────────────────────────────────────────── */
const ResultRow = ({ result, query, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-100 ${
      isActive ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-50 text-neutral-700'
    }`}
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
      isActive ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'
    }`}>
      <result.Icon className="text-xs" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold leading-snug truncate">
        <Highlight text={result.title} query={query} />
      </p>
      <p className={`text-xs truncate mt-0.5 ${isActive ? 'text-primary/70' : 'text-neutral-400'}`}>
        <Highlight text={result.excerpt} query={query} />
      </p>
    </div>
    <FaArrowRight className={`text-xs flex-shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-neutral-300'}`} />
  </button>
);

/* ── Main overlay ────────────────────────────────────────────────────── */
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
      setActiveIdx(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= VALIDATION.MIN_SEARCH_CHARS) {
      const t = setTimeout(() => {
        const q = query.toLowerCase();
        const found = ALL_PAGES.filter(p =>
          p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
        );
        setResults(found);
        setActiveIdx(0);
      }, 200);
      return () => clearTimeout(t);
    } else {
      setResults([]);
      setActiveIdx(0);
    }
  }, [query]);

  const goTo = (url) => { navigate(url); onClose(); setQuery(''); };

  const handleKey = (e) => {
    if (e.key === 'Escape') { onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && results[activeIdx]) { goTo(results[activeIdx].url); }
  };

  /* Group results by category in order */
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = results.filter(r => r.category === cat);
    if (items.length) acc.push({ cat, items });
    return acc;
  }, []);

  /* Flat list index for keyboard tracking */
  const flatResults = grouped.flatMap(g => g.items);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-16 md:pt-24"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -16 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* ── Input row ── */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100">
              <FaSearch className="text-primary flex-shrink-0 text-base" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Search pages, resources, documents…"
                className="flex-1 text-base text-neutral-800 placeholder-neutral-400 bg-transparent outline-none"
                aria-label="Search"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-neutral-500 text-xs" />
                </button>
              ) : (
                <span className="hidden sm:flex items-center gap-1 flex-shrink-0">
                  <kbd className="text-[10px] px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded font-mono text-neutral-500">ESC</kbd>
                </span>
              )}
            </div>

            {/* ── Body ── */}
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">

              {/* Empty state — quick links */}
              {!query && (
                <div className="px-5 py-5">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Quick Links</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {QUICK_LINKS.map(link => (
                      <button
                        key={link.id}
                        onClick={() => goTo(link.url)}
                        className="flex items-center gap-2.5 px-3 py-2.5 bg-neutral-50 hover:bg-primary/10 hover:text-primary border border-neutral-100 rounded-xl text-left transition-all group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          <link.Icon className="text-xs" />
                        </div>
                        <span className="text-xs font-semibold text-neutral-600 group-hover:text-primary truncate">{link.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing hint */}
              {query.length > 0 && query.length < VALIDATION.MIN_SEARCH_CHARS && (
                <div className="px-5 py-6 text-center text-sm text-neutral-400">
                  Keep typing…
                </div>
              )}

              {/* Results by category */}
              {grouped.length > 0 && (
                <div className="px-3 py-3 space-y-4">
                  {grouped.map(({ cat, items }) => (
                    <div key={cat}>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 mb-1.5">{cat}</p>
                      <div className="space-y-0.5">
                        {items.map(result => {
                          const flatIdx = flatResults.indexOf(result);
                          return (
                            <ResultRow
                              key={result.id}
                              result={result}
                              query={query}
                              isActive={flatIdx === activeIdx}
                              onClick={() => goTo(result.url)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No results */}
              {query.length >= VALIDATION.MIN_SEARCH_CHARS && results.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <p className="text-neutral-500 text-sm mb-1">No results for <strong>"{query}"</strong></p>
                  <p className="text-xs text-neutral-400">Try: "admissions", "past papers", "contact"</p>
                </div>
              )}
            </div>

            {/* ── Keyboard hint footer ── */}
            <div className="flex items-center justify-between gap-4 px-5 py-3 border-t border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-4 text-[10px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono">ESC</kbd>
                  Close
                </span>
              </div>
              <span className="text-[10px] text-neutral-300 hidden sm:block">
                Harding Secondary School
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
