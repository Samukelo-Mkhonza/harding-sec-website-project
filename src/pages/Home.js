// pages/Home.js
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaRunning, FaChalkboardTeacher } from 'react-icons/fa';
import Hero from '../components/Hero';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';
import { SEO, SEOConfigs } from '../components';
import { HERO_IMAGES, NEWS_IMAGES, PLACEHOLDER_IMAGES } from '../utils/imageConstants';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = useMemo(() => [
    HERO_IMAGES.classroom,
    HERO_IMAGES.graduation
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGES.default;
  };

  return (
    <>
      <SEO {...SEOConfigs.home} />
      <Hero images={heroImages} currentIndex={currentImageIndex} />

      {/* Welcome Section */}
      <section id="content" className="py-16 md:py-24 lg:py-28">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-dark mb-6 md:mb-8 text-center">
              Welcome to Harding Secondary School
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-in" delay={200}>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-neutral-500 text-center max-w-4xl mx-auto mb-12 md:mb-16">
              Harding Secondary School is a distinguished public institution located in the heart of KwaZulu-Natal.
              With over 1,250 learners and 41 dedicated educators, we are committed to fostering academic excellence
              and personal growth in a nurturing environment.
            </p>
          </AnimateOnScroll>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
            {[
              { end: 1252, suffix: '', label: 'Students' },
              { end: 41, suffix: '', label: 'Qualified Teachers' },
              { end: 95, suffix: '%', label: 'Matric Pass Rate' },
              { end: 70, suffix: '+', label: 'Years of Excellence' },
            ].map((stat, index) => (
              <AnimateOnScroll key={stat.label} animation="slide-up" delay={index * 100}>
                <div className="bg-primary-dark text-white p-8 md:p-10 rounded-xl text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold mb-3">
                    <CounterAnimation end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-base md:text-lg font-medium opacity-90">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 lg:py-28 bg-neutral-50">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-black mb-8 md:mb-12 text-center">
              Why Choose Harding Secondary School?
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { Icon: FaBook, title: 'Academic Excellence', desc: 'Comprehensive curriculum covering Sciences, Commerce, Humanities, and Technical subjects with exceptional matric results.' },
              { Icon: FaRunning, title: 'Sports & Activities', desc: 'Wide range of sporting codes and cultural activities to develop well-rounded individuals beyond the classroom.' },
              { Icon: FaChalkboardTeacher, title: 'Dedicated Staff', desc: 'Our 41 qualified educators are passionate about nurturing each student\'s potential and preparing them for success.' },
            ].map((item, index) => (
              <AnimateOnScroll key={item.title} animation="slide-up" delay={index * 150}>
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#0D4E25] hover:-translate-y-2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-5 md:mb-6" style={{ backgroundColor: '#0D4E25' }}>
                    <item.Icon className="text-2xl md:text-3xl text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-black mb-8 md:mb-12 text-center">
              Latest News & Events
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <AnimateOnScroll animation="slide-left">
              <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <img
                  src={NEWS_IMAGES.academicAwards}
                  alt="2025 academic year begins at Harding Secondary School"
                  className="w-full h-48 md:h-56 object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-primary-dark">
                    2025 Academic Year Begins
                  </h3>
                  <p className="text-black leading-relaxed mb-4">
                    We welcome all learners back for another exciting year of learning and growth.
                  </p>
                  <span className="text-accent-neon font-semibold">January 15, 2025</span>
                </div>
              </article>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-right">
              <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <img
                  src={NEWS_IMAGES.matricResults}
                  alt="Outstanding matric results celebration"
                  className="w-full h-48 md:h-56 object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-primary-dark">
                    Outstanding Matric Results
                  </h3>
                  <p className="text-black leading-relaxed mb-4">
                    Celebrating our Class of 2024 with a 95% pass rate and numerous distinctions.
                  </p>
                  <span className="text-accent-neon font-semibold">January 10, 2025</span>
                </div>
              </article>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-28 bg-neutral-100 text-center">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-dark mb-6">
              Begin Your Journey With Us
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">
              Join our community of learners and discover your potential at Harding Secondary School.
            </p>
            <Link
              to="/admissions"
              className="btn-primary inline-block"
            >
              Apply Now
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default Home;
