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
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${
          isScrolled ? 'shadow-lg' : 'shadow-md'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* Top Utility Bar - Contact & Social */}
        <div className={`bg-primary-dark text-white text-sm transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto py-2'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <a
                  href="tel:+27123456789"
                  className="hover:text-accent-neon transition-colors duration-200 flex items-center gap-2"
                >
                  <FaPhone className="text-xs" />
                  <span className="hidden sm:inline">+27 12 345 6789</span>
                </a>
                <a
                  href="mailto:info@hardingsec.co.za"
                  className="hover:text-accent-neon transition-colors duration-200 flex items-center gap-2"
                >
                  <FaEnvelope className="text-xs" />
                  <span className="hidden sm:inline">info@hardingsec.co.za</span>
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-sm" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-sm" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent-neon transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className={`transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {/* Logo Section - 20-25% width */}
              <Link
                to="/"
                className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200 group"
                style={{ minWidth: '200px', maxWidth: '25%' }}
              >
                <img
                  src="/harding-sec-logo-2.png"
                  alt="Harding Secondary School"
                  className={`transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? 'h-10' : 'h-12'
                  }`}
                />
                <div className="hidden sm:block">
                  <h1 className={`font-heading font-bold text-neutral-900 leading-tight transition-all duration-300 ${
                    isScrolled ? 'text-lg' : 'text-xl'
                  }`}>
                    Harding Secondary School
                  </h1>
                </div>
              </Link>

              {/* Desktop Navigation - Centered */}
              <Navigation isScrolled={isScrolled} />

              {/* Action Items - Right aligned */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Search Icon */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200"
                  aria-label="Search"
                  title="Search (Ctrl+K)"
                >
                  <FaSearch className="text-lg" />
                </button>

                {/* Apply Now CTA */}
                <Link
                  to="/admissions"
                  className="px-6 py-2.5 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Apply Now
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
