// components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const headerStyles = {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: isScrolled ? 'rgba(25, 70, 126, 0.98)' : '#19467E',
    boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    padding: isScrolled ? '10px 0' : '15px 0'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const logoContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#FFFFFF'
  };

  const logoStyles = {
    width: '50px',
    height: '50px',
    marginRight: '15px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '24px',
    color: '#19467E'
  };

  const schoolNameStyles = {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2
  };

  const mainTitleStyles = {
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
    letterSpacing: '0.5px'
  };

  const subTitleStyles = {
    fontSize: '14px',
    fontWeight: '400',
    margin: 0,
    opacity: 0.9
  };

  const mobileMenuButtonStyles = {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '10px',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  };

  const hamburgerStyles = {
    width: '30px',
    height: '3px',
    backgroundColor: '#FFFFFF',
    margin: '5px 0',
    transition: '0.3s',
    borderRadius: '2px'
  };

  return (
    <>
      <header style={headerStyles}>
        <div style={containerStyles}>
          <Link to="/" style={logoContainerStyles}>
            <div style={logoStyles}>
              HSS
            </div>
            <div style={schoolNameStyles}>
              <h1 style={mainTitleStyles}>Harding Secondary School</h1>
              <p style={subTitleStyles}>Excellence in Education Since 1950</p>
            </div>
          </Link>
          
          <Navigation />
          
          <button
            style={{
              ...mobileMenuButtonStyles,
              display: window.innerWidth <= 768 ? 'block' : 'none'
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div style={{
              ...hamburgerStyles,
              transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(8px)' : 'none'
            }}></div>
            <div style={{
              ...hamburgerStyles,
              opacity: isMobileMenuOpen ? 0 : 1
            }}></div>
            <div style={{
              ...hamburgerStyles,
              transform: isMobileMenuOpen ? 'rotate(45deg) translateY(-8px)' : 'none'
            }}></div>
          </button>
        </div>
      </header>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Spacer to account for fixed header */}
      <div style={{ height: isScrolled ? '80px' : '95px' }}></div>
    </>
  );
};

export default Header;