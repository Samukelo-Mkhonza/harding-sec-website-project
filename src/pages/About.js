import { FaBullseye, FaHandshake, FaLightbulb, FaGlobeAmericas } from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';
import { ABOUT_IMAGES, HERO_IMAGES } from '../utils/imageConstants';

const About = () => {
  const timeline = [
    { year: '1950', text: 'Harding Secondary School founded to serve the educational needs of the local community.' },
    { year: '1975', text: 'Major expansion with new science laboratories and sports facilities.' },
    { year: '1994', text: 'Integration and transformation to serve all learners in the new South Africa.' },
    { year: '2010', text: 'Achieved consistent 90%+ matric pass rates and recognition for academic excellence.' },
    { year: '2025', text: 'Continuing our legacy with 1,252 learners and expanding digital learning initiatives.' },
  ];

  const values = [
    { Icon: FaBullseye, title: 'Excellence', desc: 'We pursue the highest standards in academics, sports, and character development.' },
    { Icon: FaHandshake, title: 'Integrity', desc: 'We uphold honesty, fairness, and ethical behavior in all our interactions.' },
    { Icon: FaLightbulb, title: 'Innovation', desc: 'We embrace creative thinking and modern teaching methods to enhance learning.' },
    { Icon: FaGlobeAmericas, title: 'Community', desc: 'We foster a sense of belonging and encourage active community participation.' },
  ];

  return (
    <>
      <SEO {...SEOConfigs.about} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Page Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden">
          <img
            src={ABOUT_IMAGES.history}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Our School</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              About Harding Secondary
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white/90">
              A legacy of excellence in education, shaping futures since 1950
            </p>
          </div>
        </section>

        {/* Our Story — Split Layout */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <AnimateOnScroll animation="slide-right">
                <div>
                  <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Our Story</p>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-6 leading-tight">
                    Decades of Educational Excellence
                  </h2>
                  <div className="space-y-4 text-neutral-500 leading-relaxed">
                    <p>
                      Harding Secondary School stands as a beacon of educational excellence in KwaZulu-Natal.
                      As a distinguished public secondary school operating under the Ugu Education District,
                      we have been committed to nurturing young minds and building future leaders for over seven decades.
                    </p>
                    <p>
                      With our current enrollment of 1,252 learners supported by 41 dedicated educators,
                      we maintain an optimal learning environment that balances academic rigor with personal attention.
                    </p>
                    <p>
                      Located in the vibrant community of Harding, our school serves as more than just an educational
                      institution — we are a cornerstone of the community, fostering growth, development, and opportunity
                      for generations of learners.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slide-left">
                <div className="relative">
                  <img
                    src={HERO_IMAGES.campus}
                    alt="Harding Secondary School campus"
                    className="rounded-2xl w-full h-96 object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-primary-dark text-white rounded-2xl p-5 shadow-xl text-center">
                    <div className="text-3xl font-bold">1950</div>
                    <div className="text-sm text-white/90 mt-1">Established</div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Purpose & Direction</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Mission & Vision</h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <FaBullseye className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-dark mb-4">Our Mission</h3>
                  <p className="text-neutral-500 leading-relaxed">
                    To provide quality education that empowers learners with knowledge, skills, and values
                    necessary for success in the 21st century. We strive to create an inclusive learning
                    environment that nurtures academic excellence, personal growth, and social responsibility.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slide-right">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-dark">
                  <div className="w-14 h-14 bg-primary-dark/10 rounded-full flex items-center justify-center mb-6">
                    <FaLightbulb className="text-2xl text-primary-dark" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-dark mb-4">Our Vision</h3>
                  <p className="text-neutral-500 leading-relaxed">
                    To be a leading secondary school in South Africa, recognized for producing well-rounded,
                    confident, and capable individuals who contribute positively to society and excel in
                    their chosen fields of endeavor.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section id="values" className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What We Stand For</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Our Core Values</h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <AnimateOnScroll key={value.title} animation="slide-up" delay={index * 100}>
                  <div className="group bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-neutral-100 hover:border-primary">
                    <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                      <value.Icon className="text-2xl text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-primary-dark">{value.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{value.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section id="history" className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Milestones</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Our Journey</h2>
              </div>
            </AnimateOnScroll>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical connector */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary/20 hidden sm:block"
                style={{ left: '2.25rem' }}
                aria-hidden="true"
              />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <AnimateOnScroll key={item.year} animation="slide-right" delay={index * 100}>
                    <div className="flex items-start gap-6">
                      <div className="relative z-10 flex-shrink-0 w-18 h-18 bg-primary-dark text-white rounded-full flex flex-col items-center justify-center shadow-lg"
                        style={{ width: '4.5rem', height: '4.5rem' }}>
                        <span className="text-xs text-white/70 leading-none">Year</span>
                        <span className="text-sm font-bold">{item.year}</span>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm flex-1 hover:shadow-md transition-shadow duration-200 mt-1">
                        <p className="text-neutral-600 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats — Image Background */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img
            src={ABOUT_IMAGES.mission}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/88" />
          <div className="relative z-10 container-custom text-center text-white">
            <AnimateOnScroll animation="zoom-in">
              <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">By the Numbers</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold !text-white mb-14">
                Our Impact Today
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { end: 1252, suffix: '', label: 'Students' },
                  { end: 41, suffix: '', label: 'Educators' },
                  { end: 95, suffix: '%', label: 'Pass Rate' },
                  { end: 70, suffix: '+', label: 'Years' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-5xl md:text-6xl font-bold mb-2 !text-white">
                      <CounterAnimation end={stat.end} suffix={stat.suffix} className="!text-white" />
                    </div>
                    <p className="text-white/80 text-sm uppercase tracking-wider font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
