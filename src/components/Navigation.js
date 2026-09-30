import { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { NAV_DATA } from '../utils/navData';

const panelId = (label) => `mega-menu-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

const MegaMenuPanel = ({ megaMenuData, onClose }) => (
  <div
    className="grid gap-10"
    style={{ gridTemplateColumns: `repeat(${megaMenuData.length}, 1fr) 240px` }}
  >
    {megaMenuData.map((col) => (
      <div key={col.heading}>
        <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-4 pb-2.5 border-b border-neutral-200">
          {col.heading}
        </h4>
        <ul className="space-y-3">
          {col.links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                onClick={onClose}
                className="text-neutral-400 hover:text-primary text-sm transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}

    {/* Brand panel */}
    <div className="border-l border-neutral-200 pl-8 flex flex-col justify-start pt-0.5">
      <img
        src={`${process.env.PUBLIC_URL}/harding-sec-logo-sm.png`}
        alt="Harding Secondary School"
        width="64"
        height="60"
        className="h-12 mb-4 object-contain object-left"
      />
      <p className="font-heading font-bold text-neutral-700 text-sm mb-2 uppercase tracking-wide">
        Harding Secondary School
      </p>
      <p className="text-neutral-400 text-xs leading-relaxed">
        Nurturing excellence and building tomorrow's leaders in the heart of
        KwaZulu-Natal since 1950.
      </p>
    </div>
  </div>
);

/**
 * Items with a mega menu get a separate chevron button (the label stays a link
 * to the section page). The panel renders straight after that button so Tab
 * moves from the button into the menu's links; it still positions against the
 * header's full-width wrapper because nothing in between is positioned.
 */
const NavItem = ({ item, isOpen, onMenuOpen, onMenuClose }) => {
  const buttonRef = useRef(null);
  const underline = (active) =>
    active || isOpen
      ? 'text-primary border-primary'
      : 'text-neutral-500 border-transparent hover:text-primary hover:border-primary/40';

  if (!item.megaMenu) {
    return (
      <div className="flex items-stretch" onMouseEnter={onMenuClose}>
        <NavLink
          to={item.path || '/'}
          end={item.path === '/'}
          onClick={onMenuClose}
          className={({ isActive }) =>
            `flex items-center px-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap border-b-2 ${underline(isActive)}`
          }
        >
          {item.label}
        </NavLink>
      </div>
    );
  }

  const id = panelId(item.label);

  return (
    <div
      className="flex items-stretch"
      onMouseEnter={() => onMenuOpen(item.label)}
      onBlur={(e) => {
        if (isOpen && !e.currentTarget.contains(e.relatedTarget)) onMenuClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && isOpen) {
          e.stopPropagation();
          onMenuClose();
          buttonRef.current?.focus();
        }
      }}
    >
      <NavLink
        to={item.path}
        onClick={onMenuClose}
        className={({ isActive }) =>
          `flex items-center pl-3 pr-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap border-b-2 ${underline(isActive)}`
        }
      >
        {item.label}
      </NavLink>
      <button
        ref={buttonRef}
        type="button"
        // Hovering already opened the menu, so a mouse click (detail > 0) only
        // opens; Enter/Space (detail 0) toggles.
        onClick={(e) => (isOpen && e.detail === 0 ? onMenuClose() : onMenuOpen(item.label))}
        aria-expanded={isOpen}
        aria-controls={id}
        aria-label={`${item.label} menu`}
        className={`flex items-center pl-0.5 pr-2.5 border-b-2 transition-colors duration-200 ${underline(false)}`}
      >
        <FaChevronDown
          className={`text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={id}
          className="absolute top-full left-0 right-0 bg-white border-t-2 border-primary shadow-2xl z-40 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MegaMenuPanel megaMenuData={item.megaMenu} onClose={onMenuClose} />
          </div>
        </div>
      )}
    </div>
  );
};

const Navigation = ({ onMenuOpen, onMenuClose, activeMenu }) => (
  <nav className="hidden lg:flex items-stretch flex-1 justify-end" aria-label="Main navigation">
    {NAV_DATA.map((item) => (
      <NavItem
        key={item.label}
        item={item}
        isOpen={activeMenu === item.label}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
      />
    ))}
  </nav>
);

export default Navigation;
