import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaBook, FaClock, FaPrint, FaChevronRight, FaChevronLeft,
  FaCalendarAlt, FaCheck, FaTimes, FaArrowRight,
  FaLightbulb, FaRedo,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Subject Data ──────────────────────────────────────────────────────────────

const ALL_SUBJECTS = [
  { id: 'english-hl', name: 'English Home Language', stream: 'Languages', color: '#6A1B9A' },
  { id: 'english-fal', name: 'English First Additional Language', stream: 'Languages', color: '#7B1FA2' },
  { id: 'afrikaans-hl', name: 'Afrikaans Home Language', stream: 'Languages', color: '#283593' },
  { id: 'afrikaans-fal', name: 'Afrikaans First Additional Language', stream: 'Languages', color: '#1A237E' },
  { id: 'isizulu-hl', name: 'isiZulu Home Language', stream: 'Languages', color: '#00695C' },
  { id: 'isizulu-fal', name: 'isiZulu First Additional Language', stream: 'Languages', color: '#004D40' },
  { id: 'mathematics', name: 'Mathematics', stream: 'Mathematics', color: '#0D4E25' },
  { id: 'math-literacy', name: 'Mathematical Literacy', stream: 'Mathematics', color: '#2E7D32' },
  { id: 'technical-math', name: 'Technical Mathematics', stream: 'Mathematics', color: '#1B5E20' },
  { id: 'physical-sciences', name: 'Physical Sciences', stream: 'Sciences', color: '#1565C0' },
  { id: 'life-sciences', name: 'Life Sciences', stream: 'Sciences', color: '#2E7D32' },
  { id: 'technical-sciences', name: 'Technical Sciences', stream: 'Sciences', color: '#0D47A1' },
  { id: 'agricultural-sciences', name: 'Agricultural Sciences', stream: 'Sciences', color: '#33691E' },
  { id: 'accounting', name: 'Accounting', stream: 'Commerce', color: '#5D4037' },
  { id: 'business-studies', name: 'Business Studies', stream: 'Commerce', color: '#BF360C' },
  { id: 'economics', name: 'Economics', stream: 'Commerce', color: '#0277BD' },
  { id: 'history', name: 'History', stream: 'Humanities', color: '#B71C1C' },
  { id: 'geography', name: 'Geography', stream: 'Humanities', color: '#00695C' },
  { id: 'life-orientation', name: 'Life Orientation', stream: 'General', color: '#E65100' },
  { id: 'information-technology', name: 'Information Technology', stream: 'Technology', color: '#00838F' },
  { id: 'computer-applications', name: 'Computer Applications Technology', stream: 'Technology', color: '#006064' },
  { id: 'engineering-graphics', name: 'Engineering Graphics & Design', stream: 'Technology', color: '#37474F' },
  { id: 'visual-arts', name: 'Visual Arts', stream: 'Arts', color: '#AD1457' },
  { id: 'music', name: 'Music', stream: 'Arts', color: '#880E4F' },
  { id: 'tourism', name: 'Tourism', stream: 'Commerce', color: '#F57F17' },
  { id: 'consumer-studies', name: 'Consumer Studies', stream: 'General', color: '#E65100' },
  { id: 'hospitality-studies', name: 'Hospitality Studies', stream: 'General', color: '#BF360C' },
];

const STREAMS = ['All', 'Languages', 'Mathematics', 'Sciences', 'Commerce', 'Humanities', 'Technology', 'Arts', 'General'];

const STUDY_TIPS = {
  mathematics: 'Practice past papers daily. Work through problems step-by-step. Do not skip showing working.',
  'physical-sciences': 'Learn definitions first, then formulas, then applications. Draw diagrams for every problem.',
  'life-sciences': 'Use labelled diagrams. Create a list of all scientific terms and their definitions.',
  accounting: 'Always balance your books first. Practice journal entries until they feel automatic.',
  history: 'Use the SEEC method: Source, Evidence, Explanation, Context for essay questions.',
  geography: 'Learn map skills early. Understand causes, consequences, and responses for each topic.',
  'english-hl': 'Read your set works at least three times. Practice timed essays under exam conditions.',
  default: 'Make summary notes in your own words. Test yourself with past paper questions.',
};

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WEEK_OPTIONS = [
  { value: 2, label: '2 Weeks' },
  { value: 3, label: '3 Weeks' },
  { value: 4, label: '4 Weeks' },
  { value: 6, label: '6 Weeks' },
];

const HOURS_OPTIONS = [
  { value: 2, label: '2 hours/day' },
  { value: 3, label: '3 hours/day' },
  { value: 4, label: '4 hours/day' },
  { value: 5, label: '5+ hours/day' },
];

// ─── Timetable Generation ─────────────────────────────────────────────────────

const generateTimetable = (subjects, weeks, studyDays, hoursPerDay, examDate) => {
  if (subjects.length === 0) return [];

  const subjectsPerDay = Math.min(3, Math.ceil(subjects.length / 2));
  const totalDays = weeks * 7;
  const startDate = examDate
    ? new Date(new Date(examDate).getTime() - totalDays * 24 * 60 * 60 * 1000)
    : new Date();

  const timetable = [];
  let subjectIndex = 0;

  for (let week = 0; week < weeks; week++) {
    const weekDays = [];
    const isRevisionWeek = week === weeks - 1;

    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(startDate);
      dayDate.setDate(dayDate.getDate() + week * 7 + d);
      const dayName = DAYS_OF_WEEK[d];

      if (!studyDays.includes(dayName)) {
        weekDays.push({ day: dayName, date: dayDate, rest: true, subjects: [] });
        continue;
      }

      let daySubjects;
      if (isRevisionWeek) {
        // Last week: rotate through ALL subjects for full revision
        const revSlot = (week * 7 + d) % subjects.length;
        daySubjects = [
          subjects[revSlot % subjects.length],
          subjects[(revSlot + 1) % subjects.length],
        ].filter(Boolean);
      } else {
        // Normal week: 2-3 subjects per day in rotation
        daySubjects = [];
        for (let s = 0; s < subjectsPerDay; s++) {
          daySubjects.push(subjects[subjectIndex % subjects.length]);
          subjectIndex++;
        }
      }

      weekDays.push({
        day: dayName,
        date: dayDate,
        rest: false,
        subjects: daySubjects,
        hours: hoursPerDay,
        isRevision: isRevisionWeek,
      });
    }

    timetable.push({
      weekNumber: week + 1,
      isRevisionWeek,
      days: weekDays,
    });
  }

  return timetable;
};

const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
};

// ─── Step Components ───────────────────────────────────────────────────────────

const Step1Subjects = ({ selected, onToggle, streamFilter, onStreamChange }) => (
  <div>
    <h2 className="text-2xl font-heading font-bold text-primary-dark mb-2">Select Your Subjects</h2>
    <p className="text-neutral-500 text-sm mb-6">Choose all the subjects you need to study for your exams.</p>

    {/* Stream filter tabs */}
    <div className="flex flex-wrap gap-2 mb-5">
      {STREAMS.map((s) => (
        <button
          key={s}
          onClick={() => onStreamChange(s)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            streamFilter === s ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          {s}
        </button>
      ))}
    </div>

    {/* Subject grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {ALL_SUBJECTS
        .filter((s) => streamFilter === 'All' || s.stream === streamFilter)
        .map((subject) => {
          const isSelected = selected.some((s) => s.id === subject.id);
          return (
            <button
              key={subject.id}
              onClick={() => onToggle(subject)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral-100 bg-white hover:border-neutral-300'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: isSelected ? subject.color : '#f3f4f6' }}
              >
                <FaBook className={`text-xs ${isSelected ? 'text-white' : 'text-neutral-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold leading-snug ${isSelected ? 'text-primary-dark' : 'text-neutral-700'}`}>
                  {subject.name}
                </p>
                <p className="text-[10px] text-neutral-400">{subject.stream}</p>
              </div>
              {isSelected && <FaCheck className="text-primary text-xs flex-shrink-0" />}
            </button>
          );
        })}
    </div>

    {selected.length > 0 && (
      <div className="mt-5 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <p className="text-xs font-bold text-primary mb-2">{selected.length} subject{selected.length !== 1 ? 's' : ''} selected:</p>
        <div className="flex flex-wrap gap-1.5">
          {selected.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: s.color }}
            >
              {s.name.split(' ').slice(0, 2).join(' ')}
              <button onClick={(e) => { e.stopPropagation(); onToggle(s); }}>
                <FaTimes className="text-[8px]" />
              </button>
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const Step2Options = ({ options, onChange }) => (
  <div>
    <h2 className="text-2xl font-heading font-bold text-primary-dark mb-2">Set Your Study Preferences</h2>
    <p className="text-neutral-500 text-sm mb-6">Customise your timetable to fit your schedule.</p>

    <div className="space-y-6">
      {/* Weeks */}
      <div>
        <p className="text-sm font-semibold text-neutral-700 mb-3">How long until your exams?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WEEK_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange({ ...options, weeks: value })}
              className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                options.weeks === value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Study days */}
      <div>
        <p className="text-sm font-semibold text-neutral-700 mb-3">Which days will you study?</p>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const active = options.studyDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => {
                  const updated = active
                    ? options.studyDays.filter((d) => d !== day)
                    : [...options.studyDays, day];
                  onChange({ ...options, studyDays: updated });
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary/40'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hours */}
      <div>
        <p className="text-sm font-semibold text-neutral-700 mb-3">How many hours can you study per day?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HOURS_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange({ ...options, hoursPerDay: value })}
              className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                options.hoursPerDay === value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Exam date */}
      <div>
        <p className="text-sm font-semibold text-neutral-700 mb-1">First exam date (optional)</p>
        <p className="text-xs text-neutral-400 mb-2">Used to show exact calendar dates on your timetable.</p>
        <input
          type="date"
          value={options.examDate}
          onChange={(e) => onChange({ ...options, examDate: e.target.value })}
          className="px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white w-full sm:w-auto"
        />
      </div>
    </div>
  </div>
);

// ─── Timetable Display ─────────────────────────────────────────────────────────

const TimetableDisplay = ({ timetable, subjects }) => (
  <div id="printable-timetable">
    <style>{`
      @media print {
        body > * { display: none !important; }
        #printable-timetable { display: block !important; }
        #printable-timetable * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `}</style>

    <div className="print:p-0">
      {/* Print header (hidden on screen) */}
      <div className="hidden print:block mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Harding Secondary School — Study Timetable</h1>
        <p className="text-gray-500 text-sm mt-1">Generated for: {subjects.map((s) => s.name).join(', ')}</p>
      </div>

      {timetable.map((week) => (
        <div key={week.weekNumber} className="mb-8 print:mb-6 print:break-inside-avoid">
          <div className={`flex items-center gap-3 mb-3 ${week.isRevisionWeek ? 'text-amber-700' : 'text-primary-dark'}`}>
            <h3 className="font-heading font-bold text-base">
              Week {week.weekNumber}
              {week.isRevisionWeek && <span className="ml-2 text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Final Revision</span>}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 print:grid-cols-7">
            {week.days.map((day) => (
              <div
                key={day.day}
                className={`rounded-xl p-3 border ${
                  day.rest
                    ? 'bg-neutral-50 border-neutral-100 opacity-60'
                    : day.isRevision
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-white border-neutral-100 shadow-sm'
                }`}
              >
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{day.day.slice(0, 3)}</p>
                {day.date && (
                  <p className="text-[10px] text-neutral-300 mb-2">{formatDate(day.date)}</p>
                )}

                {day.rest ? (
                  <p className="text-xs text-neutral-400 italic">Rest day</p>
                ) : (
                  <div className="space-y-1.5">
                    {day.subjects.map((subject, i) => (
                      <div
                        key={i}
                        className="rounded-lg px-2 py-1.5"
                        style={{ backgroundColor: subject.color + '18', borderLeft: `3px solid ${subject.color}` }}
                      >
                        <p className="text-[10px] font-semibold leading-tight" style={{ color: subject.color }}>
                          {subject.name.length > 20 ? subject.name.split(' ').slice(0, 3).join(' ') : subject.name}
                        </p>
                      </div>
                    ))}
                    <p className="text-[9px] text-neutral-400 flex items-center gap-1 mt-1">
                      <FaClock className="text-[8px]" />
                      {day.hours}h study
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Study Tips Panel ──────────────────────────────────────────────────────────

const StudyTipsPanel = ({ subjects }) => (
  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 space-y-4">
    <div className="flex items-center gap-2">
      <FaLightbulb className="text-amber-500" />
      <p className="font-heading font-bold text-neutral-800 text-sm">Study Tips for Your Subjects</p>
    </div>
    {subjects.slice(0, 5).map((subject) => (
      <div key={subject.id} className="flex items-start gap-3">
        <div
          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
          style={{ backgroundColor: subject.color }}
        />
        <div>
          <p className="text-xs font-semibold text-neutral-700">{subject.name}</p>
          <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
            {STUDY_TIPS[subject.id] || STUDY_TIPS.default}
          </p>
        </div>
      </div>
    ))}
    <div className="pt-2 border-t border-neutral-100">
      <Link
        to="/past-papers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
      >
        Get past papers for practice <FaArrowRight className="text-[10px]" />
      </Link>
    </div>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

const StudyTimetable = () => {
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [streamFilter, setStreamFilter] = useState('All');
  const [options, setOptions] = useState({
    weeks: 3,
    studyDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    hoursPerDay: 3,
    examDate: '',
  });

  const toggleSubject = useCallback((subject) => {
    setSelectedSubjects((prev) =>
      prev.some((s) => s.id === subject.id)
        ? prev.filter((s) => s.id !== subject.id)
        : [...prev, subject]
    );
  }, []);

  const timetable = useMemo(() => {
    if (step !== 3 || selectedSubjects.length === 0) return [];
    return generateTimetable(
      selectedSubjects,
      options.weeks,
      options.studyDays,
      options.hoursPerDay,
      options.examDate
    );
  }, [step, selectedSubjects, options]);

  const handleReset = () => {
    setStep(1);
    setSelectedSubjects([]);
    setStreamFilter('All');
    setOptions({
      weeks: 3,
      studyDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hoursPerDay: 3,
      examDate: '',
    });
  };

  return (
    <>
      <SEO
        title="Study Timetable Generator | Harding Secondary School"
        description="Generate a personalised study timetable for your subjects. Select your subjects, set your schedule, and get a printable exam study plan."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-24 md:py-32 text-center overflow-hidden bg-primary-dark print:hidden">
          <img
            src={HERO_IMAGES.classroom}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/87" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaCalendarAlt className="text-xs" />
              Student Portal — Study Tools
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Study Timetable Generator
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Pick your subjects, set your schedule, and get a personalised exam study plan you can print and follow.
            </p>
          </div>
        </section>

        {/* Wizard */}
        <div className="bg-neutral-50 min-h-screen py-10 md:py-16 print:py-4">
          <div className="container-custom">

            {/* Step indicator */}
            {step < 3 && (
              <div className="flex items-center justify-center gap-2 mb-10 print:hidden">
                {[
                  { n: 1, label: 'Choose Subjects' },
                  { n: 2, label: 'Set Schedule' },
                  { n: 3, label: 'Your Timetable' },
                ].map(({ n, label }, i, arr) => (
                  <React.Fragment key={n}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step >= n ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        {step > n ? <FaCheck className="text-xs" /> : n}
                      </div>
                      <span className={`text-sm font-medium hidden sm:block ${step >= n ? 'text-primary-dark' : 'text-neutral-400'}`}>
                        {label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-8 h-0.5 ${step > n ? 'bg-primary' : 'bg-neutral-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Step 1: Subject selection */}
            {step === 1 && (
              <AnimateOnScroll animation="fade">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
                  <Step1Subjects
                    selected={selectedSubjects}
                    onToggle={toggleSubject}
                    streamFilter={streamFilter}
                    onStreamChange={setStreamFilter}
                  />
                  <div className="flex justify-end mt-8 pt-6 border-t border-neutral-100">
                    <button
                      onClick={() => setStep(2)}
                      disabled={selectedSubjects.length === 0}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                    >
                      Next: Set Schedule
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* Step 2: Options */}
            {step === 2 && (
              <AnimateOnScroll animation="fade">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
                  <Step2Options options={options} onChange={setOptions} />
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-5 py-2.5 border border-neutral-200 text-neutral-600 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
                    >
                      <FaChevronLeft className="text-xs" />
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={options.studyDays.length === 0}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-primary-dark transition-colors"
                    >
                      Generate Timetable
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* Step 3: Timetable */}
            {step === 3 && (
              <div>
                {/* Action bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 print:hidden">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary-dark">Your Study Timetable</h2>
                    <p className="text-sm text-neutral-500">
                      {selectedSubjects.length} subjects · {options.weeks} weeks · {options.hoursPerDay}h/day
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 text-neutral-600 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
                    >
                      <FaRedo className="text-xs" />
                      Start Over
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
                    >
                      <FaPrint className="text-xs" />
                      Print Timetable
                    </button>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-8 items-start">
                  {/* Timetable */}
                  <div className="flex-1 min-w-0 bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <TimetableDisplay timetable={timetable} subjects={selectedSubjects} />
                  </div>

                  {/* Tips sidebar */}
                  <div className="w-full xl:w-72 flex-shrink-0 space-y-4 print:hidden">
                    <StudyTipsPanel subjects={selectedSubjects} />

                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
                      <p className="text-xs font-bold text-primary mb-1">Need past papers?</p>
                      <p className="text-xs text-neutral-500 mb-3">
                        Practising with real exam papers is the best way to prepare. Browse all past papers by subject.
                      </p>
                      <Link
                        to="/past-papers"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        Past Papers Portal <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>

                    <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
                      <p className="text-xs font-bold text-neutral-700 mb-2">Subject Legend</p>
                      <div className="space-y-1.5">
                        {selectedSubjects.map((s) => (
                          <div key={s.id} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
                            <p className="text-xs text-neutral-600 truncate">{s.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyTimetable;
