import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaGraduationCap, FaStar, FaArrowUp, FaArrowDown, FaMinus,
  FaChartBar, FaTrophy, FaUsers, FaFilter,
  FaInfoCircle, FaUniversity,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Data ──────────────────────────────────────────────────────────────────────

const RESULTS = [
  { year: '2015', pass: 71.5, bachelors: 28.3, diploma: 31.4, hc: 11.8, distinctions: 22, enrolled: 142, passed: 101, national: 70.7 },
  { year: '2016', pass: 74.2, bachelors: 30.1, diploma: 33.2, hc: 10.9, distinctions: 26, enrolled: 149, passed: 110, national: 72.5 },
  { year: '2017', pass: 76.8, bachelors: 32.4, diploma: 34.1, hc: 10.3, distinctions: 29, enrolled: 155, passed: 119, national: 75.1 },
  { year: '2018', pass: 79.6, bachelors: 35.2, diploma: 33.8, hc: 10.6, distinctions: 34, enrolled: 161, passed: 128, national: 78.2 },
  { year: '2019', pass: 82.4, bachelors: 38.6, diploma: 32.9, hc: 10.9, distinctions: 38, enrolled: 168, passed: 138, national: 81.3 },
  { year: '2020', pass: 78.3, bachelors: 34.8, diploma: 32.1, hc: 11.4, distinctions: 31, enrolled: 172, passed: 135, national: 76.2 },
  { year: '2021', pass: 80.8, bachelors: 37.1, diploma: 32.5, hc: 11.2, distinctions: 35, enrolled: 175, passed: 141, national: 79.4 },
  { year: '2022', pass: 83.1, bachelors: 39.8, diploma: 32.4, hc: 10.9, distinctions: 36, enrolled: 174, passed: 145, national: 80.1 },
  { year: '2023', pass: 84.2, bachelors: 41.3, diploma: 31.8, hc: 11.1, distinctions: 37, enrolled: 171, passed: 144, national: 82.9 },
  { year: '2024', pass: 87.5, bachelors: 45.3, diploma: 30.4, hc: 11.8, distinctions: 42, enrolled: 176, passed: 154, national: 83.9 },
];

const SUBJECT_RESULTS_2024 = [
  { subject: 'Life Orientation', pass: 98.1, avg: 69.8, distinctions: 15, candidates: 176 },
  { subject: 'isiZulu Home Language', pass: 94.6, avg: 65.2, distinctions: 12, candidates: 168 },
  { subject: 'English First Additional Language', pass: 91.2, avg: 61.4, distinctions: 8, candidates: 176 },
  { subject: 'Life Sciences', pass: 88.4, avg: 58.6, distinctions: 9, candidates: 143 },
  { subject: 'Business Studies', pass: 84.9, avg: 59.3, distinctions: 6, candidates: 118 },
  { subject: 'Geography', pass: 85.3, avg: 58.9, distinctions: 5, candidates: 97 },
  { subject: 'History', pass: 83.7, avg: 57.2, distinctions: 4, candidates: 84 },
  { subject: 'Mathematical Literacy', pass: 93.8, avg: 62.3, distinctions: 4, candidates: 112 },
  { subject: 'Economics', pass: 80.2, avg: 56.8, distinctions: 4, candidates: 76 },
  { subject: 'Physical Sciences', pass: 79.6, avg: 55.4, distinctions: 7, candidates: 89 },
  { subject: 'Accounting', pass: 76.4, avg: 54.1, distinctions: 5, candidates: 61 },
  { subject: 'Mathematics', pass: 72.3, avg: 52.1, distinctions: 6, candidates: 64 },
];

const LATEST = RESULTS[RESULTS.length - 1];
const PREV = RESULTS[RESULTS.length - 2];

// ─── Animated Bar Chart ────────────────────────────────────────────────────────

const BarChart = ({ data, metric, color, showNational, maxVal = 100 }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end gap-1.5 h-52">
        {data.map((item) => {
          const value = item[metric];
          const natValue = item.national;
          const heightPct = (value / maxVal) * 100;
          const natHeightPct = ((natValue || 0) / maxVal) * 100;
          const isLatest = item.year === LATEST.year;

          return (
            <div key={item.year} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] rounded-lg px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {item.year}: {value}%
                {showNational && natValue && <><br />National: {natValue}%</>}
              </div>

              {/* Bar container */}
              <div className="w-full flex items-end justify-center gap-0.5 h-44">
                {/* School bar */}
                <div
                  className="flex-1 rounded-t-lg transition-all duration-700 ease-out relative"
                  style={{
                    height: animated ? `${heightPct}%` : '0%',
                    backgroundColor: isLatest ? color : color + 'aa',
                    transitionDelay: `${data.indexOf(item) * 60}ms`,
                  }}
                >
                  {isLatest && (
                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap"
                      style={{ color }}
                    >
                      {value}%
                    </div>
                  )}
                </div>

                {/* National bar (if enabled) */}
                {showNational && natValue && (
                  <div
                    className="flex-1 rounded-t-lg transition-all duration-700 ease-out opacity-50"
                    style={{
                      height: animated ? `${natHeightPct}%` : '0%',
                      backgroundColor: '#94a3b8',
                      transitionDelay: `${data.indexOf(item) * 60 + 30}ms`,
                    }}
                  />
                )}
              </div>

              {/* Year label */}
              <p className={`text-[10px] font-semibold ${isLatest ? 'text-neutral-800' : 'text-neutral-400'}`}>
                {item.year.slice(2)}
              </p>
            </div>
          );
        })}
      </div>

      {showNational && (
        <div className="flex items-center gap-4 mt-3 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-xs text-neutral-500">Harding Secondary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-slate-400 opacity-50" />
            <span className="text-xs text-neutral-500">National Average</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Subject Progress Bar ─────────────────────────────────────────────────────

const SubjectBar = ({ subject, index }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const color = subject.pass >= 90 ? '#0D4E25' : subject.pass >= 80 ? '#1565C0' : subject.pass >= 70 ? '#E65100' : '#B71C1C';

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-48 flex-shrink-0">
        <p className="text-xs font-semibold text-neutral-700 leading-tight">{subject.subject}</p>
        <p className="text-[10px] text-neutral-400">{subject.candidates} candidates</p>
      </div>
      <div className="flex-1 bg-neutral-100 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: animated ? `${subject.pass}%` : '0%',
            backgroundColor: color,
            transitionDelay: `${index * 50}ms`,
          }}
        />
      </div>
      <div className="w-16 text-right flex-shrink-0">
        <span className="text-sm font-bold" style={{ color }}>{subject.pass}%</span>
      </div>
      <div className="w-12 text-right flex-shrink-0 hidden sm:block">
        <span className="text-[10px] text-neutral-400">{subject.distinctions}★</span>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, Icon, color, trend }) => (
  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '18' }}>
        <Icon style={{ color }} className="text-sm" />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-500' : 'text-neutral-400'}`}>
          {trend > 0 ? <FaArrowUp className="text-[10px]" /> : trend < 0 ? <FaArrowDown className="text-[10px]" /> : <FaMinus className="text-[10px]" />}
          {Math.abs(trend)}pp
        </div>
      )}
    </div>
    <p className="text-3xl font-heading font-bold text-neutral-800">{value}</p>
    <p className="text-sm font-semibold text-neutral-600 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>}
  </div>
);

// ─── Distinctions Tracker ─────────────────────────────────────────────────────

const DistinctionsTracker = () => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  const max = Math.max(...RESULTS.map((r) => r.distinctions));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-end gap-2 h-28">
      {RESULTS.map((r, i) => {
        const pct = (r.distinctions / max) * 100;
        const isLatest = r.year === LATEST.year;
        return (
          <div key={r.year} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {r.distinctions} distinctions
            </div>
            <div
              className="w-full rounded-t-md transition-all duration-700 ease-out"
              style={{
                height: animated ? `${pct}%` : '0%',
                maxHeight: '80px',
                backgroundColor: isLatest ? '#F59E0B' : '#FCD34D',
                transitionDelay: `${i * 50}ms`,
              }}
            />
            <p className={`text-[9px] font-semibold ${isLatest ? 'text-neutral-800' : 'text-neutral-400'}`}>
              {r.year.slice(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

// ─── Pass Type Stacked Bar ────────────────────────────────────────────────────

const PassTypeChart = ({ year }) => {
  const data = RESULTS.find((r) => r.year === year) || LATEST;
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [year]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const segments = [
    { label: "Bachelor's Pass", value: data.bachelors, color: '#0D4E25' },
    { label: 'Diploma Pass', value: data.diploma, color: '#1565C0' },
    { label: 'Higher Certificate', value: data.hc, color: '#0277BD' },
    { label: 'Did Not Pass', value: +(100 - data.pass).toFixed(1), color: '#e5e7eb' },
  ];

  return (
    <div ref={ref}>
      {/* Stacked bar */}
      <div className="flex h-10 rounded-xl overflow-hidden mb-4">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="transition-all duration-700 ease-out flex items-center justify-center overflow-hidden"
            style={{
              width: animated ? `${seg.value}%` : '0%',
              backgroundColor: seg.color,
            }}
          >
            {seg.value > 8 && (
              <span className="text-[10px] font-bold text-white whitespace-nowrap px-1">{seg.value}%</span>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-neutral-600">{seg.label} — <strong>{seg.value}%</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const MatricResults = () => {
  const [selectedYear, setSelectedYear] = useState(LATEST.year);
  const [showNational, setShowNational] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const passTrend = +(LATEST.pass - PREV.pass).toFixed(1);
  const bachTrend = +(LATEST.bachelors - PREV.bachelors).toFixed(1);
  const distTrend = LATEST.distinctions - PREV.distinctions;

  return (
    <>
      <SEO
        title="Matric Results Dashboard | Harding Secondary School"
        description="Track Harding Secondary School's matric pass rates, distinctions, and subject performance from 2015 to 2024. Interactive results dashboard."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.graduation}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/88" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaChartBar className="text-xs" />
              Academics — Matric Results
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Matric Results Dashboard
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Ten years of National Senior Certificate results at Harding Secondary — interactive, transparent, and updated every year.
            </p>

            {/* 2024 hero stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { label: '2024 Pass Rate', value: `${LATEST.pass}%`, note: `${LATEST.passed} of ${LATEST.enrolled}` },
                { label: "Bachelor's Passes", value: `${LATEST.bachelors}%`, note: 'University entry passes' },
                { label: 'Distinctions', value: LATEST.distinctions, note: 'Individual distinctions earned' },
              ].map(({ label, value, note }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-accent-neon">{value}</p>
                  <p className="text-white/80 text-sm font-semibold mt-1">{label}</p>
                  <p className="text-white/50 text-xs mt-0.5">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <div className="bg-neutral-50 min-h-screen py-12 md:py-20">
          <div className="container-custom space-y-10">

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'trends', label: 'Historical Trends' },
                { id: 'subjects', label: '2024 Subject Results' },
                { id: 'distinctions', label: 'Distinctions' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === id ? 'bg-primary text-white shadow-sm' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <AnimateOnScroll animation="fade">
                <div className="space-y-8">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Pass Rate" value={`${LATEST.pass}%`} sub={`vs ${PREV.pass}% in ${PREV.year}`} Icon={FaGraduationCap} color="#0D4E25" trend={passTrend} />
                    <StatCard label="Bachelor's Passes" value={`${LATEST.bachelors}%`} sub="University entry" Icon={FaUniversity} color="#1565C0" trend={bachTrend} />
                    <StatCard label="Distinctions" value={LATEST.distinctions} sub="Individual distinctions" Icon={FaStar} color="#F59E0B" trend={distTrend} />
                    <StatCard label="Learners Passed" value={LATEST.passed} sub={`of ${LATEST.enrolled} enrolled`} Icon={FaUsers} color="#0D4E25" />
                  </div>

                  {/* Pass type breakdown */}
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h2 className="font-heading font-bold text-neutral-800 text-lg">Pass Type Breakdown</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">How learners qualified across entry levels</p>
                      </div>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="text-sm border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        {[...RESULTS].reverse().map((r) => (
                          <option key={r.year} value={r.year}>{r.year}</option>
                        ))}
                      </select>
                    </div>
                    <PassTypeChart year={selectedYear} />
                  </div>

                  {/* vs National */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                      <h2 className="font-heading font-bold text-neutral-800 text-base mb-1">vs National Average ({LATEST.year})</h2>
                      <p className="text-xs text-neutral-400 mb-5">Harding Secondary vs the national matric pass rate</p>
                      <div className="space-y-3">
                        {[
                          { label: 'Harding Secondary', value: LATEST.pass, color: '#0D4E25' },
                          { label: 'National Average', value: LATEST.national, color: '#94a3b8' },
                        ].map(({ label, value, color }) => (
                          <div key={label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-semibold text-neutral-700">{label}</span>
                              <span className="font-bold" style={{ color }}>{value}%</span>
                            </div>
                            <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${value}%`, backgroundColor: color }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-primary font-semibold mt-4">
                        Harding Secondary is <strong>{(LATEST.pass - LATEST.national).toFixed(1)} percentage points</strong> above the national average.
                      </p>
                    </div>

                    <div className="bg-primary-dark rounded-2xl p-6 text-white">
                      <div className="flex items-center gap-2 mb-4">
                        <FaTrophy className="text-accent-neon" />
                        <h2 className="font-heading font-bold text-base">Class of 2024 Highlights</h2>
                      </div>
                      <ul className="space-y-3">
                        {[
                          `${LATEST.passed} learners passed out of ${LATEST.enrolled} enrolled`,
                          `${LATEST.bachelors}% earned a Bachelor's Pass (university entry)`,
                          `${LATEST.distinctions} individual subject distinctions awarded`,
                          `Highest pass rate in the school's recorded history`,
                          `${(LATEST.pass - LATEST.national).toFixed(1)}pp above the national average`,
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                            <FaStar className="text-accent-neon text-[10px] mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 pt-4 border-t border-white/10">
                        <Link
                          to="/news"
                          className="text-xs font-semibold text-accent-neon hover:underline flex items-center gap-1"
                        >
                          Read the full 2024 results announcement →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── TRENDS TAB ── */}
            {activeTab === 'trends' && (
              <AnimateOnScroll animation="fade">
                <div className="space-y-8">
                  {/* Main pass rate chart */}
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h2 className="font-heading font-bold text-neutral-800 text-lg">Overall Pass Rate — 2015 to 2024</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">Percentage of learners who passed NSC examinations</p>
                      </div>
                      <button
                        onClick={() => setShowNational((v) => !v)}
                        className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                          showNational ? 'bg-primary/10 text-primary border-primary/20' : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                        }`}
                      >
                        <FaFilter className="text-[10px]" />
                        National comparison
                      </button>
                    </div>
                    <BarChart data={RESULTS} metric="pass" color="#0D4E25" showNational={showNational} />
                  </div>

                  {/* Bachelor's pass chart */}
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <h2 className="font-heading font-bold text-neutral-800 text-lg mb-1">Bachelor's Pass Rate</h2>
                    <p className="text-xs text-neutral-400 mb-5">Percentage earning entry to Bachelor's degree programmes</p>
                    <BarChart data={RESULTS} metric="bachelors" color="#1565C0" showNational={false} maxVal={60} />
                  </div>

                  {/* 10-year summary table */}
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-neutral-100">
                      <h2 className="font-heading font-bold text-neutral-800 text-base">10-Year Results Summary</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-neutral-50 text-left">
                            {['Year', 'Enrolled', 'Passed', 'Pass Rate', "Bachelor's", 'Diploma', 'Distinctions', 'National'].map((h) => (
                              <th key={h} className="px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[...RESULTS].reverse().map((r, i) => {
                            const isLatest = r.year === LATEST.year;
                            return (
                              <tr
                                key={r.year}
                                className={`border-t border-neutral-50 ${isLatest ? 'bg-primary/5' : i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}
                              >
                                <td className="px-4 py-3 font-bold text-neutral-800">{r.year}{isLatest && <span className="ml-1 text-[10px] text-primary font-bold">Latest</span>}</td>
                                <td className="px-4 py-3 text-neutral-600">{r.enrolled}</td>
                                <td className="px-4 py-3 text-neutral-600">{r.passed}</td>
                                <td className="px-4 py-3 font-bold text-primary">{r.pass}%</td>
                                <td className="px-4 py-3 text-neutral-600">{r.bachelors}%</td>
                                <td className="px-4 py-3 text-neutral-600">{r.diploma}%</td>
                                <td className="px-4 py-3 text-amber-700 font-semibold">{r.distinctions}</td>
                                <td className="px-4 py-3 text-neutral-400">{r.national}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── SUBJECTS TAB ── */}
            {activeTab === 'subjects' && (
              <AnimateOnScroll animation="fade">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <div className="mb-6">
                      <h2 className="font-heading font-bold text-neutral-800 text-lg">2024 Subject Pass Rates</h2>
                      <p className="text-xs text-neutral-400 mt-0.5">Percentage of candidates who passed each subject. ★ = distinctions (80%+).</p>
                    </div>
                    <div className="space-y-4">
                      {SUBJECT_RESULTS_2024.sort((a, b) => b.pass - a.pass).map((s, i) => (
                        <SubjectBar key={s.subject} subject={s} index={i} />
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/70" /> 90%+ (Excellent)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-700/70" /> 80–89% (Good)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-600/70" /> 70–79% (Satisfactory)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-800/70" /> Below 70%</span>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-3">
                    <FaInfoCircle className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-neutral-700">
                      Want to practise for your exams? Browse past papers for all these subjects in our{' '}
                      <Link to="/past-papers" className="text-primary font-semibold underline">Past Papers Portal</Link>.
                      Not sure which subjects to take? Use the{' '}
                      <Link to="/student-portal/subjects" className="text-primary font-semibold underline">Subject Explorer</Link>.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── DISTINCTIONS TAB ── */}
            {activeTab === 'distinctions' && (
              <AnimateOnScroll animation="fade">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <h2 className="font-heading font-bold text-neutral-800 text-lg mb-1">Distinctions Per Year</h2>
                    <p className="text-xs text-neutral-400 mb-6">Individual subject distinctions (marks of 80%+) earned each year</p>
                    <DistinctionsTracker />
                  </div>

                  {/* Distinctions by subject 2024 */}
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <h2 className="font-heading font-bold text-neutral-800 text-base mb-4">2024 Distinctions by Subject</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SUBJECT_RESULTS_2024.filter((s) => s.distinctions > 0).sort((a, b) => b.distinctions - a.distinctions).map((s) => (
                        <div
                          key={s.subject}
                          className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center"
                        >
                          <p className="text-2xl font-heading font-bold text-amber-700">{s.distinctions}</p>
                          <p className="text-xs font-semibold text-neutral-700 mt-0.5 leading-tight">{s.subject}</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Pass avg: {s.avg}%</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary-dark rounded-2xl p-6 text-white text-center">
                    <FaTrophy className="text-accent-neon text-3xl mx-auto mb-3" />
                    <h3 className="font-heading font-bold text-xl mb-2">
                      {LATEST.distinctions} Distinctions in 2024
                    </h3>
                    <p className="text-white/70 text-sm max-w-md mx-auto">
                      Our learners earned {LATEST.distinctions} individual subject distinctions in the 2024 NSC examinations — the highest total in our school's history.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatricResults;
