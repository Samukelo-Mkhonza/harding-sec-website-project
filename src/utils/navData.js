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
          { path: '/books', label: 'Books & Textbooks Library' },
          { path: '/academics', label: 'Extra Classes' },
          { path: '/academics', label: 'Career Guidance' },
          { path: '/academics', label: 'Library & Facilities' },
        ],
      },
    ],
  },
  {
    label: 'Admissions',
    path: '/admissions',
    megaMenu: [
      {
        heading: 'Join Our School',
        links: [
          { path: '/admissions',       label: 'Admissions Overview' },
          { path: '/admissions/apply', label: 'Apply Online' },
          { path: '/admissions',       label: 'Requirements' },
          { path: '/admissions',       label: 'Fees & Support' },
        ],
      },
      {
        heading: 'Grades Offered',
        links: [
          { path: '/admissions/apply', label: 'Grade 8 — New Intake' },
          { path: '/admissions/apply', label: 'Grade 9' },
          { path: '/admissions/apply', label: 'Grade 10' },
          { path: '/admissions/apply', label: 'Grade 11' },
          { path: '/admissions/apply', label: 'Grade 12 (Matric)' },
        ],
      },
    ],
  },
  {
    label: 'School Life',
    path: '/student-life',
    megaMenu: [
      {
        heading: 'Activities',
        links: [
          { path: '/student-life', label: 'Sports Programs' },
          { path: '/student-life', label: 'Cultural Activities' },
          { path: '/student-life#clubs', label: 'Clubs & Societies' },
          { path: '/gallery', label: 'Photo Gallery' },
        ],
      },
      {
        heading: 'Clubs & Societies',
        links: [
          { path: '/student-life/clubs/debate-society', label: 'Debate Society' },
          { path: '/student-life/clubs/science-club', label: 'Science Club' },
          { path: '/student-life/clubs/drama-club', label: 'Drama Club' },
          { path: '/student-life/clubs/music-society', label: 'Music Society' },
          { path: '/student-life/clubs/environmental-club', label: 'Environmental Club' },
          { path: '/student-life/clubs/photography-club', label: 'Photography Club' },
          { path: '/student-life/clubs/chess-club', label: 'Chess Club' },
          { path: '/student-life/clubs/first-aid-club', label: 'First Aid Club' },
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
  {
    label: 'News & Events',
    path: '/news',
    megaMenu: [
      {
        heading: 'Latest News',
        links: [
          { path: '/news', label: 'All News & Announcements' },
          { path: '/news', label: 'Academic News' },
          { path: '/news', label: 'Sports News' },
          { path: '/news', label: 'Community Stories' },
        ],
      },
      {
        heading: 'Events & Updates',
        links: [
          { path: '/news', label: 'Upcoming Events' },
          { path: '/school-calendar', label: 'School Calendar' },
          { path: '/news', label: 'Matric Results' },
          { path: '/contact', label: 'Media Enquiries' },
        ],
      },
    ],
  },
  { path: '/contact', label: 'Contact' },
];

export const PORTAL_BUTTONS = [
  { label: 'Old Hardingian', path: '#' },
  { label: 'Parent Portal', path: '#' },
  { label: 'School Connect', path: '#' },
];

export const TOP_BAR_LINKS = [
  { label: 'Past Papers', path: '/past-papers' },
  { label: 'Books & Textbooks', path: '/books' },
  { label: 'School Calendar', path: '#' },
];
