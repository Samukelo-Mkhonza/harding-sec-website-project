export const NAV_DATA = [
  { path: '/', label: 'Home' },
  {
    label: 'About',
    path: '/about',
    megaMenu: [
      {
        heading: 'About Our School',
        links: [
          { path: '/about', label: 'Why Harding Secondary?' },
          { path: '/about', label: 'Our History' },
          { path: '/about', label: 'Mission & Vision' },
          { path: '/about', label: 'Core Values' },
        ],
      },
      {
        heading: 'School Community',
        links: [
          { path: '/about', label: "Principal's Message" },
          { path: '/about', label: 'School Governing Body' },
          { path: '/about', label: 'Meet Our Educators' },
          { path: '/contact', label: 'Contact the Office' },
        ],
      },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    megaMenu: [
      {
        heading: 'Academic Programmes',
        links: [
          { path: '/academics', label: 'Curriculum Overview' },
          { path: '/academics', label: 'Subject Streams' },
          { path: '/academics', label: 'Achievements' },
          { path: '/academics', label: 'Grade Structure (8–12)' },
        ],
      },
      {
        heading: 'Resources & Support',
        links: [
          { path: '/past-papers', label: 'Past Papers Portal' },
          { path: '/academics', label: 'Extra Classes' },
          { path: '/academics', label: 'Career Guidance' },
          { path: '/academics', label: 'Library & Facilities' },
        ],
      },
    ],
  },
  { path: '/admissions', label: 'Admissions' },
  {
    label: 'School Life',
    path: '/student-life',
    megaMenu: [
      {
        heading: 'Activities',
        links: [
          { path: '/student-life', label: 'Sports Programs' },
          { path: '/student-life', label: 'Cultural Activities' },
          { path: '/student-life', label: 'Clubs & Societies' },
          { path: '/gallery', label: 'Photo Gallery' },
        ],
      },
      {
        heading: 'Events & Support',
        links: [
          { path: '/student-life', label: 'Annual Events' },
          { path: '/student-life', label: 'Student Leadership' },
          { path: '/student-life', label: 'Counseling Services' },
          { path: '/student-life', label: 'Health & Wellness' },
        ],
      },
    ],
  },
  { path: '/contact', label: 'News & Events' },
  { path: '/contact', label: 'Contact' },
];

export const PORTAL_BUTTONS = [
  { label: 'Old Hardingian', path: '#' },
  { label: 'Parent Portal', path: '#' },
  { label: 'School Connect', path: '#' },
];

export const TOP_BAR_LINKS = [
  { label: 'Past Papers', path: '/past-papers' },
  { label: 'School Calendar', path: '#' },
];
