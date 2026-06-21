import { FaCalendarAlt, FaGraduationCap, FaFlask, FaTrophy, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { HERO_IMAGES } from '../utils/imageConstants';

const TERMS = [
  {
    term: 'Term 1',
    period: '15 January – 26 March 2025',
    color: 'bg-blue-50 border-blue-200',
    headerColor: 'bg-blue-600',
    events: [
      { date: '15 Jan', label: 'School Opens — Term 1 begins' },
      { date: '20 Jan', label: 'Grade 8 Orientation Day' },
      { date: '3 Feb', label: 'SGB (School Governing Body) Meeting' },
      { date: '14 Feb', label: 'Valentine\'s Day Fundraiser' },
      { date: '17–21 Feb', label: 'Grade 12 Trial Revision Week' },
      { date: '5–7 Mar', label: 'Term 1 Formal Assessments (All Grades)' },
      { date: '21 Mar', label: 'Human Rights Day — School Closed' },
      { date: '26 Mar', label: 'End of Term 1 — School Closes' },
    ],
  },
  {
    term: 'Term 2',
    period: '7 April – 27 June 2025',
    color: 'bg-green-50 border-green-200',
    headerColor: 'bg-primary',
    events: [
      { date: '7 Apr', label: 'School Opens — Term 2 begins' },
      { date: '18 Apr', label: 'Good Friday — School Closed' },
      { date: '21 Apr', label: 'Family Day — School Closed' },
      { date: '27 Apr', label: 'Freedom Day — School Closed' },
      { date: '1 May', label: 'Workers\' Day — School Closed' },
      { date: '19–30 May', label: 'Mid-Year Examinations (Grades 8–11)' },
      { date: '2–13 Jun', label: 'Grade 12 Mid-Year Examinations' },
      { date: '16 Jun', label: 'Youth Day — School Closed' },
      { date: '20 Jun', label: 'Inter-School Sports Day' },
      { date: '27 Jun', label: 'End of Term 2 — School Closes' },
    ],
  },
  {
    term: 'Term 3',
    period: '21 July – 26 September 2025',
    color: 'bg-orange-50 border-orange-200',
    headerColor: 'bg-orange-500',
    events: [
      { date: '21 Jul', label: 'School Opens — Term 3 begins' },
      { date: '25 Jul', label: 'Report Cards Distributed (Terms 1 & 2)' },
      { date: '4–8 Aug', label: 'Science & Technology Week' },
      { date: '9 Aug', label: 'National Women\'s Day — School Closed' },
      { date: '25–29 Aug', label: 'Grade 12 Trial Examinations' },
      { date: '1–5 Sep', label: 'Trial Examinations continue (Gr 12)' },
      { date: '15 Sep', label: 'Annual Cultural Day Celebration' },
      { date: '22–26 Sep', label: 'Term 3 Formal Assessments (Gr 8–11)' },
      { date: '26 Sep', label: 'End of Term 3 — School Closes' },
    ],
  },
  {
    term: 'Term 4',
    period: '13 October – 5 December 2025',
    color: 'bg-purple-50 border-purple-200',
    headerColor: 'bg-purple-600',
    events: [
      { date: '13 Oct', label: 'School Opens — Term 4 begins' },
      { date: '20 Oct', label: 'Grade 12 NSC Examinations Begin' },
      { date: '27 Oct', label: 'Grade 8–11 End-of-Year Exams Begin' },
      { date: '7 Nov', label: 'Grade 8–11 Exams End' },
      { date: '21 Nov', label: 'Grade 12 NSC Examinations End' },
      { date: '24 Nov', label: 'Matric Farewell Ceremony' },
      { date: '28 Nov', label: 'Awards & Prize-Giving Ceremony' },
      { date: '5 Dec', label: 'End of Term 4 — School Year Closes' },
    ],
  },
];

const KEY_DATES = [
  { Icon: FaGraduationCap, color: 'text-primary bg-primary/10', label: 'Grade 12 NSC Exams', date: 'Oct 20 – Nov 21' },
  { Icon: FaFlask, color: 'text-blue-600 bg-blue-100', label: 'Mid-Year Exams (Gr 8–11)', date: 'May 19 – May 30' },
  { Icon: FaTrophy, color: 'text-orange-500 bg-orange-100', label: 'Annual Sports Day', date: '20 June 2025' },
  { Icon: FaUsers, color: 'text-purple-600 bg-purple-100', label: 'Prize-Giving Ceremony', date: '28 November 2025' },
];

const TermCard = ({ term, period, color, headerColor, events }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-2xl overflow-hidden ${color}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-6 py-4 text-left ${headerColor} text-white`}
        aria-expanded={open}
      >
        <div>
          <p className="font-heading font-bold text-lg">{term}</p>
          <p className="text-white/75 text-xs">{period}</p>
        </div>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <ul className="divide-y divide-white/60">
          {events.map(({ date, label }) => (
            <li key={date + label} className="flex items-start gap-4 px-6 py-3">
              <span className="text-xs font-semibold text-neutral-500 w-14 flex-shrink-0 pt-0.5">{date}</span>
              <span className="text-sm text-neutral-700">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SchoolCalendar = () => (
  <>
    <SEO
      title="School Calendar 2025 | Harding Secondary School"
      description="View the Harding Secondary School academic calendar for 2025 including term dates, examinations, public holidays, and school events."
    />
    <div>
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative py-28 md:py-36 text-center overflow-hidden">
        <img
          src={HERO_IMAGES.students}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative z-10 container-custom">
          <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Academic Year 2025</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
            School Calendar
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">
            Term dates, examinations, public holidays, and school events
          </p>
        </div>
      </section>

      {/* Key Dates */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {KEY_DATES.map(({ Icon, color, label, date }) => (
                <div key={label} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-800 leading-snug">{label}</p>
                    <p className="text-xs text-neutral-400">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Term Calendars */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                  <FaCalendarAlt className="inline mr-2" />
                  2025 Academic Year
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">
                  Term Dates & Events
                </h2>
                <p className="text-neutral-500 text-sm max-w-xl mx-auto">
                  Click on each term to expand the full schedule. Dates are subject to change — always check with the school office for the latest updates.
                </p>
              </div>

              <div className="space-y-4">
                {TERMS.map((t) => (
                  <TermCard key={t.term} {...t} />
                ))}
              </div>

              <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                <p className="font-semibold mb-1">Important Note</p>
                <p>This calendar is provided for planning purposes. Exact dates may vary based on Department of Basic Education announcements. Contact the school office on <a href="tel:0394331223" className="underline font-medium">039 433 1223</a> to confirm any dates.</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  </>
);

export default SchoolCalendar;
