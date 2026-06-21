import { FaUserCircle, FaFileAlt, FaCalendarAlt, FaComments, FaPhoneAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { HERO_IMAGES } from '../utils/imageConstants';

const FEATURES = [
  { Icon: FaFileAlt, title: 'Academic Reports', desc: 'View your child\'s progress reports, term marks, and academic history.' },
  { Icon: FaCalendarAlt, title: 'School Calendar', desc: 'Stay informed about upcoming events, test dates, and school activities.' },
  { Icon: FaComments, title: 'Teacher Communication', desc: 'Send and receive messages from your child\'s educators.' },
  { Icon: FaUserCircle, title: 'Learner Profile', desc: 'Update your child\'s personal information and emergency contacts.' },
];

const ParentPortal = () => (
  <>
    <SEO
      title="Parent Portal | Harding Secondary School"
      description="Access your child's academic reports, communicate with teachers, and stay connected with Harding Secondary School."
    />
    <div>
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative py-28 md:py-36 text-center overflow-hidden">
        <img
          src={HERO_IMAGES.campus}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative z-10 container-custom">
          <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Harding Secondary</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
            Parent Portal
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">
            Stay connected with your child's education journey
          </p>
        </div>
      </section>

      {/* Portal Access Card */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Login Card */}
            <AnimateOnScroll animation="slide-right">
              <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FaLock className="text-primary text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary-dark">Secure Parent Login</h2>
                    <p className="text-neutral-400 text-sm">Access requires school-issued credentials</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Username / ID Number</label>
                    <input
                      type="text"
                      placeholder="Enter your username"
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
                  Sign In to Portal
                </button>

                <p className="text-center text-xs text-neutral-400 mt-4">
                  Forgot your password?{' '}
                  <Link to="/contact" className="text-primary hover:underline font-medium">Contact the school office</Link>
                </p>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                  <p className="font-semibold mb-1">Portal Coming Soon</p>
                  <p>Our online parent portal is currently under development. Please contact the school office directly for learner information.</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Features */}
            <AnimateOnScroll animation="slide-left">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What You Can Access</p>
                <h2 className="text-3xl font-heading font-bold text-primary-dark mb-8 leading-tight">
                  Everything you need, in one place
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-primary-dark mb-4">Need Help?</h2>
            <p className="text-neutral-500 text-sm mb-8">
              For portal access or login issues, contact the school's administrative office during school hours.
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

export default ParentPortal;
