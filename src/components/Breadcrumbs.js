import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      <div className="container-custom py-3">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-2">
              {/* Breadcrumb Link */}
              {crumb.isLast ? (
                <span 
                  className="text-neutral-900 font-semibold"
                  aria-current="page"
                >
                  {crumb.isHome ? (
                    <i className="fas fa-home"></i>
                  ) : (
                    crumb.label
                  )}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-neutral-600 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  {crumb.isHome ? (
                    <i className="fas fa-home"></i>
                  ) : (
                    crumb.label
                  )}
                </Link>
              )}

              {/* Separator */}
              {!crumb.isLast && (
                <span className="text-neutral-400" aria-hidden="true">
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
