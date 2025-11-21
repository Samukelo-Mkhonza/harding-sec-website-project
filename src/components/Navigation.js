import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaAngleRight, FaUserGraduate } from 'react-icons/fa';

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { path: '/', label: 'Home' },
    {
      label: 'About',
      path: '/about',
      dropdown: [
        { path: '/about', label: 'About Us' },
        { path: '/about#mission', label: 'Our Mission' },
        { path: '/about#values', label: 'Our Values' },
        { path: '/about#history', label: 'History' },
      ]
    },
    {
      label: 'Academics',
      path: '/academics',
      dropdown: [
        { path: '/academics', label: 'Academic Programs' },
        { path: '/academics#subjects', label: 'Subjects' },
        { path: '/academics#achievements', label: 'Achievements' },
      ]
    },
    { path: '/admissions', label: 'Admissions' },
    {
      label: 'Student Life',
      path: '/student-life',
      dropdown: [
        { path: '/student-life', label: 'Student Life' },
        { path: '/student-life#sports', label: 'Sports' },
        { path: '/student-life#clubs', label: 'Clubs & Societies' },
        { path: '/student-life#events', label: 'Events' },
      ]
    },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="relative group"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Nav Link */}
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-1 px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${
                isActive ? 'bg-white/20' : ''
              }`
            }
          >
            {item.label}
            {item.dropdown && (
              <FaChevronDown className={`text-xs ml-1 transition-transform duration-200 ${
                openDropdown === index ? 'rotate-180' : ''
              }`} />
            )}
          </NavLink>

          {/* Dropdown Menu */}
          {item.dropdown && (
            <div
              className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
                openDropdown === index
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="py-2">
                {item.dropdown.map((dropdownItem, dropdownIndex) => (
                  <NavLink
                    key={dropdownIndex}
                    to={dropdownItem.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-neutral-700 hover:bg-primary/10 hover:text-primary transition-colors duration-200 ${
                        isActive ? 'bg-primary/5 text-primary font-semibold' : ''
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <FaAngleRight className="text-xs" />
                      <span>{dropdownItem.label}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Quick Action Button */}
      <div className="ml-4">
        <NavLink
          to="/admissions"
          className="px-6 py-2.5 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <FaUserGraduate className="text-base" />
          <span>Apply Now</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
