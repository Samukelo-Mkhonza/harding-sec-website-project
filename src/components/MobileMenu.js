import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTimes, FaChevronDown, FaAngleRight, FaUserGraduate,
  FaInfoCircle, FaGraduationCap, FaUserPlus, FaUsers, FaEnvelope, FaHome
} from 'react-icons/fa';

const navIconMap = {
  'info-circle': FaInfoCircle,
  'graduation-cap': FaGraduationCap,
  'user-plus': FaUserPlus,
  'users': FaUsers,
  'envelope': FaEnvelope,
  'home': FaHome,
};

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    {
      label: 'About',
      path: '/about',
      icon: 'info-circle',
      dropdown: [
        { path: '/about', label: 'About us' },
        { path: '/about#mission', label: 'Our mission' },
        { path: '/about#values', label: 'Our values' },
        { path: '/about#history', label: 'History' },
      ]
    },
    {
      label: 'Academics',
      path: '/academics',
      icon: 'graduation-cap',
      dropdown: [
        { path: '/academics', label: 'Academic programs' },
        { path: '/academics#subjects', label: 'Subjects' },
        { path: '/academics#achievements', label: 'Achievements' },
      ]
    },
    { path: '/admissions', label: 'Admissions', icon: 'user-plus' },
    {
      label: 'Student life',
      path: '/student-life',
      icon: 'users',
      dropdown: [
        { path: '/student-life', label: 'Overview' },
        { path: '/student-life#sports', label: 'Sports' },
        { path: '/student-life#clubs', label: 'Clubs & societies' },
        { path: '/student-life#events', label: 'Events' },
        { path: '/gallery', label: 'Gallery' },
      ]
    },
    { path: '/contact', label: 'Contact', icon: 'envelope' }
  ];

  const toggleExpanded = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const getIcon = (iconName) => {
    const IconComponent = navIconMap[iconName];
    return IconComponent ? <IconComponent className="text-primary w-5" /> : null;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-primary p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/harding-sec-logo-2.png"
              alt="Harding Secondary School Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h2 className="text-white font-bold text-lg">Menu</h2>
              <p className="text-white/80 text-xs">Harding Secondary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="overflow-y-auto h-[calc(100%-120px)] py-4">
          {navItems.map((item, index) => (
            <div key={index}>
              {/* Main Menu Item */}
              {item.dropdown ? (
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getIcon(item.icon)}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <FaChevronDown
                    className={`text-sm transition-transform duration-200 ${
                      expandedMenu === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-4 text-neutral-700 hover:bg-neutral-50 transition-colors ${
                      isActive ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary' : ''
                    }`
                  }
                >
                  {getIcon(item.icon)}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              )}

              {/* Dropdown Items */}
              {item.dropdown && (
                <div
                  className={`bg-neutral-50 overflow-hidden transition-all duration-300 ${
                    expandedMenu === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                    <NavLink
                      key={dropdownIndex}
                      to={dropdownItem.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block pl-16 pr-6 py-3 text-neutral-600 hover:bg-white hover:text-primary transition-colors ${
                          isActive ? 'text-primary font-semibold' : ''
                        }`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <FaAngleRight className="text-xs" />
                        <span className="text-sm">{dropdownItem.label}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-neutral-50 border-t border-neutral-200">
          <NavLink
            to="/admissions"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-secondary text-white font-semibold rounded-lg text-center hover:bg-secondary/90 transition-colors shadow-lg"
          >
            <FaUserGraduate />
            Apply Now
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
