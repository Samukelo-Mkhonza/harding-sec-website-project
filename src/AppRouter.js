import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/student-life" element={<StudentLife />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* 404 redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
