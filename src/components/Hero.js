import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaArrowRight, FaInfoCircle, FaAward, FaUsers, FaGraduationCap, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import useScrollPosition from '../hooks/useScrollPosition';
import { calculateParallax } from '../utils/animations';

const Hero = ({
  title = "Excellence in Education",
  subtitle = "Nurturing Tomorrow's Leaders in the Heart of KwaZulu-Natal",
  primaryCTA = { text: "Apply Now", link: "/admissions" },
  secondaryCTA = { text: "Learn More", link: "/about" },
  images = [],
  autoplay = true,
  interval = 5000,
  enableParallax = true,
  parallaxSpeed = 0.5
}) => {
  const scrollY = useScrollPosition();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, images.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
    setIsPlaying(false);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-primary">
      {/* Background Images Slideshow with Parallax */}
      {images.length > 0 && (
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: enableParallax ? `translateY(${calculateParallax(scrollY, parallaxSpeed)}px)` : 'none',
                transition: 'transform 0.1s ease-out',
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title with Animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 animate-fade-in text-shadow-lg">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl lg:text-3xl text-white/95 mb-10 md:mb-14 font-light animate-slide-up text-shadow">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <Link
                to={primaryCTA.link}
                className="btn-primary group"
              >
                <span className="flex items-center gap-2">
                  <FaUserGraduate className="text-base" />
                  {primaryCTA.text}
                  <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to={secondaryCTA.link}
                className="btn-outline bg-white/10 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <FaInfoCircle className="text-base" />
                  {secondaryCTA.text}
                </span>
              </Link>
            </div>

            {/* Features/Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 md:mt-24">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300 hover:bg-white/20 hover:border-accent-neon/50">
                <div className="mb-4">
                  <FaAward className="text-4xl md:text-5xl text-accent-neon mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">70+ Years</h3>
                <p className="text-white/90 text-sm">Of Educational Excellence</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300 hover:bg-white/20 hover:border-accent-neon/50">
                <div className="mb-4">
                  <FaUsers className="text-4xl md:text-5xl text-accent-neon mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">1000+</h3>
                <p className="text-white/90 text-sm">Students Enrolled</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300 hover:bg-white/20 hover:border-accent-neon/50">
                <div className="mb-4">
                  <FaGraduationCap className="text-4xl md:text-5xl text-accent-neon mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">95%</h3>
                <p className="text-white/90 text-sm">University Acceptance Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-soft hidden md:block">
        <a
          href="#content"
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <FaChevronDown className="text-2xl" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
