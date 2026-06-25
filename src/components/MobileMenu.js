import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaTimes, FaChevronDown, FaAngleRight, FaUserGraduate } from 'react-icons/fa';
import { NAV_DATA } from '../utils/navData';

const getSublinks = (item) =>
  item.megaMenu ? item.megaMenu.flatMap((col) => col.links) : null;

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggle = (index) =>
    setExpandedMenu(expandedMenu === index ? null : index);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-primary p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/harding-sec-logo-2.png`}
              alt="Harding Secondary School Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h2 className="text-white font-bold text-lg">Menu</h2>
              <p className="text-white/70 text-xs">Harding Secondary</p>
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

        {/* Portal quick-links strip */}
        <div style={{ backgroundColor: '#072713' }} className="px-4 py-3 flex flex-wrap gap-2">
          {['Old Hardingian', 'Parent Portal', 'School Connect'].map((label) => (
            <Link
              key={label}
              to="#"
              onClick={onClose}
              className="text-xs text-white/75 bg-primary px-3 py-1 hover:bg-primary-dark transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Nav items */}
        <nav className="overflow-y-auto h-[calc(100%-180px)] py-3">
          {NAV_DATA.map((item, index) => {
            const sublinks = getSublinks(item);

            return (
              <div key={item.label}>
                {sublinks ? (
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={expandedMenu === index}
                    className="w-full flex items-center justify-between px-6 py-4 text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-medium">{item.label}</span>
                    <FaChevronDown
                      className={`text-sm text-neutral-400 transition-transform duration-200 ${
                        expandedMenu === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-4 font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary border-l-4 border-primary'
                          : 'text-neutral-600 hover:bg-neutral-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}

                {sublinks && (
                  <div
                    className={`bg-neutral-50 overflow-hidden transition-all duration-300 ${
                      expandedMenu === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    {sublinks.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block pl-10 pr-6 py-3 text-sm transition-colors ${
                            isActive
                              ? 'text-primary font-semibold'
                              : 'text-neutral-500 hover:bg-white hover:text-primary'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2">
                          <FaAngleRight className="text-xs text-primary/40" />
                          {sub.label}
                        </div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-neutral-50 border-t border-neutral-200">
          <NavLink
            to="/admissions"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg"
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
