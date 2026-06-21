import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen, FaUniversity, FaGraduationCap, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';
import { HERO_IMAGES } from '../utils/imageConstants';

const TABS = [
  { key: 'sciences', label: 'Sciences' },
  { key: 'commerce', label: 'Commerce' },
  { key: 'humanities', label: 'Humanities' },
  { key: 'technical', label: 'Technical' },
];

const SUBJECTS = {
  sciences: {
    title: 'Physical, Mathematical & Life Sciences',
    items: [
      'Mathematics',
      'Mathematical Literacy',
      'Physical Sciences (Physics & Chemistry)',
      'Life Sciences (Biology)',
      'Computer Applications Technology',
      'Information Technology',
      'Agricultural Sciences',
    ],
  },
  commerce: {
    title: 'Business, Commerce & Management',
    items: ['Business Studies', 'Economics', 'Accounting', 'Consumer Studies', 'Tourism'],
  },
  humanities: {
    title: 'Humanities & Languages',
    items: [
      'History',
      'Geography',
      'Religion Studies',
      'Music',
      'Visual Arts',
      'Dramatic Arts',
      'Additional Languages',
    ],
  },
  technical: {
    title: 'Technical & Vocational',
    items: [
      'Engineering Graphics & Design',
      'Civil Technology',
      'Electrical Technology',
      'Mechanical Technology',
      'Hospitality Studies',
      'Agricultural Technology',
    ],
  },
};

const ACHIEVEMENTS = [
  { end: 95, suffix: '%', label: 'Matric Pass Rate' },
  { end: 67, suffix: '%', label: "Bachelor's Pass" },
  { end: 150, suffix: '+', label: 'Distinctions Annually' },
  { end: 12, suffix: '', label: 'Top Achiever Awards' },
];

const SUPPORT = [
  {
    Icon: FaBookOpen,
    title: 'Extra Classes',
    desc: 'Additional support in Mathematics, Sciences, and Languages for Grade 10–12 learners.',
  },
  {
    Icon: FaUniversity,
    title: 'Modern Facilities',
    desc: 'Well-equipped science laboratories, computer labs, and a comprehensive library.',
  },
  {
    Icon: FaGraduationCap,
    title: 'Career Guidance',
    desc: 'Comprehensive career counseling and university application support for matric learners.',
  },
];

const Academics = () => {
  const [activeTab, setActiveTab] = useState('sciences');

  return (
    <>
      <SEO {...SEOConfigs.academics} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Page Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden">
          <img
            src={HERO_IMAGES.classroom}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">CAPS Curriculum</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              Academic Excellence
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white/90">
              Comprehensive curriculum designed to unlock every learner's potential
            </p>
          </div>
        </section>

        {/* Curriculum Overview */}
        <section id="subjects" className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="mb-10">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What We Teach</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-6">Our Curriculum</h2>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-up" delay={100}>
              <div className="bg-gradient-to-r from-primary/5 to-primary-dark/5 border border-primary/20 p-8 rounded-2xl mb-12">
                <h3 className="text-xl font-bold text-primary-dark mb-3">National Senior Certificate (NSC)</h3>
                <p className="text-neutral-500 leading-relaxed">
                  Harding Secondary School follows the South African National Curriculum (CAPS) for Grades 8–12.
                  Our comprehensive academic program prepares learners for the National Senior Certificate examination
                  and equips them with the knowledge and skills needed for tertiary education and future careers.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Subject Stream Tabs */}
            <AnimateOnScroll animation="fade-in">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-6">Subject Streams</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-primary-dark text-white shadow-lg shadow-primary-dark/20'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in">
              <h4 className="text-xl font-bold text-primary-dark mb-6">{SUBJECTS[activeTab].title}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SUBJECTS[activeTab].items.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center gap-3 bg-neutral-50 hover:bg-primary/5 p-4 rounded-xl border border-neutral-200 hover:border-primary/30 transition-all duration-200"
                  >
                    <FaCheckCircle className="text-primary text-lg flex-shrink-0" />
                    <span className="text-neutral-700 font-medium text-sm">{subject}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Academic Support */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Resources</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Academic Support</h2>
              </div>
            </AnimateOnScroll>

            {/* Past Papers Portal Feature Banner */}
            <AnimateOnScroll animation="zoom-in">
              <div className="relative overflow-hidden rounded-2xl mb-10">
                <img
                  src={HERO_IMAGES.library}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-primary-dark/88" />
                <div className="relative z-10 p-10 md:p-16 text-center text-white">
                  <FaBook className="text-5xl mx-auto mb-5 text-accent-neon" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Past Papers Portal</h3>
                  <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                    Access our comprehensive collection of past examination papers across all subjects and grades.
                    Perfect for exam preparation and practice.
                  </p>
                  <Link
                    to="/past-papers"
                    className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-lg hover:bg-accent-neon hover:text-white transition-all duration-300 shadow-xl"
                  >
                    Access Past Papers <FaArrowRight />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUPPORT.map((item, index) => (
                <AnimateOnScroll key={item.title} animation="slide-up" delay={index * 100}>
                  <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center mb-5 transition-colors duration-300">
                      <item.Icon className="text-2xl text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark mb-3">{item.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Achievements */}
        <section id="achievements" className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Track Record</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Academic Achievements</h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {ACHIEVEMENTS.map((stat, index) => (
                <AnimateOnScroll key={stat.label} animation="slide-up" delay={index * 100}>
                  <div className="text-center p-8 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                      <CounterAnimation end={stat.end} suffix={stat.suffix} />
                    </div>
                    <p className="text-neutral-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Grade Structure */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Structure</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Grade Structure</h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary">
                  <span className="inline-block bg-primary text-white font-bold px-4 py-1.5 rounded-full text-sm mb-5">
                    Grades 8 – 9
                  </span>
                  <h3 className="text-xl font-bold text-primary-dark mb-4">Junior Phase</h3>
                  <p className="text-neutral-500 leading-relaxed">
                    Foundation years focusing on core subjects with exposure to various learning areas
                    to help learners make informed subject choices for senior phase.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slide-right">
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-dark">
                  <span className="inline-block bg-primary-dark text-white font-bold px-4 py-1.5 rounded-full text-sm mb-5">
                    Grades 10 – 12
                  </span>
                  <h3 className="text-xl font-bold text-primary-dark mb-4">Senior Phase</h3>
                  <p className="text-neutral-500 leading-relaxed">
                    Specialized subject selection preparing learners for the National Senior Certificate
                    and post-school opportunities, including university and vocational training.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Academics;
