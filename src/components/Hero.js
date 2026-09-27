import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaArrowRight, FaInfoCircle, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import useScrollPosition from '../hooks/useScrollPosition';
import { calculateParallax } from '../utils/animations';

const Hero = ({
  title = "Excellence in Education",
  subtitle = "Nurturing Tomorrow's Leaders in the Heart of KwaZulu-Natal",
  primaryCTA = { text: "Apply Now", link: "/admissions" },
  secondaryCTA = { text: "About our school", link: "/about" },
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
    <section className="relative h-[560px] md:h-[640px] lg:h-[720px] overflow-hidden bg-primary">
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
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center py-8 md:py-0">
        <div className="container-custom px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title with Animation */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold !text-white mb-4 md:mb-8 animate-fade-in text-shadow-strong leading-tight" style={{ animationFillMode: 'both' }}>
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl !text-white mb-8 md:mb-10 lg:mb-14 font-light animate-slide-up text-shadow-strong px-4 md:px-0" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-slide-up " style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <Link
                to={primaryCTA.link}
                className="btn-primary group w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaUserGraduate className="text-base" />
                  {primaryCTA.text}
                  <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to={secondaryCTA.link}
                className="px-8 py-4 border-2 border-white/80 text-white font-semibold bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-dark transition-colors duration-300 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaInfoCircle className="text-base" />
                  {secondaryCTA.text}
                </span>
              </Link>
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
        <button
          onClick={() => {
            const el = document.getElementById('content');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-white/80 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
          aria-label="Scroll down"
        >
          <FaChevronDown className="text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
