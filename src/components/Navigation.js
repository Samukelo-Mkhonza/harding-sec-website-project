import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const Navigation = ({ isScrolled = false }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { path: '/', label: 'Home' },
    {
      label: 'About',
      path: '/about',
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
      dropdown: [
        { path: '/academics', label: 'Academic programs' },
        { path: '/academics#subjects', label: 'Subjects' },
        { path: '/academics#achievements', label: 'Achievements' },
      ]
    },
    { path: '/admissions', label: 'Admissions' },
    {
      label: 'Student life',
      path: '/student-life',
      dropdown: [
        { path: '/student-life', label: 'Overview' },
        { path: '/student-life#sports', label: 'Sports' },
        { path: '/student-life#clubs', label: 'Clubs & societies' },
        { path: '/student-life#events', label: 'Events' },
        { path: '/gallery', label: 'Gallery' },
      ]
    },
    { path: '/contact', label: 'Contact' }
  ];

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.contains(document.activeElement)) {
      setOpenDropdown(null);
    }
  };

  const handleContainerBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenDropdown(null);
    }
  };

  return (
    <nav className="hidden lg:flex items-center justify-center flex-1">
      <div className="flex items-center gap-2">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onBlur={handleContainerBlur}
          >
            {/* Main Nav Link */}
            <div className="flex items-center">
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-200 ${
                    isActive ? 'text-primary bg-primary/5' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
              {item.dropdown && (
                <button
                  aria-expanded={openDropdown === index}
                  aria-haspopup="true"
                  aria-label={`Open ${item.label} submenu`}
                  className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-200"
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <FaChevronDown className={`text-xs transition-transform duration-200 ${
                    openDropdown === index ? 'rotate-180' : ''
                  }`} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Dropdown Menu */}
            {item.dropdown && (
              <div
                aria-hidden={openDropdown !== index}
                className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-100 overflow-hidden transition-all duration-200 origin-top ${
                  openDropdown === index
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onKeyDown={(e) => { if (e.key === 'Escape') setOpenDropdown(null); }}
              >
                <div className="py-2">
                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                    <NavLink
                      key={dropdownIndex}
                      to={dropdownItem.path}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors duration-150 ${
                          isActive ? 'text-primary bg-primary/5 font-medium' : ''
                        }`
                      }
                    >
                      {dropdownItem.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
