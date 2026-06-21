import { NavLink } from 'react-router-dom';
import { NAV_DATA } from '../utils/navData';

const Navigation = ({ onMenuOpen, onMenuClose, activeMenu }) => (
  <nav className="hidden lg:flex items-stretch flex-1 justify-end" aria-label="Main navigation">
    {NAV_DATA.map((item) => (
      <div
        key={item.label}
        className="flex items-stretch"
        onMouseEnter={() => (item.megaMenu ? onMenuOpen(item.label) : onMenuClose())}
      >
        <NavLink
          to={item.path || '/'}
          end={item.path === '/'}
          onClick={onMenuClose}
          className={({ isActive }) =>
            `flex items-center px-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap border-b-2 ${
              isActive || activeMenu === item.label
                ? 'text-primary border-primary'
                : 'text-neutral-500 border-transparent hover:text-primary hover:border-primary/40'
            }`
          }
        >
          {item.label}
        </NavLink>
      </div>
    ))}
  </nav>
);

export default Navigation;
