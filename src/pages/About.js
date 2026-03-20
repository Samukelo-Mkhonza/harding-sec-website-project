// pages/About.js
import { FaBullseye, FaHandshake, FaLightbulb, FaGlobeAmericas } from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';

const About = () => {
  return (
    <>
      <SEO {...SEOConfigs.about} />
      <div>
        {/* Breadcrumbs */}
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-16 md:py-20 lg:py-24 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 !text-white text-shadow-strong">
              About Harding Secondary School
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white text-shadow-strong">
              A legacy of excellence in education, shaping futures since 1950
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 lg:py-28">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
                Our Story
              </h2>
            </AnimateOnScroll>
            <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
              <AnimateOnScroll animation="fade-in" delay={100}>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                  Harding Secondary School stands as a beacon of educational excellence in KwaZulu-Natal.
                  As a distinguished public secondary school operating under the Ugu Education District,
                  we have been committed to nurturing young minds and building future leaders for over seven decades.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-in" delay={200}>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                  With our current enrollment of 1,252 learners supported by 41 dedicated educators,
                  we maintain an optimal learning environment that balances academic rigor with personal attention.
                  Our school has grown from humble beginnings to become one of the region's most respected educational institutions.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-in" delay={300}>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                  Located in the vibrant community of Harding, our school serves as more than just an educational
                  institution – we are a cornerstone of the community, fostering growth, development, and opportunity
                  for generations of learners.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="py-16 md:py-24 lg:py-28 bg-neutral-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl shadow-md border-l-4 border-primary-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-5 md:mb-6">
                    Our Mission
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                    To provide quality education that empowers learners with knowledge, skills, and values
                    necessary for success in the 21st century. We strive to create an inclusive learning
                    environment that nurtures academic excellence, personal growth, and social responsibility.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slide-right">
                <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl shadow-md border-l-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{ borderLeftColor: '#0D4E25' }}>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-5 md:mb-6">
                    Our Vision
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-500">
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
        <section id="values" className="py-16 md:py-24 lg:py-28">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12 text-center">
                Our Core Values
              </h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { Icon: FaBullseye, title: 'Excellence', desc: 'We pursue the highest standards in academics, sports, and character development.' },
                { Icon: FaHandshake, title: 'Integrity', desc: 'We uphold honesty, fairness, and ethical behavior in all our interactions.' },
                { Icon: FaLightbulb, title: 'Innovation', desc: 'We embrace creative thinking and modern teaching methods to enhance learning.' },
                { Icon: FaGlobeAmericas, title: 'Community', desc: 'We foster a sense of belonging and encourage active community participation.' },
              ].map((value, index) => (
                <AnimateOnScroll key={value.title} animation="slide-up" delay={index * 100}>
                  <div className="bg-white p-8 md:p-10 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-primary-dark">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 transition-all duration-300 hover:scale-110">
                      <value.Icon className="text-3xl md:text-4xl text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">{value.title}</h3>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section id="history" className="py-16 md:py-24 lg:py-28 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12 text-center">
                Our Journey
              </h2>
            </AnimateOnScroll>
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              {[
                { year: '1950', text: 'Harding Secondary School founded to serve the educational needs of the local community' },
                { year: '1975', text: 'Major expansion with new science laboratories and sports facilities' },
                { year: '1994', text: 'Integration and transformation to serve all learners in the new South Africa' },
                { year: '2010', text: 'Achieved consistent 90%+ matric pass rates and recognition for academic excellence' },
                { year: '2025', text: 'Continuing our legacy with 1,252 learners and expanding digital learning initiatives' },
              ].map((item, index) => (
                <AnimateOnScroll key={item.year} animation="slide-right" delay={index * 100}>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-x-2">
                    <div className="bg-primary-dark text-white px-6 py-4 rounded-lg font-bold text-lg md:text-xl min-w-[100px] md:min-w-[120px] text-center flex-shrink-0 shadow-md">
                      {item.year}
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-neutral-500 flex-1">
                      {item.text}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 md:py-24 lg:py-28">
          <div className="container-custom">
            <AnimateOnScroll animation="zoom-in">
              <div className="bg-primary-dark text-white p-8 md:p-12 lg:p-16 rounded-xl text-center shadow-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-8 md:mb-10 !text-white">
                  Our Impact Today
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {[
                    { end: 1252, suffix: '', label: 'Students' },
                    { end: 41, suffix: '', label: 'Educators' },
                    { end: 95, suffix: '%', label: 'Pass Rate' },
                    { end: 70, suffix: '+', label: 'Years' },
                  ].map((stat) => (
                    <div key={stat.label} className="transition-all duration-300 hover:scale-110">
                      <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 !text-white">
                        <CounterAnimation end={stat.end} suffix={stat.suffix} className="!text-white" />
                      </div>
                      <p className="text-base md:text-lg !text-white">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
