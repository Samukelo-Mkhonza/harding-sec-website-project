# Harding Secondary School Website

The official website for **Harding Secondary School** in KwaZulu-Natal, South Africa — a single-page React application that serves as the school's primary digital presence for prospective and current students, parents, alumni, and staff. Beyond marketing pages, it bundles a set of practical, browser-based portals: past papers, a textbook library, a South African university applications tracker, a bursary finder, study tools, and more.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

## Overview

The site is built as a client-side SPA with code-split, lazy-loaded pages and animated route transitions. Content for the data-driven portals lives in JSON files under `public/data/`, so most features work entirely in the browser with no backend — user state (application trackers, bookmarks, timetables) is persisted to `localStorage`.

### Key features

**Marketing & information**
- **Home** — hero slideshow, news carousel, and key school highlights
- **About, Academics, Admissions, School Life, News & Events, Contact** — core informational pages
- **Mega-menu navigation** — full-width Maritzburg College-style dropdowns with column headings and a portal top bar; driven by a single source of truth in [`src/utils/navData.js`](src/utils/navData.js)
- **Gallery** — filterable photo gallery with lightbox
- **Alumni (Old Hardingian) Hall of Fame**, **Sports fixtures & results**, **Student Council (SRC)**, **Matric results dashboard**, **School calendar**

**Student & parent portals / tools**
- **Past Papers Portal** — browse, filter, search, preview, and download examination papers and memos (`public/data/papers-metadata.json`)
- **Books & Textbooks Library** (`public/data/books-metadata.json`)
- **University Applications Portal** — all 26 DHET-accredited South African public universities with APS requirements, application dates, and faculties; includes a personal application tracker saved to `localStorage` (key `hss_uni_applications`) — see [`src/pages/UniversityApplicationsPortal.js`](src/pages/UniversityApplicationsPortal.js)
- **Bursary Finder**, **Study Timetable**, **Community Noticeboard**, **Subject Explorer** — student tools under `/student-portal/*`
- **Student / Parent / Staff portals** and an **Online Application** form

**Engineering**
- Lazy-loaded routes with `React.Suspense` + skeleton loaders for fast first paint
- Animated page transitions and scroll restoration via [`AnimatedLayout`](src/components/AnimatedLayout.js)
- Accessibility: skip-to-content link, ARIA labels, keyboard navigation
- SEO meta tags per page via `react-helmet-async`
- Build-time image optimization with Sharp

## Tech stack

| Area | Library |
| --- | --- |
| Framework | React 19 |
| Routing | React Router DOM 7 |
| Build tooling | Create React App (`react-scripts` 5) |
| Styling | Tailwind CSS 3.4 (utility-first), Styled Components 6 (legacy), PostCSS / Autoprefixer |
| Animation | Framer Motion, React Intersection Observer |
| UI / media | Swiper (carousels), Yet Another React Lightbox, React Window (virtual scrolling), Lucide React & React Icons |
| UX | React Hot Toast (notifications), React Helmet Async (SEO) |
| Tooling | Sharp (image optimization), Web Vitals |
| Testing | React Testing Library, Jest (via CRA), fast-check (property-based) |

Typography uses **PT Sans** throughout; the brand palette is a green-and-white scheme defined in [`tailwind.config.js`](tailwind.config.js).

## Getting started

### Prerequisites

- **Node.js 18+** (Node 16 minimum) and **npm 8+**

### Install & run

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:3000)
npm start
```

### Available scripts

| Script | Description |
| --- | --- |
| `npm start` | Run the dev server with hot reloading at `http://localhost:3000` |
| `npm test` | Launch the Jest test runner in interactive watch mode |
| `npm run build` | Produce an optimized production build in `build/` (runs `optimize-images` first via the `prebuild` hook) |
| `npm run optimize-images` | Optimize images with Sharp ([`scripts/optimize-images.js`](scripts/optimize-images.js)) |
| `npm run eject` | Eject from Create React App (one-way; avoid unless necessary) |

Run a single test file or with coverage:

```bash
npm test -- Header.test.js
npm test -- --coverage
```

## Project structure

```
harding-sec-website-project/
├── public/
│   ├── data/                # JSON content for the portals
│   │   ├── papers-metadata.json
│   │   ├── books-metadata.json
│   │   └── university-applications-data.json
│   ├── images/              # Static image assets
│   └── index.html
├── scripts/
│   └── optimize-images.js   # Sharp-based image optimization (runs on prebuild)
├── src/
│   ├── pages/               # Route-level pages (lazy loaded) — Home, About, Academics,
│   │                        #   portals, student tools, etc.
│   ├── components/          # Reusable UI (Header, Footer, MegaMenu, Hero, NewsCarousel,
│   │   └── portal/          #   AnimatedLayout, SEO…) and portal-specific components
│   ├── contexts/            # React Context providers (UI, Loading, Toast)
│   ├── hooks/               # Custom hooks (scroll position/direction, intersection, route progress)
│   ├── utils/               # navData.js (nav source of truth), constants, filter/storage helpers
│   ├── styles/              # GlobalStyles + theme
│   ├── App.js               # App shell
│   ├── AppRouter.js         # Route definitions (single source for all routes)
│   ├── AppProviders.js      # Context provider composition
│   └── index.js             # React entry point
├── tailwind.config.js       # Brand colors, fonts (PT Sans), spacing, animations
└── package.json
```

### Routes

All routes are defined in [`src/AppRouter.js`](src/AppRouter.js) and render through `AnimatedLayout`:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/academics` | Academics |
| `/admissions`, `/admissions/apply` | Admissions, Online Application |
| `/student-life`, `/student-life/clubs/:clubSlug` | School life, individual club pages |
| `/gallery`, `/news`, `/contact` | Gallery, News, Contact |
| `/past-papers`, `/books` | Past Papers Portal, Books Library |
| `/university-applications` | University Applications Portal |
| `/student-portal` and `/student-portal/{bursaries,timetable,noticeboard,subjects}` | Student portal + tools |
| `/parent-portal`, `/staff-portal` | Parent / Staff portals |
| `/alumni`, `/sports`, `/student-council`, `/matric-results`, `/school-calendar` | Community & school-life pages |
| `/careers`, `/policies`, `/privacy-policy`, `/terms-of-use` | Informational |
| `*` | 404 Not Found |

To add a new page: create the component in `src/pages/`, register a lazy import + `<Route>` in `AppRouter.js`, and (if it should appear in navigation) add it to `src/utils/navData.js`.

## Deployment

`npm run build` outputs a static bundle in `build/` (minified JS/CSS, optimized images, cache-busted filenames). Because the app is a fully client-side SPA with no server dependency, the `build/` folder can be hosted on any static host:

- **Netlify / Vercel** — connect the Git repo; build command `npm run build`, publish directory `build`
- **GitHub Pages**, **AWS S3 + CloudFront**, or any static/CDN host

> **SPA routing note:** configure the host to rewrite all unmatched paths to `index.html` so client-side routes (e.g. `/university-applications`) resolve on direct load and refresh.

## Contributing

This is a private project for Harding Secondary School. For internal development:

1. Branch from `main`.
2. Make changes with clear, conventional commit messages.
3. Add or update tests for new behavior (`npm test`).
4. Ensure tests pass and the production build succeeds (`npm run build`).
5. Open a pull request for review.

## License

Private — all rights reserved by Harding Secondary School.

---

Built for Harding Secondary School, KwaZulu-Natal, South Africa.
