import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaInfoCircle, FaGraduationCap, FaUserPlus, FaUsers, FaImages, FaEnvelope,
  FaBookOpen, FaUserFriends, FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt,
  FaFileAlt, FaBriefcase, FaMapMarkerAlt, FaPhone, FaClock, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa';
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
    { path: '/about', label: 'About Us', Icon: FaInfoCircle },
    { path: '/academics', label: 'Academics', Icon: FaGraduationCap },
    { path: '/admissions', label: 'Admissions', Icon: FaUserPlus },
    { path: '/student-life', label: 'Student Life', Icon: FaUsers },
    { path: '/gallery', label: 'Gallery', Icon: FaImages },
    { path: '/contact', label: 'Contact', Icon: FaEnvelope },
  ];

  const resources = [
    { path: '/past-papers', label: 'Past Papers Portal', Icon: FaBookOpen },
    { path: '#', label: 'Parent Portal', Icon: FaUserFriends },
    { path: '#', label: 'Student Portal', Icon: FaUserGraduate },
    { path: '#', label: 'Staff Portal', Icon: FaChalkboardTeacher },
    { path: '#', label: 'School Calendar', Icon: FaCalendarAlt },
    { path: '#', label: 'Policies & Documents', Icon: FaFileAlt },
    { path: '#', label: 'Career Opportunities', Icon: FaBriefcase },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white mt-auto">
      {/* Main Footer Content */}
      <div className="bg-primary">
        <div className="container-custom py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
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
                  className="w-10 h-10 bg-white/10 hover:bg-accent-neon rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent-neon rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent-neon rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent-neon rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-accent-neon rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => {
                  const IconComponent = link.Icon;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-white/80 hover:text-accent-neon transition-colors duration-200 flex items-center gap-3 group"
                      >
                        <IconComponent className="text-base group-hover:translate-x-1 transition-transform" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Resources</h3>
              <ul className="space-y-4">
                {resources.map((link) => {
                  const IconComponent = link.Icon;
                  return (
                    <li key={link.label}>
                      {link.path.startsWith('/') ? (
                        <Link
                          to={link.path}
                          className="text-white/80 hover:text-accent-neon transition-colors duration-200 flex items-center gap-3 group"
                        >
                          <IconComponent className="text-base group-hover:translate-x-1 transition-transform" />
                          <span>{link.label}</span>
                        </Link>
                      ) : (
                        <a
                          href={link.path}
                          className="text-white/80 hover:text-accent-neon transition-colors duration-200 flex items-center gap-3 group"
                        >
                          <IconComponent className="text-base group-hover:translate-x-1 transition-transform" />
                          <span>{link.label}</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact & Newsletter Column */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">Contact Us</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-base text-accent-neon mt-1" />
                  <div>
                    <p className="text-white/90">Harding, KwaZulu-Natal</p>
                    <p className="text-white/90">South Africa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-base text-accent-neon" />
                  <a href="tel:0394331223" className="text-white/90 hover:text-accent-neon transition-colors">
                    039 433 1223
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-base text-accent-neon" />
                  <a href="mailto:info@hardingsecondary.edu.za" className="text-white/90 hover:text-accent-neon transition-colors">
                    info@hardingsecondary.edu.za
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <FaClock className="text-base text-accent-neon mt-1" />
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
                      <FaPaperPlane className="text-base" />
                      Subscribe
                    </span>
                  </button>
                  {subscribeStatus === 'success' && (
                    <p className="text-accent-neon text-sm flex items-center gap-2">
                      <FaCheckCircle className="text-base" />
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
                className="text-white/70 hover:text-accent-neon transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-white/30">|</span>
              <Link
                to="/terms"
                className="text-white/70 hover:text-accent-neon transition-colors"
              >
                Terms of Use
              </Link>
              <span className="text-white/30">|</span>
              <Link
                to="/sitemap"
                className="text-white/70 hover:text-accent-neon transition-colors"
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
