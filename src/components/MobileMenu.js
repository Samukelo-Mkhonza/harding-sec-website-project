// components/MobileMenu.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'block' : 'none',
    zIndex: 999,
    transition: 'opacity 0.3s ease',
    opacity: isOpen ? 1 : 0
  };

  const menuStyles = {
    position: 'fixed',
    top: 0,
    right: isOpen ? 0 : '-100%',
    width: '80%',
    maxWidth: '300px',
    height: '100%',
    backgroundColor: '#19467E',
    zIndex: 1000,
    transition: 'right 0.3s ease',
    paddingTop: '80px',
    overflowY: 'auto'
  };

  const navItemStyles = {
    display: 'block',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '20px 30px',
    fontSize: '18px',
    fontWeight: '500',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
  };

  const activeNavItemStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingLeft: '40px'
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '30px',
    cursor: 'pointer',
    padding: '10px'
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/academics', label: 'Academics' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/student-life', label: 'Student Life' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <div style={overlayStyles} onClick={onClose} />
      <div style={menuStyles}>
        <button style={closeButtonStyles} onClick={onClose} aria-label="Close menu">
          ×
        </button>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...navItemStyles,
                ...(isActive ? activeNavItemStyles : {})
              })}
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;