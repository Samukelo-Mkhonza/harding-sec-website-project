import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaHome, FaInfoCircle, FaGraduationCap, FaClipboardList, 
  FaUsers, FaImages, FaEnvelope, FaNewspaper, FaArrowRight, FaArrowLeft 
} from 'react-icons/fa';
import { SEO } from '../components';
import SearchOverlay from '../components/SearchOverlay';

/**
 * 404 Not Found Page
 * Custom error page with navigation and search functionality
 */
const NotFound = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SEO
        title="Page Not Found - Harding Secondary School"
        description="The page you're looking for doesn't exist. Use our search or navigation to find what you need."
        url="https://hardingsecondary.edu.za/404"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Error Code */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <div className="h-1 w-32 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1 mb-8"
          >
            <FaSearch className="text-base" />
            Search Our Site
          </button>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { to: '/', Icon: FaHome, label: 'Home' },
                { to: '/about', Icon: FaInfoCircle, label: 'About' },
                { to: '/academics', Icon: FaGraduationCap, label: 'Academics' },
                { to: '/admissions', Icon: FaClipboardList, label: 'Admissions' },
                { to: '/student-life', Icon: FaUsers, label: 'Student Life' },
                { to: '/gallery', Icon: FaImages, label: 'Gallery' },
                { to: '/contact', Icon: FaEnvelope, label: 'Contact' },
                { to: '/', Icon: FaNewspaper, label: 'News' },
              ].map((link, index) => {
                const IconComponent = link.Icon;
                return (
                  <Link
                    key={index}
                    to={link.to}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <IconComponent className="text-2xl text-neutral-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-semibold text-neutral-700 group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <FaInfoCircle className="text-blue-500 text-2xl flex-shrink-0 mt-1" />
              <div className="text-left">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-blue-700 text-sm mb-3">
                  If you believe this is an error or you need assistance finding specific information, please contact us.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                >
                  Contact Support
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="mt-8 inline-flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors"
          >
            <FaArrowLeft className="text-base" />
            Go Back
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default NotFound;
