import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import useScrollDirection from '../hooks/useScrollDirection';
import { SCROLL_THRESHOLDS } from '../utils/constants';
import logo from '../images/logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  // Use smart scroll detection hook
  const { scrollY, scrollDirection, isScrolled } = useScrollDirection(SCROLL_THRESHOLDS.HEADER_MINIMIZE);
  
  // Determine if header should be minimized
  const isMinimized = isScrolled && scrollDirection === 'down' && scrollY > SCROLL_THRESHOLDS.HEADER_MINIMIZE;
  
  // Always show full header when scrolling up or at top
  const showFullHeader = !isScrolled || scrollDirection === 'up';

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
            ? 'bg-primary/98 shadow-xl py-2'
            : isScrolled
            ? 'bg-primary/98 shadow-xl py-3'
            : 'bg-primary py-4'
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
                  className="hover:text-secondary transition-colors duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-phone"></i>
                  <span className="hidden sm:inline">+27 12 345 6789</span>
                </a>
                <a
                  href="mailto:info@hardingsec.co.za"
                  className="hover:text-secondary transition-colors duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-envelope"></i>
                  <span className="hidden sm:inline">info@hardingsec.co.za</span>
                </a>
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="hover:text-secondary transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="hover:text-secondary transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="hover:text-secondary transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="hover:text-secondary transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
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
              className="flex items-center gap-4 text-white hover:opacity-90 transition-opacity duration-200 group"
            >
              <img
                src={logo}
                alt="Harding Secondary School Logo"
                className={`transition-all duration-300 group-hover:scale-110 ${
                  isMinimized ? 'h-10' : isScrolled ? 'h-12' : 'h-14'
                }`}
              />
              <div className="flex flex-col">
                <h1 className={`font-heading font-bold text-white transition-all duration-300 ${
                  isMinimized ? 'text-lg' : isScrolled ? 'text-xl' : 'text-2xl'
                }`}>
                  Harding Secondary School
                </h1>
                <p className={`text-white/90 text-sm transition-all duration-300 ${
                  isScrolled || isMinimized ? 'opacity-0 h-0' : 'opacity-100'
                }`}>
                  Excellence in Education Since 1950
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-4">
              <Navigation />
              
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Search"
                title="Search (Ctrl+K)"
              >
                <i className="fas fa-search"></i>
                <span className="text-sm">Search</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'mb-1'
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                ></span>
              </div>
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
