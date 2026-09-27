import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaArrowRight, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa';
import { validateEmail, buildMailto } from '../utils/formValidation';
import { SCHOOL_CONTACT } from '../utils/constants';

const QUICK_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/academics', label: 'Academics' },
  { path: '/admissions', label: 'Admissions' },
  { path: '/student-life', label: 'Student Life' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

const RESOURCES = [
  { path: '/past-papers', label: 'Past Papers Portal' },
  { path: '/parent-portal', label: 'Parent Portal' },
  { path: '/student-portal', label: 'Student Portal' },
  { path: '/staff-portal', label: 'Staff Portal' },
  { path: '/school-calendar', label: 'School Calendar' },
  { path: '/policies', label: 'Policies & Documents' },
  { path: '/careers', label: 'Career Opportunities' },
];

// Fill in the school's real profile URLs; icons with an empty href are not shown.
const SOCIALS = [
  { Icon: FaFacebookF, label: 'Facebook', href: '' },
  { Icon: FaTwitter, label: 'Twitter (X)', href: '' },
  { Icon: FaInstagram, label: 'Instagram', href: '' },
  { Icon: FaLinkedinIn, label: 'LinkedIn', href: '' },
  { Icon: FaYoutube, label: 'YouTube', href: '' },
].filter((s) => s.href);

const INFO_STRIP = [
  { Icon: FaPhone, text: '039 433 1223', href: 'tel:0394331223' },
  { Icon: FaEnvelope, text: 'info@hardingsecondary.edu.za', href: 'mailto:info@hardingsecondary.edu.za' },
  { Icon: FaMapMarkerAlt, text: 'Harding, KwaZulu-Natal', href: null },
  { Icon: FaClock, text: 'Mon–Thu: 7:30 AM – 4:00 PM', href: null },
];

const FooterLink = ({ path, label }) => {
  const cls =
    'flex items-center gap-2 text-white/75 hover:text-accent-neon transition-colors duration-200 text-sm group';

  const inner = (
    <>
      <FaArrowRight className="text-xs text-accent-neon opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
      {label}
    </>
  );

  return path.startsWith('/') ? (
    <Link to={path} className={cls}>{inner}</Link>
  ) : (
    <a href={path} className={cls}>{inner}</a>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [emailError, setEmailError] = useState('');
  const currentYear = new Date().getFullYear();

  // No mailing-list backend yet: send the school a subscription request
  // from the visitor's own email app so the request actually arrives.
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    setEmailError(error);
    if (error) return;
    window.location.href = buildMailto(
      SCHOOL_CONTACT.EMAIL,
      'Newsletter subscription',
      `Please add ${email.trim()} to the Harding Secondary School newsletter.`
    );
    setSubscribeStatus('success');
    setEmail('');
  };

  return (
    <footer className="mt-auto text-white">

      {/* ── Top info strip ─────────────────────────────────── */}
      <div style={{ backgroundColor: '#1a6b3a' }}>
        <div className="container-custom">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-8 gap-y-2 py-3 border-b border-white/10">
            {INFO_STRIP.map(({ Icon, text, href }) =>
              href ? (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2 text-white/80 hover:text-accent-neon transition-colors duration-200 text-xs"
                >
                  <Icon className="text-accent-neon flex-shrink-0" aria-hidden="true" />
                  <span>{text}</span>
                </a>
              ) : (
                <span key={text} className="hidden md:flex items-center gap-2 text-white/75 text-xs">
                  <Icon className="text-accent-neon flex-shrink-0" />
                  {text}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Main footer body ───────────────────────────────── */}
      <div style={{ backgroundColor: '#0D4E25' }}>
        <div className="container-custom py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Column 1 — Brand */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
                <img
                  src={`${process.env.PUBLIC_URL}/harding-sec-logo-sm.png`}
                  alt="Harding Secondary School"
                  width="60"
                  height="56"
                  loading="lazy"
                  className="h-14 group-hover:scale-105 transition-transform duration-200"
                />
                <div>
                  <p className="font-heading font-bold text-lg text-white leading-tight">
                    Harding Secondary
                  </p>
                  <p className="text-white/75 text-xs">Est. 1950</p>
                </div>
              </Link>

              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Nurturing excellence and building tomorrow's leaders in the heart of
                KwaZulu-Natal. Over 70 years of educational achievement.
              </p>

              <p className="text-accent-neon text-xs font-semibold tracking-widest uppercase mb-6 italic">
                "Excellence in Education"
              </p>

              {/* Social icons */}
              {SOCIALS.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Harding Secondary on ${label}`}
                    className="w-9 h-9 bg-white/10 hover:bg-accent-neon hover:text-secondary-dark text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
              )}
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 pb-3 border-b border-white/10">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.path}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Resources */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 pb-3 border-b border-white/10">
                Resources
              </h3>
              <ul className="space-y-3">
                {RESOURCES.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Newsletter + School Details */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 pb-3 border-b border-white/10">
                Stay Connected
              </h3>

              <p className="text-white/75 text-sm leading-relaxed mb-5">
                Subscribe for the latest news, events, and updates from Harding Secondary School.
              </p>

              <form onSubmit={handleNewsletterSubmit} noValidate className="mb-7">
                <div className="flex flex-col gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="Your email address"
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? 'newsletter-error' : undefined}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-neon focus:border-transparent text-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-accent-neon text-secondary-dark font-semibold rounded-xl hover:bg-white active:scale-95 transition-all duration-200 text-sm shadow-lg"
                  >
                    <FaPaperPlane className="text-sm" />
                    Subscribe
                  </button>
                </div>
                {emailError && (
                  <p id="newsletter-error" className="text-red-300 !text-sm mt-2">{emailError}</p>
                )}
                {subscribeStatus === 'success' && (
                  <p role="status" className="flex items-start gap-2 text-accent-neon !text-sm mt-3">
                    <FaCheckCircle className="mt-1 shrink-0" aria-hidden="true" />
                    Your email app will open — send the message to confirm your subscription.
                  </p>
                )}
              </form>

              {/* School details card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5 text-xs">
                <p className="text-white font-semibold mb-2">School Details</p>
                <p className="text-white/75">
                  Exam No: <span className="text-white/90 font-medium">5312210</span>
                </p>
                <p className="text-white/75">
                  District: <span className="text-white/90 font-medium">Ugu, KwaZulu-Natal</span>
                </p>
                <p className="text-white/75">
                  Grades: <span className="text-white/90 font-medium">8 – 12</span>
                </p>
                <p className="text-white/75">
                  Instruction: <span className="text-white/90 font-medium">English</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Thin separator */}
        <div className="container-custom">
          <hr className="border-white/10" />
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div style={{ backgroundColor: '#072713' }}>
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/75">
            <p>© {currentYear} Harding Secondary School. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-white/20">|</span>
              <Link
                to="/terms-of-use"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Use
              </Link>
              <span className="text-white/20">|</span>
              <Link
                to="/contact"
                className="hover:text-accent-neon transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
