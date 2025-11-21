import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

/**
 * Breadcrumbs Component
 * Displays navigation trail showing current page hierarchy
 * 
 * @param {Object} customLabels - Custom labels for routes (optional)
 * @param {string} separator - Separator character (default: '/')
 * @param {boolean} showHome - Show home icon (default: true)
 */
const Breadcrumbs = ({ 
  customLabels = {}, 
  separator = '/', 
  showHome = true 
}) => {
  const location = useLocation();
  
  // Generate breadcrumb trail from current path
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    // If on home page, don't show breadcrumbs
    if (pathnames.length === 0) {
      return [];
    }

    const breadcrumbs = [];
    
    // Add home breadcrumb
    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        path: '/',
        isHome: true,
      });
    }

    // Build breadcrumb trail
    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format label: capitalize and replace hyphens with spaces
      const defaultLabel = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Use custom label if provided, otherwise use formatted segment
      const label = customLabels[currentPath] || defaultLabel;
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isLast: index === pathnames.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render if no breadcrumbs
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-neutral-50 border-b border-neutral-200">
      <div className="container-custom py-1.5">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-1.5 sm:gap-2">
              {/* Breadcrumb Link */}
              {crumb.isLast ? (
                <span 
                  className="text-neutral-900 font-semibold truncate max-w-[120px] sm:max-w-none"
                  aria-current="page"
                  title={crumb.label}
                >
                  {crumb.isHome ? (
                    <FaHome className="text-sm sm:text-base flex-shrink-0" />
                  ) : (
                    crumb.label
                  )}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-neutral-700 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 sm:gap-2 truncate max-w-[100px] sm:max-w-none"
                  title={crumb.label}
                >
                  {crumb.isHome ? (
                    <FaHome className="text-sm sm:text-base flex-shrink-0" />
                  ) : (
                    crumb.label
                  )}
                </Link>
              )}

              {/* Separator */}
              {!crumb.isLast && (
                <span className="text-neutral-400 flex-shrink-0" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
