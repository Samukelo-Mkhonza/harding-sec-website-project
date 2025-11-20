import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus(''), 3000);
  };

  const quickLinks = [
    { path: '/about', label: 'About Us', icon: 'info-circle' },
    { path: '/academics', label: 'Academics', icon: 'graduation-cap' },
    { path: '/admissions', label: 'Admissions', icon: 'user-plus' },
    { path: '/student-life', label: 'Student Life', icon: 'users' },
    { path: '/gallery', label: 'Gallery', icon: 'images' },
    { path: '/contact', label: 'Contact', icon: 'envelope' },
  ];

  const resources = [
    { path: '#', label: 'Parent Portal', icon: 'user-friends' },
    { path: '#', label: 'Student Portal', icon: 'user-graduate' },
    { path: '#', label: 'Staff Portal', icon: 'chalkboard-teacher' },
    { path: '#', label: 'School Calendar', icon: 'calendar-alt' },
    { path: '#', label: 'Policies & Documents', icon: 'file-alt' },
    { path: '#', label: 'Career Opportunities', icon: 'briefcase' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white mt-auto">
      {/* Main Footer Content */}
      <div className="bg-primary">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Harding Secondary School Logo"
                  className="h-12"
                />
                <div>
                  <h3 className="font-heading font-bold text-xl">Harding Secondary</h3>
                  <p className="text-white/80 text-sm">Since 1950</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">
                Excellence in education since 1950. Nurturing tomorrow's leaders in the heart of KwaZulu-Natal with over 1,250 learners and 41 dedicated educators.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/80 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <i className={`fas fa-${link.icon} w-4 group-hover:translate-x-1 transition-transform`}></i>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      className="text-white/80 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <i className={`fas fa-${link.icon} w-4 group-hover:translate-x-1 transition-transform`}></i>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter Column */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Contact Us</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-secondary mt-1"></i>
                  <div>
                    <p className="text-white/90">Harding, KwaZulu-Natal</p>
                    <p className="text-white/90">South Africa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-secondary"></i>
                  <a href="tel:0394331223" className="text-white/90 hover:text-secondary transition-colors">
                    039 433 1223
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-envelope text-secondary"></i>
                  <a href="mailto:info@hardingsecondary.edu.za" className="text-white/90 hover:text-secondary transition-colors">
                    info@hardingsecondary.edu.za
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-clock text-secondary mt-1"></i>
                  <div className="text-white/90 text-sm">
                    <p>Mon-Thu: 7:30 AM - 4:00 PM</p>
                    <p>Fri: 7:30 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Newsletter</h4>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-secondary"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-paper-plane"></i>
                      Subscribe
                    </span>
                  </button>
                  {subscribeStatus === 'success' && (
                    <p className="text-secondary text-sm flex items-center gap-2">
                      <i className="fas fa-check-circle"></i>
                      Thank you for subscribing!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary-dark border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} Harding Secondary School. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                to="/privacy"
                className="text-white/70 hover:text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-white/30">|</span>
              <Link
                to="/terms"
                className="text-white/70 hover:text-secondary transition-colors"
              >
                Terms of Use
              </Link>
              <span className="text-white/30">|</span>
              <Link
                to="/sitemap"
                className="text-white/70 hover:text-secondary transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
