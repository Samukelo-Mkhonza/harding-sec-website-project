// components/Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navStyles = {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  };

  const linkStyles = {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const activeLinkStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
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
    <nav style={{
      ...navStyles,
      display: window.innerWidth > 768 ? 'flex' : 'none'
    }}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            ...linkStyles,
            ...(isActive ? activeLinkStyles : {})
          })}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            if (!e.target.classList.contains('active')) {
              e.target.style.backgroundColor = 'transparent';
            }
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;