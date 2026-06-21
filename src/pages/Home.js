import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserFriends, FaUserGraduate, FaCalendarAlt, FaBookOpen,
  FaArrowRight, FaClock, FaQuoteLeft
} from 'react-icons/fa';
import Hero from '../components/Hero';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';
import { SEO, SEOConfigs } from '../components';
import {
  HERO_IMAGES,
  NEWS_IMAGES,
  ACTIVITY_IMAGES,
  PLACEHOLDER_IMAGES
} from '../utils/imageConstants';

const TESTIMONIALS = [
  {
    quote: "Harding Secondary gave my child not just an education, but a foundation for life. The teachers are genuinely invested in every learner's success.",
    author: "Mrs. Dlamini",
    role: "Parent",
  },
  {
    quote: "The opportunities here — in sport, in academics, in culture — shaped who I am today. I'm proud to call Harding my school.",
    author: "Sipho Nkosi",
    role: "Alumni, Class of 2022",
  },
];

const PILLARS = [
  {
    title: 'Academics',
    desc: 'Comprehensive curriculum with exceptional matric results.',
    image: HERO_IMAGES.classroom,
    link: '/academics',
    cta: 'Explore Academics',
  },
  {
    title: 'Sports',
    desc: 'Compete and grow across a wide range of sporting codes.',
    image: ACTIVITY_IMAGES.sports,
    link: '/student-life',
    cta: 'View Sports',
  },
  {
    title: 'Cultural Life',
    desc: 'Drama, music, art and debate that enrich every learner.',
    image: ACTIVITY_IMAGES.cultural,
    link: '/student-life',
    cta: 'Discover Culture',
  },
  {
    title: 'Community',
    desc: 'A school rooted in values of service and togetherness.',
    image: NEWS_IMAGES.community,
    link: '/about',
    cta: 'Our Story',
  },
];

const NEWS_ITEMS = [
  {
    image: NEWS_IMAGES.academicAwards,
    category: 'Academics',
    title: '2025 Academic Year Begins',
    excerpt:
      'We welcome all learners back for another exciting year of learning and growth at Harding Secondary School.',
    date: 'January 15, 2025',
  },
  {
    image: NEWS_IMAGES.matricResults,
    category: 'Results',
    title: 'Outstanding Matric Results',
    excerpt:
      'Celebrating our Class of 2024 with a 95% pass rate and numerous distinctions across all faculties.',
    date: 'January 10, 2025',
  },
  {
    image: NEWS_IMAGES.sportsDay,
    category: 'Sports',
    title: 'Athletics Champions Again',
    excerpt:
      'Our athletics team claimed first place in the regional championship for the third consecutive year.',
    date: 'December 5, 2024',
  },
];

const PORTALS = [
  { label: 'Parent Portal', Icon: FaUserFriends, link: '#', desc: "Track your child's progress" },
  { label: 'Student Portal', Icon: FaUserGraduate, link: '#', desc: 'Access resources & results' },
  { label: 'Past Papers', Icon: FaBookOpen, link: '/past-papers', desc: 'Practise with past exams' },
  { label: 'School Calendar', Icon: FaCalendarAlt, link: '#', desc: 'Stay up to date' },
];

const QUICK_LINKS = [
  { label: 'Apply Now', link: '/admissions' },
  { label: 'Admissions Info', link: '/admissions' },
  { label: 'School Calendar', link: '#' },
  { label: 'Past Papers', link: '/past-papers' },
  { label: 'Contact Us', link: '/contact' },
];

const STATS = [
  { end: 1252, suffix: '', label: 'Students Enrolled' },
  { end: 41, suffix: '', label: 'Qualified Teachers' },
  { end: 95, suffix: '%', label: 'Matric Pass Rate' },
  { end: 70, suffix: '+', label: 'Years of Excellence' },
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const heroImages = useMemo(
    () => [HERO_IMAGES.classroom, HERO_IMAGES.graduation, HERO_IMAGES.campus],
    []
  );

  useEffect(() => {
    const id = setInterval(
      () => setCurrentImageIndex((i) => (i + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(id);
  }, [heroImages.length]);

  useEffect(() => {
    const id = setInterval(
      () => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGES.default;
  };

  return (
    <>
      <SEO {...SEOConfigs.home} />
      <Hero images={heroImages} currentIndex={currentImageIndex} />

      {/* Quick Links Bar */}
      <div className="bg-primary-dark text-white">
        <div className="container-custom">
          <div className="flex flex-wrap">
            {QUICK_LINKS.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="flex-1 min-w-[100px] text-center py-4 px-3 text-sm font-semibold border-r border-white/10 last:border-r-0 hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section id="content" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateOnScroll animation="slide-right">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
                  Welcome to Harding Secondary School
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-dark mb-6 leading-tight">
                  Nurturing Excellence in the Heart of KwaZulu-Natal
                </h2>
                <p className="text-neutral-500 leading-relaxed mb-5 text-base md:text-lg">
                  Harding Secondary School is a distinguished public institution with over 70 years
                  of educational excellence. We are committed to fostering academic achievement,
                  personal growth, and community values in a nurturing environment.
                </p>
                <p className="text-neutral-500 leading-relaxed mb-8 text-base">
                  With 1,250+ learners and 41 dedicated educators, our school offers a
                  comprehensive programme across Sciences, Commerce, Humanities, and Technical
                  subjects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/about" className="btn-primary text-center">
                    About Our School
                  </Link>
                  <Link to="/admissions" className="btn-secondary text-center">
                    Apply Now
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-left">
              <div className="relative">
                <img
                  src={HERO_IMAGES.campus}
                  alt="Harding Secondary School campus"
                  className="rounded-2xl w-full h-96 md:h-[420px] object-cover shadow-2xl"
                  onError={handleImageError}
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-2xl p-5 shadow-xl">
                  <div className="text-4xl font-bold">70+</div>
                  <div className="text-sm text-white/90 mt-1">Years of Excellence</div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mt-20 md:mt-28 border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            {STATS.map((stat, index) => (
              <AnimateOnScroll key={stat.label} animation="slide-up" delay={index * 100}>
                <div className="text-center p-8 border-r border-neutral-200 last:border-r-0 bg-white hover:bg-neutral-50 transition-colors duration-200">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    <CounterAnimation end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-neutral-500 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Harding Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-in">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                Find Your Place
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-dark">
                Discover Harding Secondary
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((pillar, index) => (
              <AnimateOnScroll key={pillar.title} animation="slide-up" delay={index * 100}>
                <Link
                  to={pillar.link}
                  className="group relative block h-80 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 group-hover:from-primary-dark/90 group-hover:via-primary-dark/40" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{pillar.title}</h3>
                    <p className="text-white/80 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                      {pillar.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-accent-neon text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {pillar.cta} <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-4">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                  Stay Informed
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                  Latest News & Events
                </h2>
              </div>
              <Link
                to="/contact"
                className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200 shrink-0 whitespace-nowrap"
              >
                All News <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured article */}
            <AnimateOnScroll animation="slide-right">
              <div className="lg:col-span-2">
                <article className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden h-64 md:h-80">
                    <img
                      src={NEWS_ITEMS[0].image}
                      alt={NEWS_ITEMS[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {NEWS_ITEMS[0].category}
                    </span>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-3">
                      <FaClock className="text-xs" />
                      {NEWS_ITEMS[0].date}
                    </div>
                    <h3 className="text-2xl font-bold text-primary-dark mb-3 group-hover:text-primary transition-colors duration-200">
                      {NEWS_ITEMS[0].title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed flex-1 mb-4">
                      {NEWS_ITEMS[0].excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                      Read more <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </article>
              </div>
            </AnimateOnScroll>

            {/* Two smaller articles */}
            <AnimateOnScroll animation="slide-left">
              <div className="flex flex-col gap-6">
                {NEWS_ITEMS.slice(1).map((item) => (
                  <article
                    key={item.title}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex"
                  >
                    <div className="relative overflow-hidden w-32 md:w-36 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={handleImageError}
                      />
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider leading-tight">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-2">
                        <FaClock className="text-xs" />
                        {item.date}
                      </div>
                      <h3 className="text-base font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-3 flex-1">
                        {item.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-xs mt-auto">
                        Read more <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FaQuoteLeft className="text-5xl text-white/20 mx-auto mb-8" />
            <div className="relative" style={{ minHeight: '180px' }}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col items-center justify-start transition-opacity duration-700"
                  style={{ opacity: i === testimonialIndex ? 1 : 0, pointerEvents: i === testimonialIndex ? 'auto' : 'none' }}
                >
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-bold text-white text-lg">{t.author}</p>
                    <p className="text-accent-neon text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 mt-10">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === testimonialIndex ? '2rem' : '0.75rem',
                    height: '0.75rem',
                    backgroundColor: i === testimonialIndex ? '#22C55E' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-in">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                Quick Access
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                School Portals
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTALS.map((portal, index) => (
              <AnimateOnScroll key={portal.label} animation="slide-up" delay={index * 100}>
                <Link
                  to={portal.link}
                  className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-b-4 border-transparent hover:border-primary"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-primary/10 group-hover:bg-primary transition-colors duration-300">
                    <portal.Icon className="text-2xl text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-dark mb-2">{portal.label}</h3>
                  <p className="text-neutral-500 text-sm">{portal.desc}</p>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <img
          src={HERO_IMAGES.graduation}
          alt="Graduation ceremony at Harding Secondary School"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative z-10 container-custom text-center text-white">
          <AnimateOnScroll animation="fade-in">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">
              Begin Your Journey
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Join the Harding Family
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Discover your potential and build lifelong friendships in a school that believes in
              every learner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="bg-white text-primary-dark font-bold px-10 py-4 rounded-lg hover:bg-accent-neon hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white font-bold px-10 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Book a Tour
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default Home;
