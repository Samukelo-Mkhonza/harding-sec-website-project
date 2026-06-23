import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  FaUniversity, FaClipboardList, FaCalendarAlt, FaCalculator,
  FaExternalLinkAlt, FaFilter, FaTimes, FaCheck, FaArrowRight,
  FaMapMarkerAlt, FaSortUp, FaSortDown, FaInfoCircle, FaSearch,
  FaCheckCircle, FaClock, FaTimesCircle, FaPlus, FaTrash,
  FaGraduationCap, FaChevronDown, FaChevronUp, FaBuilding,
  FaHospital, FaBalanceScale, FaBriefcase, FaBook, FaUsers, FaGlobe
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── LocalStorage ─────────────────────────────────────────────────────────────
const TRACKER_KEY = 'hss_uni_applications';
const loadTracker = () => {
  try { return JSON.parse(localStorage.getItem(TRACKER_KEY)) || {}; }
  catch { return {}; }
};
const saveTracker = (data) => {
  try { localStorage.setItem(TRACKER_KEY, JSON.stringify(data)); } catch {}
};

// ─── Constants ────────────────────────────────────────────────────────────────
const PROVINCES = ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'];

const INST_TYPES = [
  'Traditional University',
  'Comprehensive University',
  'University of Technology',
  'Health Sciences University',
];

const TYPE_COLORS = {
  'Traditional University': '#0D4E25',
  'Comprehensive University': '#0277BD',
  'University of Technology': '#E65100',
  'Health Sciences University': '#6A1B9A',
};

const TYPE_SHORT = {
  'Traditional University': 'Traditional',
  'Comprehensive University': 'Comprehensive',
  'University of Technology': 'UoT',
  'Health Sciences University': 'Health Sciences',
};

const TRACKER_STATUSES = [
  { value: 'Not Started', colorClass: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400' },
  { value: 'In Progress', colorClass: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
  { value: 'Submitted', colorClass: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  { value: 'Accepted', colorClass: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  { value: 'Rejected', colorClass: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
];

const FACULTY_KEYS = ['engineering', 'healthSciences', 'law', 'commerce', 'education', 'humanities'];
const FACULTY_LABELS = {
  engineering: 'Engineering',
  healthSciences: 'Health Sciences',
  law: 'Law',
  commerce: 'Commerce',
  education: 'Education',
  humanities: 'Humanities',
};
const FACULTY_ICONS = {
  engineering: FaBuilding,
  healthSciences: FaHospital,
  law: FaBalanceScale,
  commerce: FaBriefcase,
  education: FaBook,
  humanities: FaUsers,
};

const NSC_SUBJECTS = [
  'English Home Language',
  'Afrikaans Home Language',
  'isiZulu Home Language',
  'isiXhosa Home Language',
  'Sesotho Home Language',
  'Setswana Home Language',
  'siSwati Home Language',
  'Tshivenda Home Language',
  'Xitsonga Home Language',
  'isiNdebele Home Language',
  'Sepedi (Northern Sotho) Home Language',
  'English First Additional Language',
  'Afrikaans First Additional Language',
  'Mathematics',
  'Mathematical Literacy',
  'Life Orientation',
  'Physical Sciences',
  'Life Sciences (Biology)',
  'Accounting',
  'Business Studies',
  'Economics',
  'History',
  'Geography',
  'Agricultural Sciences',
  'Computer Applications Technology',
  'Information Technology',
  'Engineering Graphics & Design',
  'Visual Arts',
  'Music',
  'Dramatic Arts',
  'Consumer Studies',
  'Tourism',
  'Religion Studies',
];

// ─── Utilities ────────────────────────────────────────────────────────────────
const getStatus = (openDate, closeDate) => {
  const now = new Date();
  const open = new Date(openDate);
  const close = new Date(closeDate);
  if (now < open) return 'upcoming';
  if (now > close) return 'closed';
  if (close - now < 7 * 24 * 60 * 60 * 1000) return 'closing-soon';
  return 'open';
};

const STATUS_STYLES = {
  open: { pill: 'bg-green-100 text-green-700 border border-green-200', dot: 'bg-green-500', label: 'Open' },
  'closing-soon': { pill: 'bg-amber-100 text-amber-700 border border-amber-200', dot: 'bg-amber-500', label: 'Closing Soon' },
  closed: { pill: 'bg-neutral-100 text-neutral-500 border border-neutral-200', dot: 'bg-neutral-400', label: 'Closed' },
  upcoming: { pill: 'bg-blue-50 text-blue-600 border border-blue-100', dot: 'bg-blue-500', label: 'Upcoming' },
};

const getAPSRating = (pct) => {
  const p = Number(pct);
  if (p >= 80) return 7;
  if (p >= 70) return 6;
  if (p >= 60) return 5;
  if (p >= 50) return 4;
  if (p >= 40) return 3;
  if (p >= 30) return 2;
  if (p > 0) return 1;
  return 0;
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
};

const daysUntil = (iso) => Math.ceil((new Date(iso) - new Date()) / (1000 * 60 * 60 * 24));

// ─── University Card ──────────────────────────────────────────────────────────
const UniversityCard = ({ uni, isTracked, onTrack, status, onClick }) => {
  const typeColor = TYPE_COLORS[uni.type] || '#0D4E25';
  const st = STATUS_STYLES[status];
  const apsEntries = FACULTY_KEYS.filter((k) => uni.aps[k]?.min).slice(0, 3);

  return (
    <div
      className="bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
      onClick={() => onClick(uni)}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: typeColor }} />
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${st.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`} />
            {st.label}
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
            style={{ backgroundColor: typeColor }}
          >
            {TYPE_SHORT[uni.type]}
          </span>
        </div>

        <div>
          <p className="text-xl font-heading font-bold text-neutral-800 leading-none">{uni.shortName}</p>
          <p className="text-xs text-neutral-600 font-medium leading-snug mt-0.5 line-clamp-2">{uni.name}</p>
          <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-1">
            <FaMapMarkerAlt className="text-[9px] flex-shrink-0" />
            {uni.city}
          </p>
        </div>

        {apsEntries.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {apsEntries.map((k) => (
              <span key={k} className="text-[10px] px-1.5 py-0.5 bg-neutral-100 text-neutral-500 rounded-full">
                {FACULTY_LABELS[k]}: {uni.aps[k].min}+
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-1">
          <button
            onClick={(e) => { e.stopPropagation(); onTrack(uni.id); }}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
              isTracked
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {isTracked ? <FaCheck className="text-[9px]" /> : <FaPlus className="text-[9px]" />}
            {isTracked ? 'Tracking' : 'Track'}
          </button>
          <a
            href={uni.applicationPortal}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: typeColor }}
          >
            Apply <FaExternalLinkAlt className="text-[8px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── University Detail Modal ──────────────────────────────────────────────────
const UniDetailModal = ({ uni, onClose, isTracked, onTrack, status }) => {
  const typeColor = TYPE_COLORS[uni.type] || '#0D4E25';
  const st = STATUS_STYLES[status];
  const days = daysUntil(uni.applicationClose);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
        aria-label={`Details: ${uni.name}`}
      >
        <div className="relative p-6 rounded-t-2xl" style={{ backgroundColor: typeColor }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes />
          </button>

          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            {TYPE_SHORT[uni.type]}
          </span>

          <h2 className="text-xl font-heading font-bold text-white leading-snug pr-10">{uni.name}</h2>
          <p className="text-white/75 text-sm mt-1 flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-xs" />
            {uni.city}, {uni.province}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${st.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
              {st.label}
            </span>
            {status !== 'closed' && (
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {status === 'upcoming' ? `Opens ${fmtDate(uni.applicationOpen)}` : `Closes ${fmtDate(uni.applicationClose)}`}
                {status === 'open' && days > 0 && ` · ${days} days left`}
              </span>
            )}
            {(uni.applicationOpenEstimated || uni.applicationCloseEstimated) && (
              <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full">Dates estimated</span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-neutral-50 rounded-xl p-3">
              <p className="text-xs text-neutral-400 uppercase tracking-wide font-semibold mb-0.5">Opens</p>
              <p className="text-neutral-700 font-medium text-sm">{fmtDate(uni.applicationOpen)}</p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3">
              <p className="text-xs text-neutral-400 uppercase tracking-wide font-semibold mb-0.5">Closes</p>
              <p className="text-neutral-700 font-medium text-sm">{fmtDate(uni.applicationClose)}</p>
            </div>
          </div>

          {uni.notes && (
            <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
              <FaInfoCircle className="text-amber-500 mt-0.5 flex-shrink-0 text-xs" />
              <p>{uni.notes}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">APS Requirements by Faculty</p>
            <div className="space-y-2">
              {FACULTY_KEYS.map((k) => {
                const entry = uni.aps[k];
                const Icon = FACULTY_ICONS[k];
                return (
                  <div key={k} className="flex items-start gap-3 bg-neutral-50 rounded-xl p-3">
                    <Icon className="text-neutral-400 mt-0.5 text-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-700">{FACULTY_LABELS[k]}</p>
                      {entry?.min ? (
                        <p className="text-xs text-neutral-500 mt-0.5">{entry.notes}</p>
                      ) : (
                        <p className="text-xs text-neutral-400 mt-0.5">{entry?.notes || 'Not offered'}</p>
                      )}
                    </div>
                    {entry?.min && (
                      <span
                        className="text-xs font-bold text-white px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: typeColor }}
                      >
                        {entry.min}+
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {uni.strengths && (
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Strengths</p>
              <p className="text-sm text-neutral-600">{uni.strengths}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => onTrack(uni.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isTracked
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {isTracked ? <FaCheck className="text-xs" /> : <FaPlus className="text-xs" />}
              {isTracked ? 'Tracked' : 'Track Application'}
            </button>
            <a
              href={uni.applicationPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: typeColor }}
            >
              Apply Now <FaExternalLinkAlt className="text-xs" />
            </a>
            <a
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-200 text-neutral-700 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              <FaGlobe className="text-xs" /> Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
const FilterSidebar = ({ filters, onChange, resultCount }) => {
  const hasFilters = filters.province || filters.type || filters.status;
  const clearAll = () => onChange({ ...filters, province: '', type: '', status: '' });

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
      <p className="text-xs text-neutral-400 -mt-2">{resultCount} {resultCount === 1 ? 'university' : 'universities'} found</p>

      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Province</p>
        <select
          value={filters.province}
          onChange={(e) => onChange({ ...filters, province: e.target.value })}
          className="w-full text-sm border border-neutral-200 rounded-xl px-3 py-2 text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="">All Provinces</option>
          {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Institution Type</p>
        <div className="flex flex-col gap-1">
          {INST_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...filters, type: filters.type === t ? '' : t })}
              className={`text-left text-sm px-3 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                filters.type === t ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: TYPE_COLORS[t] }}
              />
              {TYPE_SHORT[t]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Application Status</p>
        <div className="flex flex-col gap-1">
          {['open', 'closing-soon', 'upcoming', 'closed'].map((s) => {
            const st = STATUS_STYLES[s];
            return (
              <button
                key={s}
                onClick={() => onChange({ ...filters, status: filters.status === s ? '' : s })}
                className={`text-left text-sm px-3 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                  filters.status === s ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${st.dot}`} />
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-1 border-t border-neutral-100">
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Legend</p>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-xs text-neutral-500">{TYPE_SHORT[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Application Tracker Tab ──────────────────────────────────────────────────
const TrackerTab = ({ universities, tracker, onUpdate, onRemove }) => {
  const [expandedNotes, setExpandedNotes] = useState({});

  const tracked = universities.filter((u) => tracker[u.id]);

  if (tracked.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
        <FaClipboardList className="text-4xl text-neutral-300 mx-auto mb-4" />
        <h3 className="font-heading font-bold text-neutral-700 mb-2">No applications tracked yet</h3>
        <p className="text-neutral-400 text-sm max-w-xs mx-auto">
          Go to the University Directory tab and click "Track" on any university to start tracking your applications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-sm text-neutral-600 flex items-start gap-2">
        <FaInfoCircle className="text-primary mt-0.5 flex-shrink-0" />
        <p>Tracking {tracked.length} {tracked.length === 1 ? 'application' : 'applications'}. Your data is saved locally in this browser.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {tracked.map((uni) => {
          const entry = tracker[uni.id];
          const typeColor = TYPE_COLORS[uni.type] || '#0D4E25';
          const statusDef = TRACKER_STATUSES.find((s) => s.value === entry.status) || TRACKER_STATUSES[0];
          const appStatus = getStatus(uni.applicationOpen, uni.applicationClose);
          const appSt = STATUS_STYLES[appStatus];
          const isExpanded = expandedNotes[uni.id];

          return (
            <div key={uni.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
              <div className="h-1" style={{ backgroundColor: typeColor }} />
              <div className="p-4">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-neutral-800">{uni.shortName}</span>
                      <span className="text-xs text-neutral-400">{uni.province}</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${appSt.pill}`}>
                        <span className={`w-1 h-1 rounded-full ${appSt.dot}`} />
                        {appSt.label}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 truncate">{uni.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Closes {fmtDate(uni.applicationClose)}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select
                      value={entry.status}
                      onChange={(e) => onUpdate(uni.id, { ...entry, status: e.target.value })}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ${statusDef.colorClass}`}
                    >
                      {TRACKER_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>{s.value}</option>
                      ))}
                    </select>
                    <a
                      href={uni.applicationPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: typeColor }}
                      title="Open application portal"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                    <button
                      onClick={() => onRemove(uni.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      title="Remove from tracker"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    onClick={() => setExpandedNotes((prev) => ({ ...prev, [uni.id]: !prev[uni.id] }))}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    {isExpanded ? <FaChevronUp className="text-[9px]" /> : <FaChevronDown className="text-[9px]" />}
                    {entry.notes ? 'Edit notes' : 'Add notes'}
                  </button>
                  {isExpanded && (
                    <textarea
                      value={entry.notes || ''}
                      onChange={(e) => onUpdate(uni.id, { ...entry, notes: e.target.value })}
                      placeholder="Add notes about your application..."
                      rows={2}
                      className="mt-2 w-full text-xs border border-neutral-200 rounded-xl px-3 py-2 text-neutral-700 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  )}
                  {!isExpanded && entry.notes && (
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{entry.notes}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Deadline Calendar Tab ────────────────────────────────────────────────────
const DeadlineCalendar = ({ universities }) => {
  const [sortBy, setSortBy] = useState('close');
  const [sortDir, setSortDir] = useState('asc');

  const sorted = useMemo(() => {
    const arr = universities.map((u) => ({ ...u, status: getStatus(u.applicationOpen, u.applicationClose) }));
    return arr.sort((a, b) => {
      let av, bv;
      if (sortBy === 'close') { av = new Date(a.applicationClose); bv = new Date(b.applicationClose); }
      else if (sortBy === 'open') { av = new Date(a.applicationOpen); bv = new Date(b.applicationOpen); }
      else { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [universities, sortBy, sortDir]);

  const toggleSort = (col) => {
    if (sortBy === col) setDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };
  const setDir = setSortDir;

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <FaSortUp className="text-neutral-300 text-[10px]" />;
    return sortDir === 'asc'
      ? <FaSortUp className="text-primary text-[10px]" />
      : <FaSortDown className="text-primary text-[10px]" />;
  };

  const rowColor = (status) => {
    if (status === 'open') return 'border-l-4 border-l-green-400';
    if (status === 'closing-soon') return 'border-l-4 border-l-amber-400';
    if (status === 'closed') return 'border-l-4 border-l-neutral-300 opacity-60';
    return 'border-l-4 border-l-blue-400';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h2 className="font-heading font-bold text-neutral-800">Application Deadlines — 2026/2027</h2>
        <div className="flex items-center gap-2 text-xs">
          {['open', 'closing-soon', 'upcoming', 'closed'].map((s) => {
            const st = STATUS_STYLES[s];
            return (
              <span key={s} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${st.pill}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                {st.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-primary transition-colors">
                    University <SortIcon col="name" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Province</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">
                  <button onClick={() => toggleSort('open')} className="flex items-center gap-1 hover:text-primary transition-colors">
                    Opens <SortIcon col="open" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  <button onClick={() => toggleSort('close')} className="flex items-center gap-1 hover:text-primary transition-colors">
                    Closes <SortIcon col="close" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">Apply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {sorted.map((uni) => {
                const st = STATUS_STYLES[uni.status];
                const days = daysUntil(uni.applicationClose);
                const typeColor = TYPE_COLORS[uni.type] || '#0D4E25';
                return (
                  <tr key={uni.id} className={`hover:bg-neutral-50 transition-colors ${rowColor(uni.status)}`}>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-semibold text-neutral-800">{uni.shortName}</span>
                        <span className="text-neutral-400 text-xs ml-2 hidden sm:inline">{uni.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 text-xs hidden md:table-cell">{uni.province}</td>
                    <td className="px-4 py-3 text-neutral-500 text-xs hidden lg:table-cell">{fmtDate(uni.applicationOpen)}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-neutral-700 text-xs font-medium">{fmtDate(uni.applicationClose)}</p>
                        {uni.status === 'open' && days > 0 && (
                          <p className="text-neutral-400 text-[10px]">{days} days left</p>
                        )}
                        {uni.status === 'closed' && (
                          <p className="text-neutral-400 text-[10px]">{Math.abs(days)} days ago</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${st.pill}`}>
                        <span className={`w-1 h-1 rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={uni.applicationPortal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
                        style={{ backgroundColor: typeColor }}
                      >
                        Apply <FaArrowRight className="text-[8px]" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── APS Calculator Tab ───────────────────────────────────────────────────────
const INIT_SUBJECTS = [
  { subject: 'English Home Language', pct: '' },
  { subject: 'Mathematics', pct: '' },
  { subject: 'Life Orientation', pct: '' },
  { subject: '', pct: '' },
  { subject: '', pct: '' },
  { subject: '', pct: '' },
  { subject: '', pct: '' },
];

const APSCalculator = ({ universities }) => {
  const [subjects, setSubjects] = useState(INIT_SUBJECTS);
  const [targetFaculty, setTargetFaculty] = useState('commerce');
  const [inclLO, setInclLO] = useState(false);

  const ratings = subjects.map((s) => ({ ...s, rating: s.pct !== '' ? getAPSRating(s.pct) : null }));
  const loIndex = subjects.findIndex((s) => s.subject === 'Life Orientation');

  const totalAPS = useMemo(() => {
    const vals = ratings
      .filter((r, i) => r.rating !== null && (inclLO || i !== loIndex))
      .map((r) => r.rating);
    return vals.reduce((a, b) => a + b, 0);
  }, [ratings, inclLO, loIndex]);

  const updateSubject = useCallback((i, field, value) => {
    setSubjects((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }, []);

  const eligible = useMemo(() => {
    return universities
      .map((u) => ({ ...u, minAPS: u.aps[targetFaculty]?.min, notes: u.aps[targetFaculty]?.notes }))
      .filter((u) => u.minAPS)
      .map((u) => ({
        ...u,
        result: totalAPS >= u.minAPS ? 'eligible' : totalAPS >= u.minAPS - 3 ? 'close' : 'not-eligible',
      }))
      .sort((a, b) => a.minAPS - b.minAPS);
  }, [universities, targetFaculty, totalAPS]);

  const ratingColor = (r) => {
    if (r >= 6) return 'text-green-700 bg-green-100';
    if (r >= 4) return 'text-amber-700 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Subject inputs */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-neutral-800">Enter Your Subject Marks</h3>
            <button
              onClick={() => setSubjects(INIT_SUBJECTS)}
              className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="bg-primary/5 border border-primary/15 rounded-xl p-3 text-xs text-neutral-600">
            <p className="font-semibold text-primary mb-0.5">How APS works</p>
            <p>Enter your percentage for each subject. APS is the sum of ratings (1–7 per subject) for your best subjects (excluding Life Orientation by default).</p>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
              <span className="col-span-7">Subject</span>
              <span className="col-span-2 text-center">%</span>
              <span className="col-span-3 text-center">Rating</span>
            </div>
            {subjects.map((s, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-7">
                  <select
                    value={s.subject}
                    onChange={(e) => updateSubject(i, 'subject', e.target.value)}
                    className="w-full text-xs border border-neutral-200 rounded-lg px-2 py-1.5 text-neutral-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary/40"
                  >
                    <option value="">— select subject —</option>
                    {NSC_SUBJECTS.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={s.pct}
                    onChange={(e) => updateSubject(i, 'pct', e.target.value)}
                    placeholder="0"
                    className="w-full text-xs border border-neutral-200 rounded-lg px-2 py-1.5 text-center text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
                <div className="col-span-3 flex justify-center">
                  {s.pct !== '' ? (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ratingColor(getAPSRating(s.pct))}`}>
                      {getAPSRating(s.pct)}/7
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-300">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <button
              onClick={() => setInclLO((v) => !v)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                inclLO ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {inclLO ? '✓' : '+'} Include Life Orientation
            </button>
            <div className="text-right">
              <p className="text-xs text-neutral-400">Your APS Score</p>
              <p className="text-2xl font-heading font-bold text-neutral-800">{totalAPS}<span className="text-sm text-neutral-400 font-normal">/42</span></p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs text-center text-neutral-500 bg-neutral-50 rounded-xl p-3">
            {[['80–100%', '7'], ['70–79%', '6'], ['60–69%', '5'], ['50–59%', '4'], ['40–49%', '3'], ['30–39%', '2'], ['0–29%', '1']].slice(0, 4).map(([range, rating]) => (
              <div key={range}>
                <p className="font-bold text-neutral-700">{rating}</p>
                <p className="text-[10px]">{range}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility results */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-heading font-bold text-neutral-800">University Eligibility</h3>
            <select
              value={targetFaculty}
              onChange={(e) => setTargetFaculty(e.target.value)}
              className="text-xs border border-neutral-200 rounded-lg px-2 py-1.5 text-neutral-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary/40"
            >
              {FACULTY_KEYS.map((k) => <option key={k} value={k}>{FACULTY_LABELS[k]}</option>)}
            </select>
          </div>

          <div className="flex gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
              <FaCheckCircle className="text-[9px]" /> Eligible
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">
              <FaClock className="text-[9px]" /> Close (within 3)
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded-full">
              <FaTimesCircle className="text-[9px]" /> Need more APS
            </span>
          </div>

          {totalAPS === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <FaCalculator className="text-3xl mx-auto mb-2 opacity-30" />
              <p className="text-sm">Enter your marks to see eligibility</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {eligible.length === 0 ? (
                <p className="text-sm text-neutral-400 text-center py-6">No universities offer {FACULTY_LABELS[targetFaculty]}</p>
              ) : (
                eligible.map((u) => {
                  const typeColor = TYPE_COLORS[u.type] || '#0D4E25';
                  const resultStyles = {
                    eligible: 'bg-green-50 border-green-200 text-green-700',
                    close: 'bg-amber-50 border-amber-200 text-amber-700',
                    'not-eligible': 'bg-neutral-50 border-neutral-100 text-neutral-500',
                  };
                  return (
                    <div key={u.id} className={`flex items-center gap-3 rounded-xl border p-3 ${resultStyles[u.result]}`}>
                      <div
                        className="w-1.5 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: u.result === 'eligible' ? '#16a34a' : u.result === 'close' ? '#d97706' : '#d1d5db' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{u.shortName}</p>
                        <p className="text-xs opacity-75 truncate">{u.notes}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold">Min: {u.minAPS}</p>
                        <p className="text-[10px] opacity-75">Your APS: {totalAPS}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Portal ──────────────────────────────────────────────────────────────
const TABS = [
  { id: 'directory', label: 'University Directory', icon: FaUniversity },
  { id: 'tracker', label: 'My Applications', icon: FaClipboardList },
  { id: 'deadlines', label: 'Deadlines', icon: FaCalendarAlt },
  { id: 'calculator', label: 'APS Calculator', icon: FaCalculator },
];

const UniversityApplicationsPortal = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('directory');
  const [filters, setFilters] = useState({ province: '', type: '', status: '', search: '' });
  const [tracker, setTracker] = useState(loadTracker);
  const [selectedUni, setSelectedUni] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/university-applications-data.json');
        if (!res.ok) throw new Error('Failed to load data');
        setUniversities(await res.json());
      } catch {
        setError('Failed to load university data. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleTrack = useCallback((id) => {
    setTracker((prev) => {
      const next = { ...prev };
      if (next[id]) { delete next[id]; }
      else { next[id] = { status: 'Not Started', notes: '' }; }
      saveTracker(next);
      return next;
    });
  }, []);

  const handleTrackerUpdate = useCallback((id, entry) => {
    setTracker((prev) => {
      const next = { ...prev, [id]: entry };
      saveTracker(next);
      return next;
    });
  }, []);

  const handleTrackerRemove = useCallback((id) => {
    setTracker((prev) => {
      const next = { ...prev };
      delete next[id];
      saveTracker(next);
      return next;
    });
  }, []);

  const universityStatuses = useMemo(() => {
    const map = {};
    universities.forEach((u) => { map[u.id] = getStatus(u.applicationOpen, u.applicationClose); });
    return map;
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    let res = universities;
    if (filters.province) res = res.filter((u) => u.province === filters.province);
    if (filters.type) res = res.filter((u) => u.type === filters.type);
    if (filters.status) res = res.filter((u) => universityStatuses[u.id] === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      res = res.filter((u) =>
        u.name.toLowerCase().includes(q) ||
        u.shortName.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.province.toLowerCase().includes(q) ||
        u.faculties.some((f) => f.toLowerCase().includes(q))
      );
    }
    return res;
  }, [universities, filters, universityStatuses]);

  const provinceGroups = useMemo(() => {
    const groups = {};
    filteredUniversities.forEach((u) => {
      if (!groups[u.province]) groups[u.province] = [];
      groups[u.province].push(u);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredUniversities]);

  const stats = useMemo(() => ({
    total: universities.length,
    open: universities.filter((u) => universityStatuses[u.id] === 'open').length,
    tracked: Object.keys(tracker).length,
    provinces: new Set(universities.map((u) => u.province)).size,
  }), [universities, universityStatuses, tracker]);

  return (
    <>
      <SEO
        title="University Applications Portal | Harding Secondary School"
        description="Apply to all 26 South African public universities. Browse universities by province, track your applications, check deadlines and calculate your APS score."
        keywords="South African universities, university applications, APS calculator, DHET, UCT, Wits, Stellenbosch, university application deadlines"
      />
      <div>
        <div className="bg-white"><Breadcrumbs /></div>

        {/* Hero */}
        <section className="relative py-24 md:py-32 text-center overflow-hidden">
          <img src={HERO_IMAGES.campus} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-primary-dark/88" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaGraduationCap className="text-xs" /> University Applications
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              SA University Portal
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              All 26 DHET-accredited public universities in one place. Browse, track your applications, check deadlines and calculate your APS score.
            </p>
            {!loading && !error && (
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                {[
                  { label: 'Universities', value: stats.total },
                  { label: 'Provinces', value: stats.provinces },
                  { label: 'Currently Open', value: stats.open },
                  { label: 'Tracked', value: stats.tracked },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-3xl font-heading font-bold text-accent-neon">{value}</p>
                    <p className="text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <div className="bg-neutral-50 min-h-screen">
          <div className="container-custom py-10 md:py-14">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-neutral-500 text-sm">Loading universities…</p>
              </div>
            ) : error ? (
              <div className="max-w-md mx-auto bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
                <p className="text-red-700 mb-5 text-sm">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">
                  Try Again
                </button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar */}
                <aside className="w-full lg:w-72 flex-shrink-0 space-y-4 lg:sticky lg:top-[120px] lg:max-h-[calc(100vh-136px)] lg:overflow-y-auto">
                  {/* Tab nav in sidebar */}
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-2 space-y-0.5">
                    {TABS.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                          activeTab === id
                            ? 'bg-primary text-white font-semibold'
                            : 'text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <Icon className={`text-sm flex-shrink-0 ${activeTab === id ? 'text-white' : 'text-neutral-400'}`} />
                        {label}
                        {id === 'tracker' && stats.tracked > 0 && (
                          <span className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                            {stats.tracked}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Filters only on directory tab */}
                  {activeTab === 'directory' && (
                    <FilterSidebar
                      filters={filters}
                      onChange={setFilters}
                      resultCount={filteredUniversities.length}
                    />
                  )}

                  {activeTab !== 'directory' && (
                    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Quick Stats</p>
                      <div className="space-y-2">
                        {[
                          { label: 'Total Universities', value: stats.total },
                          { label: 'Applications Open', value: stats.open, color: 'text-green-600' },
                          { label: 'Tracked by You', value: stats.tracked, color: 'text-primary' },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">{label}</span>
                            <span className={`text-sm font-bold ${color || 'text-neutral-700'}`}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>

                {/* Main content area */}
                <div className="flex-1 min-w-0 space-y-5">
                  {/* Directory tab */}
                  {activeTab === 'directory' && (
                    <>
                      {/* Search bar */}
                      <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                        <input
                          type="text"
                          placeholder="Search by university name, city, province, or faculty…"
                          value={filters.search}
                          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-2xl text-sm text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                        {filters.search && (
                          <button
                            onClick={() => setFilters((f) => ({ ...f, search: '' }))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        )}
                      </div>

                      {filteredUniversities.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                          <FaUniversity className="text-4xl text-neutral-300 mx-auto mb-4" />
                          <h3 className="font-heading font-bold text-neutral-700 mb-2">No universities found</h3>
                          <p className="text-neutral-400 text-sm">Try adjusting your filters or search terms.</p>
                        </div>
                      ) : (
                        provinceGroups.map(([province, unis]) => (
                          <div key={province}>
                            <div className="flex items-center gap-3 mb-3">
                              <FaMapMarkerAlt className="text-primary text-sm flex-shrink-0" />
                              <h2 className="font-heading font-bold text-neutral-700 text-sm uppercase tracking-wider">{province}</h2>
                              <span className="text-xs text-neutral-400 bg-neutral-100 rounded-full px-2 py-0.5">{unis.length}</span>
                              <div className="flex-1 h-px bg-neutral-200" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                              {unis.map((uni) => (
                                <UniversityCard
                                  key={uni.id}
                                  uni={uni}
                                  isTracked={!!tracker[uni.id]}
                                  onTrack={handleTrack}
                                  status={universityStatuses[uni.id]}
                                  onClick={setSelectedUni}
                                />
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}

                  {/* Tracker tab */}
                  {activeTab === 'tracker' && (
                    <TrackerTab
                      universities={universities}
                      tracker={tracker}
                      onUpdate={handleTrackerUpdate}
                      onRemove={handleTrackerRemove}
                    />
                  )}

                  {/* Deadlines tab */}
                  {activeTab === 'deadlines' && (
                    <DeadlineCalendar universities={universities} />
                  )}

                  {/* APS Calculator tab */}
                  {activeTab === 'calculator' && (
                    <APSCalculator universities={universities} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedUni && (
        <UniDetailModal
          uni={selectedUni}
          onClose={() => setSelectedUni(null)}
          isTracked={!!tracker[selectedUni.id]}
          onTrack={handleTrack}
          status={universityStatuses[selectedUni.id]}
        />
      )}
    </>
  );
};

export default UniversityApplicationsPortal;
