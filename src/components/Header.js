import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import useScrollDirection from '../hooks/useScrollDirection';
import { SCROLL_THRESHOLDS } from '../utils/constants';
import { PORTAL_BUTTONS, TOP_BAR_LINKS } from '../utils/navData';

// Search (and the animation library it uses) loads on first use, not on page load
const loadSearch = () => import('./SearchOverlay');
const SearchOverlay = lazy(loadSearch);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const { isScrolled } = useScrollDirection(SCROLL_THRESHOLDS.HEADER_MINIMIZE);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') setActiveMenu(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white">

        {/* ── TOP UTILITY BAR ──────────────────────────────── */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
          }`}
          style={{ backgroundColor: '#072713' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10">

              {/* Left: Contact */}
              <div className="flex items-center gap-5 text-xs">
                <a
                  href="tel:0394331223"
                  aria-label="Call the school on 039 433 1223"
                  className="flex items-center gap-1.5 whitespace-nowrap text-white/75 hover:text-accent-neon transition-colors duration-200"
                >
                  <FaPhone className="text-accent-neon text-[10px]" />
                  <span className="hidden sm:inline">039 433 1223</span>
                </a>
                <a
                  href="mailto:hardingsec@telkomsa.net"
                  className="hidden md:flex items-center gap-1.5 whitespace-nowrap text-white/75 hover:text-accent-neon transition-colors duration-200"
                >
                  <FaEnvelope className="text-accent-neon text-[10px]" />
                  hardingsec@telkomsa.net
                </a>
              </div>

              {/* Right: Portal buttons + plain links (the links repeat main-nav pages
                  and only fit on one line from xl up) */}
              <div className="flex items-center">
                {PORTAL_BUTTONS.map((btn) => (
                  <Link
                    key={btn.label}
                    to={btn.path}
                    className="px-3 py-1 text-xs font-semibold whitespace-nowrap text-white hover:bg-primary-dark transition-colors duration-200"
                    style={{ backgroundColor: '#147538' }}
                  >
                    {btn.label}
                  </Link>
                ))}
                <span className="w-px h-4 bg-white/15 mx-2 hidden xl:block" />
                {TOP_BAR_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="px-3 py-1 text-xs whitespace-nowrap text-white/75 hover:text-white transition-colors duration-200 hidden xl:block"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV ROW + MEGA MENU ─────────────────────── */}
        <div
          className="relative w-full"
          onMouseLeave={() => setActiveMenu(null)}
          style={{
            boxShadow: isScrolled
              ? '0 2px 20px rgba(0,0,0,0.10)'
              : '0 1px 6px rgba(0,0,0,0.07)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-stretch justify-between transition-all duration-300 ${
                isScrolled ? 'h-16' : 'h-20'
              }`}
            >
              {/* Logo + School Name */}
              <Link
                to="/"
                className="flex items-center gap-4 shrink-0 hover:opacity-90 transition-opacity"
                onClick={() => setActiveMenu(null)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/harding-sec-logo-sm.png`}
                  alt="Harding Secondary School"
                  width="60"
                  height="56"
                  className={`transition-all duration-300 object-contain ${
                    isScrolled ? 'h-10' : 'h-14'
                  }`}
                />
                {/* Hidden from lg to xl: logo, name and the full nav don't fit together there */}
                <div className="hidden md:block lg:hidden xl:block">
                  <p
                    className={`font-heading font-bold text-neutral-700 leading-tight uppercase tracking-wide transition-all duration-300 ${
                      isScrolled ? 'text-sm' : 'text-base'
                    }`}
                  >
                    Harding Secondary School
                  </p>
                  <p className="text-neutral-400 text-xs tracking-wider mt-0.5">
                    Harding, KwaZulu-Natal
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <Navigation
                onMenuOpen={setActiveMenu}
                onMenuClose={() => setActiveMenu(null)}
                activeMenu={activeMenu}
              />

              {/* Right Actions */}
              <div className="hidden lg:flex items-center gap-3 shrink-0 pl-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  onMouseEnter={loadSearch}
                  onFocus={loadSearch}
                  className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl border border-neutral-200 transition-all duration-200 group"
                  aria-label="Search (Ctrl+K)"
                  title="Search (Ctrl+K)"
                >
                  <FaSearch className="text-sm group-hover:text-primary transition-colors" />
                  <span className="hidden 2xl:inline text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors">Search…</span>
                  <kbd className="hidden 2xl:inline text-[10px] px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded font-mono leading-none">⌃K</kbd>
                </button>
                <Link
                  to="/admissions"
                  className="px-5 py-2.5 bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
                  onClick={() => setActiveMenu(null)}
                >
                  Apply Now
                </Link>
              </div>

              {/* Mobile actions */}
              <div className="lg:hidden flex items-center gap-1 my-auto">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                aria-label="Search the site"
              >
                <FaSearch className="text-xl" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
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

        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      {isSearchOpen && (
        <Suspense fallback={null}>
          <SearchOverlay isOpen onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default Header;
