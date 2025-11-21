import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import useScrollDirection from '../hooks/useScrollDirection';
import { SCROLL_THRESHOLDS } from '../utils/constants';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  // Use smart scroll detection hook
  const { scrollY, scrollDirection, isScrolled } = useScrollDirection(SCROLL_THRESHOLDS.HEADER_MINIMIZE);
  
  // Determine if header should be minimized
  const isMinimized = isScrolled && scrollDirection === 'down' && scrollY > SCROLL_THRESHOLDS.HEADER_MINIMIZE;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isMinimized
            ? 'bg-white shadow-xl py-2'
            : isScrolled
            ? 'bg-white shadow-xl py-4'
            : 'bg-white shadow-md py-4'
        }`}
        style={{
          transform: isMinimized ? 'translateY(0)' : 'translateY(0)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        }}
      >
        {/* Top Bar - Quick Links */}
        <div className={`bg-primary-dark text-white text-sm transition-all duration-300 ${
          isScrolled || isMinimized ? 'h-0 overflow-hidden opacity-0' : 'h-auto py-2'
        }`}>
          <div className="container-custom">
            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <a
                  href="tel:+27123456789"
                  className="hover:text-accent-neon transition-colors duration-200 flex items-center gap-2"
                >
                  <FaPhone className="text-sm" />
                  <span className="hidden sm:inline">+27 12 345 6789</span>
                </a>
                <a
                  href="mailto:info@hardingsec.co.za"
                  className="hover:text-accent-neon transition-colors duration-200 flex items-center gap-2"
                >
                  <FaEnvelope className="text-sm" />
                  <span className="hidden sm:inline">info@hardingsec.co.za</span>
                </a>
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-base" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-base" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-base" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-base" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container-custom">
          <div className="flex justify-between items-center">
            {/* Logo and School Name */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-4 hover:opacity-90 transition-opacity duration-200 group flex-shrink min-w-0"
            >
              <img
                src="/harding-sec-logo-2.png"
                alt="Harding Secondary School Logo"
                className={`transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${
                  isMinimized ? 'h-8 sm:h-10' : isScrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-14'
                }`}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <h1 className={`font-heading font-bold transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis text-black ${
                  isMinimized ? 'text-sm sm:text-lg' : isScrolled ? 'text-base sm:text-xl' : 'text-lg sm:text-2xl'
                }`}>
                  Harding Secondary School
                </h1>
                <p className={`text-xs sm:text-sm transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis text-black/90 ${
                  isScrolled || isMinimized ? 'opacity-0 h-0' : 'opacity-100'
                }`}>
                  Excellence in Education Since 1950
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-4">
              <Navigation isScrolled={isScrolled} />
              
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-black/90 hover:text-black hover:bg-black/10"
                aria-label="Search"
                title="Search (Ctrl+K)"
              >
                <FaSearch className="text-sm" />
                <span className="text-sm">Search</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 text-black hover:bg-black/10"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Spacer to account for fixed header */}
      <div className={`transition-all duration-300 ${isMinimized ? 'h-16' : isScrolled ? 'h-20' : 'h-32'}`}></div>
    </>
  );
};

export default Header;
