import { FaClipboardList, FaUsers, FaCalendarCheck, FaFolderOpen, FaPhoneAlt, FaEnvelope, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { HERO_IMAGES } from '../utils/imageConstants';

const FEATURES = [
  { Icon: FaClipboardList, title: 'Mark Capturing', desc: 'Capture and submit learner marks for continuous assessment and formal tasks.' },
  { Icon: FaUsers, title: 'Class Registers', desc: 'Manage attendance registers and track learner attendance records.' },
  { Icon: FaCalendarCheck, title: 'Staff Calendar', desc: 'View meeting schedules, duty rosters, and professional development dates.' },
  { Icon: FaFolderOpen, title: 'Document Repository', desc: 'Access lesson planning templates, departmental memos, and school policies.' },
];

const StaffPortal = () => (
  <>
    <SEO
      title="Staff Portal | Harding Secondary School"
      description="Secure staff portal for educators and administrative staff at Harding Secondary School."
    />
    <div>
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative py-28 md:py-36 text-center overflow-hidden">
        <img
          src={HERO_IMAGES.library}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/88" />
        <div className="relative z-10 container-custom">
          <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Staff Access</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
            Staff Portal
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">
            Secure access for Harding Secondary educators and admin staff
          </p>
        </div>
      </section>

      {/* Portal Access */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Login Card */}
            <AnimateOnScroll animation="slide-right">
              <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FaUserTie className="text-primary text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary-dark">Staff Login</h2>
                    <p className="text-neutral-400 text-sm">Authorized personnel only</p>
                  </div>
                </div>

                <div className="mt-2 mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                  This portal is restricted to Harding Secondary School staff members.
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Staff ID / Persal Number</label>
                    <input
                      type="text"
                      placeholder="Enter your Persal number"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <button className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200 text-sm shadow">
                  Sign In Securely
                </button>

                <p className="text-center text-xs text-neutral-400 mt-4">
                  Access issues?{' '}
                  <Link to="/contact" className="text-primary hover:underline font-medium">Contact the principal's office</Link>
                </p>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                  <p className="font-semibold mb-1">Portal Coming Soon</p>
                  <p>The digital staff portal is under development. Please continue using current systems for mark capturing and registers.</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Features */}
            <AnimateOnScroll animation="slide-left">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Portal Tools</p>
                <h2 className="text-3xl font-heading font-bold text-primary-dark mb-8 leading-tight">
                  Built for Harding's educators
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {FEATURES.map(({ Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-800 text-sm mb-1">{title}</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-600">
                  <p className="font-semibold text-neutral-800 mb-1">SACE & DoE Compliance</p>
                  <p>All staff portal functions are aligned with South African Council for Educators (SACE) standards and the Department of Basic Education's digital reporting requirements.</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-primary-dark mb-4">Technical Support</h2>
            <p className="text-neutral-500 text-sm mb-8">
              For login issues or technical support, contact the school's administration office during school hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0394331223"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
              >
                <FaPhoneAlt />
                039 433 1223
              </a>
              <a
                href="mailto:info@hardingsecondary.edu.za"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              >
                <FaEnvelope />
                info@hardingsecondary.edu.za
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default StaffPortal;
