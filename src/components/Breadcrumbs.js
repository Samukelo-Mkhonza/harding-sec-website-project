import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

/**
 * Comprehensive Breadcrumbs Component
 * Displays navigation trail showing current page hierarchy with SEO schema markup
 * 
 * Features:
 * - Auto-generates breadcrumbs from URL structure
 * - Schema.org structured data for SEO
 * - Responsive design (desktop/tablet/mobile)
 * - WCAG AA accessibility compliant
 * - Custom labels support
 * - Truncation for long titles
 * 
 * @param {Object} customLabels - Custom labels for routes (optional)
 * @param {string} separator - Separator type: 'chevron', 'slash', 'arrow' (default: 'chevron')
 * @param {boolean} showHome - Show home icon (default: true)
 * @param {number} maxLevels - Maximum breadcrumb levels to show (default: 4)
 * @param {number} maxTitleLength - Maximum characters for page titles (default: 25)
 */
const Breadcrumbs = ({ 
  customLabels = {}, 
  separator = 'chevron',
  showHome = true,
  maxLevels = 4,
  maxTitleLength = 25
}) => {
  const location = useLocation();
  
  // Default custom labels for common routes
  const defaultLabels = {
    '/about': 'About Us',
    '/academics': 'Academics',
    '/admissions': 'Admissions',
    '/student-life': 'Student Life',
    '/gallery': 'Gallery',
    '/contact': 'Contact Us',
    '/past-papers': 'Past Papers Portal',
    ...customLabels
  };

  // Separator icons
  const separatorIcons = {
    chevron: <FaChevronRight className="text-xs" />,
    slash: <span className="text-sm">/</span>,
    arrow: <span className="text-sm">→</span>
  };

  // Truncate long titles
  const truncateTitle = (title) => {
    if (title.length <= maxTitleLength) return title;
    return `${title.substring(0, maxTitleLength)}...`;
  };
  
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
        position: 1
      });
    }

    // Build breadcrumb trail
    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format label: capitalize and replace hyphens/underscores with spaces
      const defaultLabel = segment
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Use custom label if provided, otherwise use formatted segment
      const label = defaultLabels[currentPath] || defaultLabel;
      
      breadcrumbs.push({
        label,
        fullLabel: label, // Keep full label for title attribute
        path: currentPath,
        isLast: index === pathnames.length - 1,
        position: index + 2 // +2 because home is position 1
      });
    });

    // Handle deep nesting - collapse middle items if exceeds maxLevels
    if (breadcrumbs.length > maxLevels) {
      const firstItems = breadcrumbs.slice(0, 2); // Home + first level
      const lastItems = breadcrumbs.slice(-2); // Parent + current
      const collapsedCount = breadcrumbs.length - 4;
      
      return [
        ...firstItems,
        {
          label: '...',
          isEllipsis: true,
          collapsedCount,
          position: 3
        },
        ...lastItems.map((item, idx) => ({
          ...item,
          position: 4 + idx
        }))
      ];
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render if no breadcrumbs
  if (breadcrumbs.length === 0) {
    return null;
  }

  const separatorIcon = separatorIcons[separator] || separatorIcons.chevron;

  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className="bg-white border-b border-gray-200 w-full"
      style={{ 
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 w-full">
        {/* Desktop & Tablet View */}
        <ol 
          className="hidden sm:flex items-center flex-wrap gap-3 text-base"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((crumb, index) => (
            <li 
              key={crumb.path || `ellipsis-${index}`}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {/* Ellipsis for collapsed items */}
              {crumb.isEllipsis ? (
                <>
                  <span 
                    className="text-neutral-500 px-2"
                    title={`${crumb.collapsedCount} hidden level${crumb.collapsedCount > 1 ? 's' : ''}`}
                  >
                    ...
                  </span>
                  <meta itemProp="position" content={crumb.position} />
                </>
              ) : (
                <>
                  {/* Breadcrumb Link or Current Page */}
                  {crumb.isLast ? (
                    <span 
                      className="text-gray-900 font-bold flex items-center gap-2 text-base"
                      aria-current="page"
                      title={crumb.fullLabel}
                      itemProp="name"
                    >
                      {crumb.isHome ? (
                        <FaHome className="text-xl" aria-label="Home" />
                      ) : (
                        truncateTitle(crumb.label)
                      )}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="text-gray-600 hover:text-primary-dark hover:underline transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 text-base font-medium"
                      title={crumb.fullLabel}
                      itemProp="item"
                    >
                      <span itemProp="name">
                        {crumb.isHome ? (
                          <FaHome className="text-xl" aria-label="Home" />
                        ) : (
                          truncateTitle(crumb.label)
                        )}
                      </span>
                    </Link>
                  )}
                  <meta itemProp="position" content={crumb.position} />
                  {crumb.path && <link itemProp="item" href={`${window.location.origin}${crumb.path}`} />}
                </>
              )}

              {/* Separator */}
              {!crumb.isLast && (
                <span className="text-gray-400 text-base font-bold" aria-hidden="true">
                  {separatorIcon}
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* Mobile View - Simplified */}
        <div className="sm:hidden flex items-center gap-3 text-base">
          {breadcrumbs.length > 1 && (
            <>
              {/* Back to parent link */}
              <Link
                to={breadcrumbs[breadcrumbs.length - 2]?.path || '/'}
                className="text-primary-dark hover:text-primary font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                aria-label="Go back"
              >
                <span className="text-2xl font-bold">←</span>
                <span className="truncate max-w-[140px]">
                  {breadcrumbs[breadcrumbs.length - 2]?.label || 'Back'}
                </span>
              </Link>
              <span className="text-gray-400 text-base font-bold" aria-hidden="true">/</span>
            </>
          )}
          {/* Current page */}
          <span 
            className="text-gray-900 font-bold truncate flex-1"
            aria-current="page"
          >
            {truncateTitle(breadcrumbs[breadcrumbs.length - 1]?.label || '')}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
