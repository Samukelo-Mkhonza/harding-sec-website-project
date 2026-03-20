import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SkeletonLoader } from './components';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const StudentLife = lazy(() => import('./pages/StudentLife'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const PastPapersPortal = lazy(() => import('./pages/PastPapersPortal'));
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
      <ScrollToTop />
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary-dark focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/student-life" element={<StudentLife />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/past-papers" element={<PastPapersPortal />} />
              
              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppRouter;
