// pages/Academics.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen, FaUniversity, FaGraduationCap } from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';

const Academics = () => {
  const [activeTab, setActiveTab] = useState('sciences');

  const subjects = {
    sciences: {
      title: 'Physical, Mathematical & Life Sciences',
      items: [
        'Mathematics',
        'Mathematical Literacy',
        'Physical Sciences (Physics & Chemistry)',
        'Life Sciences (Biology)',
        'Computer Applications Technology',
        'Information Technology',
        'Agricultural Sciences'
      ]
    },
    commerce: {
      title: 'Business, Commerce & Management',
      items: [
        'Business Studies',
        'Economics',
        'Accounting',
        'Consumer Studies',
        'Tourism'
      ]
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
        'Additional Languages'
      ]
    },
    technical: {
      title: 'Technical & Vocational',
      items: [
        'Engineering Graphics & Design',
        'Civil Technology',
        'Electrical Technology',
        'Mechanical Technology',
        'Hospitality Studies',
        'Agricultural Technology'
      ]
    }
  };

  return (
    <>
      <SEO {...SEOConfigs.academics} />
      <div>
        {/* Breadcrumbs */}
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-16 md:py-20 lg:py-24 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 !text-white text-shadow-strong">
              Academic Excellence
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white text-shadow-strong">
              Comprehensive curriculum designed to unlock every learner's potential
            </p>
          </div>
        </section>

        {/* Curriculum Overview */}
        <section id="subjects" className="py-16 md:py-24 lg:py-28">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-8 md:mb-12">
                Our Curriculum
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slide-up" delay={100}>
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-md mb-10 md:mb-12">
                <h3 className="text-xl md:text-2xl font-semibold mb-5 text-primary-dark">
                  National Senior Certificate (NSC)
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                  Harding Secondary School follows the South African National Curriculum (CAPS) for Grades 8-12.
                  Our comprehensive academic program prepares learners for the National Senior Certificate examination
                  and equips them with the knowledge and skills needed for tertiary education and future careers.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Subject Streams */}
            <AnimateOnScroll animation="fade-in">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
                Subject Streams
              </h3>
            </AnimateOnScroll>
            <div className="flex flex-wrap gap-3 mb-10 md:mb-12 justify-center">
              {Object.keys(subjects).map((key) => (
                <button
                  key={key}
                  className={`px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-primary-dark text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            <div>
              <h4 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-black">
                {subjects[activeTab].title}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subjects[activeTab].items.map((subject, index) => (
                  <AnimateOnScroll key={subject} animation="slide-up" delay={index * 50}>
                    <div
                      className="bg-neutral-50 p-6 rounded-lg border-l-4 border-primary-dark transition-all duration-300 hover:translate-x-2 hover:shadow-md"
                    >
                      <h5 className="text-base md:text-lg font-medium text-primary-dark">{subject}</h5>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Academic Features */}
        <section className="py-16 md:py-24 lg:py-28 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-8 md:mb-12 text-center">
                Academic Support & Resources
              </h2>
            </AnimateOnScroll>

            {/* Past Papers Portal Highlight */}
            <AnimateOnScroll animation="zoom-in">
              <div className="bg-primary-dark text-white p-8 md:p-10 lg:p-12 rounded-xl mb-10 md:mb-12 text-center">
                <div className="mb-6">
                  <FaBook className="text-4xl md:text-5xl mx-auto" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5">Past Papers Portal</h3>
                <p className="text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
                  Access our comprehensive collection of past examination papers across all subjects and grades.
                  Perfect for exam preparation and practice.
                </p>
                <Link
                  to="/past-papers"
                  className="btn-secondary inline-block"
                >
                  Access Past Papers
                </Link>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { Icon: FaBookOpen, title: 'Extra Classes', desc: 'Additional support in Mathematics, Sciences, and Languages for Grade 10-12 learners' },
                { Icon: FaUniversity, title: 'Modern Facilities', desc: 'Well-equipped science laboratories, computer labs, and a comprehensive library' },
                { Icon: FaGraduationCap, title: 'Career Guidance', desc: 'Comprehensive career counseling and university application support' },
              ].map((item, index) => (
                <AnimateOnScroll key={item.title} animation="slide-up" delay={index * 100}>
                  <div className="bg-primary-dark text-white p-8 md:p-10 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="mb-5 md:mb-6">
                      <item.Icon className="text-4xl md:text-5xl mx-auto" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">{item.title}</h3>
                    <p className="leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Achievements */}
        <section id="achievements" className="py-16 md:py-24 lg:py-28">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-8 md:mb-12 text-center">
                Academic Achievements
              </h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { end: 95, suffix: '%', label: 'Matric Pass Rate' },
                { end: 67, suffix: '%', label: "Bachelor's Pass" },
                { end: 150, suffix: '+', label: 'Distinctions Annually' },
                { end: 12, suffix: '', label: 'Top Achievers Awards' },
              ].map((stat, index) => (
                <AnimateOnScroll key={stat.label} animation="slide-up" delay={index * 100}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary-dark mb-3">
                      <CounterAnimation end={stat.end} suffix={stat.suffix} />
                    </div>
                    <p className="text-base md:text-lg text-neutral-500">{stat.label}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Grade Structure */}
        <section className="py-16 md:py-24 lg:py-28 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-8 md:mb-12 text-center">
                Grade Structure
              </h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 text-primary-dark">
                    Junior Phase (Grades 8-9)
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                    Foundation years focusing on core subjects with exposure to various learning areas
                    to help learners make informed subject choices.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slide-right">
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 text-primary-dark">
                    Senior Phase (Grades 10-12)
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                    Specialized subject selection preparing learners for the National Senior Certificate
                    and post-school opportunities.
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
