import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const ROUTE_LABELS = {
  '/about': 'About Us',
  '/contact': 'Contact Us',
  '/past-papers': 'Past Papers',
  '/books': 'Books & Textbooks',
  '/university-applications': 'University Applications',
  '/student-portal/bursaries': 'Bursary Finder',
  '/student-portal/timetable': 'Study Timetable',
  '/student-portal/noticeboard': 'Noticeboard',
  '/student-portal/subjects': 'Subject Explorer',
  '/student-life/clubs': 'Clubs',
  '/admissions/apply': 'Apply Online',
  '/alumni': 'Old Hardingians',
  '/student-council': 'Student Council',
  '/matric-results': 'Matric Results',
  '/news': 'News & Events',
  '/careers': 'Careers',
  '/sports': 'Sport',
};

const titleCase = (segment) =>
  segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Builds the trail for a pathname. Exported for testing.
 */
export const buildTrail = (pathname, customLabels = {}) => {
  const labels = { ...ROUTE_LABELS, ...customLabels };
  const segments = pathname.split('/').filter(Boolean);
  let path = '';
  return segments.map((segment, i) => {
    path += `/${segment}`;
    return {
      path,
      label: labels[path] || titleCase(segment),
      isLast: i === segments.length - 1,
    };
  });
};

/**
 * Breadcrumbs — auto-generated from the URL, with schema.org markup.
 * `tone="light"` renders white text for use on the dark page hero.
 */
const Breadcrumbs = ({ customLabels, tone = 'dark' }) => {
  const { pathname } = useLocation();
  const trail = buildTrail(pathname, customLabels);
  if (trail.length === 0) return null;

  const light = tone === 'light';
  const linkClass = light
    ? 'text-white/70 hover:text-white'
    : 'text-neutral-400 hover:text-primary';
  const currentClass = light ? 'text-white font-semibold' : 'text-neutral-600 font-semibold';
  const sepClass = light ? 'text-white/40' : 'text-neutral-300';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const base = process.env.PUBLIC_URL || '';

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/" className={`${linkClass} inline-flex items-center transition-colors`} itemProp="item">
            <FaHome aria-hidden="true" />
            <span itemProp="name" className="sr-only">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {trail.map((crumb, i) => (
          <li
            key={crumb.path}
            className="flex items-center gap-2 min-w-0"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <FaChevronRight className={`text-[10px] ${sepClass}`} aria-hidden="true" />
            {crumb.isLast ? (
              <span className={`${currentClass} truncate max-w-[14rem]`} aria-current="page" itemProp="name">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.path} className={`${linkClass} transition-colors truncate max-w-[10rem]`}>
                <span itemProp="name">{crumb.label}</span>
              </Link>
            )}
            <link itemProp="item" href={`${origin}${base}${crumb.path}`} />
            <meta itemProp="position" content={String(i + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
