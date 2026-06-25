import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SkeletonLoader } from './components';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedLayout from './components/AnimatedLayout';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const StudentLife = lazy(() => import('./pages/StudentLife'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const PastPapersPortal = lazy(() => import('./pages/PastPapersPortal'));
const BooksPortal = lazy(() => import('./pages/BooksPortal'));
const ClubPage = lazy(() => import('./pages/ClubPage'));
const ParentPortal = lazy(() => import('./pages/ParentPortal'));
const StudentPortal = lazy(() => import('./pages/StudentPortal'));
const StaffPortal = lazy(() => import('./pages/StaffPortal'));
const SchoolCalendar = lazy(() => import('./pages/SchoolCalendar'));
const Policies = lazy(() => import('./pages/Policies'));
const CareerOpportunities = lazy(() => import('./pages/CareerOpportunities'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const OnlineApplication = lazy(() => import('./pages/OnlineApplication'));
const News = lazy(() => import('./pages/News'));
const UniversityApplicationsPortal = lazy(() => import('./pages/UniversityApplicationsPortal'));
const BursaryFinder = lazy(() => import('./pages/BursaryFinder'));
const StudyTimetable = lazy(() => import('./pages/StudyTimetable'));
const CommunityNoticeboard = lazy(() => import('./pages/CommunityNoticeboard'));
const SubjectExplorer = lazy(() => import('./pages/SubjectExplorer'));
const AlumniHallOfFame = lazy(() => import('./pages/AlumniHallOfFame'));
const MatricResults = lazy(() => import('./pages/MatricResults'));
const StudentCouncil = lazy(() => import('./pages/StudentCouncil'));
const SportsTracker = lazy(() => import('./pages/SportsTracker'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Loading fallback component
 */
const PageLoader = () => (
  <div className="min-h-screen bg-neutral-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SkeletonLoader variant="text" width="40%" height={40} className="mb-6" />
      <SkeletonLoader variant="text" width="60%" height={24} className="mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <SkeletonLoader key={i} variant="card" height={300} />
        ))}
      </div>
    </div>
  </div>
);

/**
 * Main App Router with code splitting
 */
const AppRouter = () => {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary-dark focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-grow pt-[116px]">
          <Routes>
            {/* All pages render through AnimatedLayout, which animates page
                exit/entrance, handles Suspense, and resets scroll on navigation. */}
            <Route element={<AnimatedLayout fallback={<PageLoader />} />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/admissions/apply" element={<OnlineApplication />} />
              <Route path="/student-life" element={<StudentLife />} />
              <Route path="/student-life/clubs/:clubSlug" element={<ClubPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/past-papers" element={<PastPapersPortal />} />
              <Route path="/books" element={<BooksPortal />} />
              <Route path="/parent-portal" element={<ParentPortal />} />
              <Route path="/student-portal" element={<StudentPortal />} />
              <Route path="/staff-portal" element={<StaffPortal />} />
              <Route path="/school-calendar" element={<SchoolCalendar />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/careers" element={<CareerOpportunities />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/news" element={<News />} />
              <Route path="/university-applications" element={<UniversityApplicationsPortal />} />
              <Route path="/student-portal/bursaries" element={<BursaryFinder />} />
              <Route path="/student-portal/timetable" element={<StudyTimetable />} />
              <Route path="/student-portal/noticeboard" element={<CommunityNoticeboard />} />
              <Route path="/student-portal/subjects" element={<SubjectExplorer />} />
              <Route path="/alumni" element={<AlumniHallOfFame />} />
              <Route path="/matric-results" element={<MatricResults />} />
              <Route path="/student-council" element={<StudentCouncil />} />
              <Route path="/sports" element={<SportsTracker />} />

              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppRouter;
