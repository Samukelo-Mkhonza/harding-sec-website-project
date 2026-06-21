import { FaBook, FaClock, FaChartBar, FaDownload, FaPhoneAlt, FaEnvelope, FaLock, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { HERO_IMAGES } from '../utils/imageConstants';

const FEATURES = [
  { Icon: FaBook, title: 'Study Resources', desc: 'Access textbook summaries, past papers, and subject notes curated by your teachers.' },
  { Icon: FaClock, title: 'Timetables', desc: 'View your class schedule, exam timetables, and important school dates.' },
  { Icon: FaChartBar, title: 'Progress Tracking', desc: 'Monitor your academic performance, class ranks, and improvement over time.' },
  { Icon: FaDownload, title: 'Downloads', desc: 'Download assignment briefs, worksheets, and official school documents.' },
];

const StudentPortal = () => (
  <>
    <SEO
      title="Student Portal | Harding Secondary School"
      description="Access study resources, timetables, and academic tools through the Harding Secondary School student portal."
    />
    <div>
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative py-28 md:py-36 text-center overflow-hidden">
        <img
          src={HERO_IMAGES.classroom}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative z-10 container-custom">
          <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Harding Secondary</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
            Student Portal
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">
            Your digital hub for learning, resources, and school life
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FaGraduationCap className="text-primary text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary-dark">Student Login</h2>
                    <p className="text-neutral-400 text-sm">Use your school-issued student number</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Student Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 2025001234"
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
                  Sign In
                </button>

                <p className="text-center text-xs text-neutral-400 mt-4">
                  Need access?{' '}
                  <Link to="/contact" className="text-primary hover:underline font-medium">Contact your class teacher</Link>
                </p>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                  <p className="font-semibold mb-1">Portal Coming Soon</p>
                  <p>The student portal is currently under development. Visit the <Link to="/past-papers" className="underline">Past Papers Portal</Link> for study resources in the meantime.</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Features */}
            <AnimateOnScroll animation="slide-left">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Portal Features</p>
                <h2 className="text-3xl font-heading font-bold text-primary-dark mb-8 leading-tight">
                  Tools to power your studies
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

                <div className="mt-8 p-5 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm font-semibold text-primary-dark mb-1">Already studying?</p>
                  <p className="text-sm text-neutral-500 mb-3">Browse our free Past Papers Portal for exam preparation resources.</p>
                  <Link
                    to="/past-papers"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    <FaLock className="text-xs" />
                    Go to Past Papers Portal
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-primary-dark mb-4">Need Assistance?</h2>
            <p className="text-neutral-500 text-sm mb-8">
              For portal access issues, speak to your class teacher or visit the school's administration office.
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

export default StudentPortal;
