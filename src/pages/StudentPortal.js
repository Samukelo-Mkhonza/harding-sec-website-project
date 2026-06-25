import React from 'react';
import { Link } from 'react-router-dom';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaBook, FaClock, FaDownload, FaPhoneAlt, FaEnvelope,
  FaGraduationCap, FaCalendarAlt, FaBullhorn, FaArrowRight,
  FaCompass,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

const PORTAL_TOOLS = [
  {
    path: '/student-portal/bursaries',
    Icon: FaGraduationCap,
    color: '#0D4E25',
    label: 'Bursary Finder',
    badge: '20+ Bursaries',
    description:
      'Search and filter bursaries available to KZN and Harding-area students. From NSFAS to corporate scholarships — find funding for your studies.',
    cta: 'Find Bursaries',
    highlights: ['NSFAS, Funza Lushaka & ISFAP', 'KZN-specific opportunities', 'Filter by field of study'],
  },
  {
    path: '/student-portal/timetable',
    Icon: FaCalendarAlt,
    color: '#1565C0',
    label: 'Study Timetable Generator',
    badge: 'Print Ready',
    description:
      'Select your subjects, set how many weeks you have, and get a personalised study schedule you can print and stick on your wall.',
    cta: 'Create Timetable',
    highlights: ['All NSC subjects supported', 'Custom study hours & days', 'Printable PDF layout'],
  },
  {
    path: '/student-portal/noticeboard',
    Icon: FaBullhorn,
    color: '#AD1457',
    label: 'Community Noticeboard',
    badge: 'Live Posts',
    description:
      'The school community hub — post announcements, find lost items, arrange transport, sell uniforms, and share events with the Harding family.',
    cta: 'View Noticeboard',
    highlights: ['7 post categories', 'Post as parent, learner or staff', 'Real-time community board'],
  },
  {
    path: '/student-portal/subjects',
    Icon: FaCompass,
    color: '#6A1B9A',
    label: 'Subject Explorer',
    badge: 'Career Guidance',
    description:
      'Click any subject to see every career it leads to, which university degrees it unlocks, expected salary ranges, and personalised study tips.',
    cta: 'Explore Subjects',
    highlights: ['13 NSC subjects mapped', 'Careers + salary ranges', 'Linked to University Tracker'],
  },
];

const OTHER_RESOURCES = [
  { label: 'Past Papers Portal', path: '/past-papers', Icon: FaBook, desc: 'Download exam papers by subject, year, and grade.' },
  { label: 'Books & Textbooks', path: '/books', Icon: FaDownload, desc: 'Free CAPS-aligned textbooks and study guides online.' },
  { label: 'University Applications', path: '/university-applications', Icon: FaGraduationCap, desc: 'Track applications across all 26 SA public universities.' },
  { label: 'School Calendar', path: '/school-calendar', Icon: FaClock, desc: 'Term dates, exam schedules, and important events.' },
];

const StudentPortal = () => (
  <>
    <SEO
      title="Student Portal | Harding Secondary School"
      description="Your digital hub for study tools, bursaries, timetables, and community resources at Harding Secondary School."
    />
    <div>
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
        <img
          src={HERO_IMAGES.classroom}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative z-10 container-custom">
          <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Harding Secondary</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
            Student Portal
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">
            Your digital hub for study tools, bursary funding, career guidance, and community resources.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { label: 'Study Tools', value: '4' },
              { label: 'Bursaries Listed', value: '20+' },
              { label: 'Subjects Mapped', value: '13' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-heading font-bold text-accent-neon">{value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Tools Grid */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Student Tools</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">
                What would you like to do?
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Select a tool below to get started. All tools are free and available to all Harding Secondary learners, parents, and staff.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTAL_TOOLS.map(({ path, Icon, color, label, badge, description, cta, highlights }, i) => (
              <AnimateOnScroll key={path} animation="slide-up" delay={i * 80}>
                <Link
                  to={path}
                  className="group block bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Color top bar */}
                  <div className="h-1.5" style={{ backgroundColor: color }} />

                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: color + '15' }}
                        >
                          <Icon className="text-xl" style={{ color }} />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-neutral-800 text-lg leading-tight">{label}</h3>
                          <span
                            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 text-white"
                            style={{ backgroundColor: color }}
                          >
                            {badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">{description}</p>

                    <ul className="space-y-1.5 mb-5">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-neutral-600">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                      style={{ color }}
                    >
                      {cta}
                      <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Other Resources */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <AnimateOnScroll animation="fade">
            <h2 className="text-2xl font-heading font-bold text-primary-dark mb-2">More Learning Resources</h2>
            <p className="text-neutral-500 text-sm mb-8">Quick access to study materials and school information.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OTHER_RESOURCES.map(({ label, path, Icon, desc }, i) => (
              <AnimateOnScroll key={path} animation="fade" delay={i * 60}>
                <Link
                  to={path}
                  className="group flex gap-4 p-4 bg-neutral-50 hover:bg-primary/5 border border-neutral-100 hover:border-primary/30 rounded-2xl transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm group-hover:text-primary transition-colors">{label}</p>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="py-14 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-primary-dark mb-4">Need Assistance?</h2>
            <p className="text-neutral-500 text-sm mb-8">
              For any queries about the portal or school resources, speak to your class teacher or contact the administration office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0394331223"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
              >
                <FaPhoneAlt />
                039 433 1223
              </a>
              <a
                href="mailto:info@hardingsecondary.edu.za"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              >
                <FaEnvelope />
                info@hardingsecondary.edu.za
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default StudentPortal;
