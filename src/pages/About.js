// pages/About.js
import { FaBullseye, FaHandshake, FaLightbulb, FaGlobeAmericas } from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';

const About = () => {
  return (
    <>
      <SEO {...SEOConfigs.about} />
      <div className="pt-[3.75rem] md:pt-[4.25rem]">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
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
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
              Our Story
            </h2>
            <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                Harding Secondary School stands as a beacon of educational excellence in KwaZulu-Natal. 
                As a distinguished public secondary school operating under the Ugu Education District, 
                we have been committed to nurturing young minds and building future leaders for over seven decades.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                With our current enrollment of 1,252 learners supported by 41 dedicated educators, 
                we maintain an optimal learning environment that balances academic rigor with personal attention. 
                Our school has grown from humble beginnings to become one of the region's most respected educational institutions.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                Located in the vibrant community of Harding, our school serves as more than just an educational 
                institution – we are a cornerstone of the community, fostering growth, development, and opportunity 
                for generations of learners.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl shadow-md border-l-4 border-primary-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-5 md:mb-6">
                  Our Mission
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                  To provide quality education that empowers learners with knowledge, skills, and values 
                  necessary for success in the 21st century. We strive to create an inclusive learning 
                  environment that nurtures academic excellence, personal growth, and social responsibility.
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl shadow-md border-l-4 border-accent-neon transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-5 md:mb-6">
                  Our Vision
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500">
                  To be a leading secondary school in South Africa, recognized for producing well-rounded, 
                  confident, and capable individuals who contribute positively to society and excel in 
                  their chosen fields of endeavor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-white p-8 md:p-10 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-primary-dark">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 transition-all duration-300 hover:scale-110">
                  <FaBullseye className="text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">Excellence</h3>
                <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                  We pursue the highest standards in academics, sports, and character development.
                </p>
              </div>
              
              <div className="bg-white p-8 md:p-10 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-primary-dark">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 transition-all duration-300 hover:scale-110">
                  <FaHandshake className="text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">Integrity</h3>
                <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                  We uphold honesty, fairness, and ethical behavior in all our interactions.
                </p>
              </div>
              
              <div className="bg-white p-8 md:p-10 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-primary-dark">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 transition-all duration-300 hover:scale-110">
                  <FaLightbulb className="text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">Innovation</h3>
                <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                  We embrace creative thinking and modern teaching methods to enhance learning.
                </p>
              </div>
              
              <div className="bg-white p-8 md:p-10 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-primary-dark">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 transition-all duration-300 hover:scale-110">
                  <FaGlobeAmericas className="text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">Community</h3>
                <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                  We foster a sense of belonging and encourage active community participation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12 text-center">
              Our Journey
            </h2>
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-x-2">
                <div className="bg-primary-dark text-white px-6 py-4 rounded-lg font-bold text-lg md:text-xl min-w-[100px] md:min-w-[120px] text-center flex-shrink-0 shadow-md">
                  1950
                </div>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500 flex-1">
                  Harding Secondary School founded to serve the educational needs of the local community
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-x-2">
                <div className="bg-primary-dark text-white px-6 py-4 rounded-lg font-bold text-lg md:text-xl min-w-[100px] md:min-w-[120px] text-center flex-shrink-0 shadow-md">
                  1975
                </div>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500 flex-1">
                  Major expansion with new science laboratories and sports facilities
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-x-2">
                <div className="bg-primary-dark text-white px-6 py-4 rounded-lg font-bold text-lg md:text-xl min-w-[100px] md:min-w-[120px] text-center flex-shrink-0 shadow-md">
                  1994
                </div>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500 flex-1">
                  Integration and transformation to serve all learners in the new South Africa
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-x-2">
                <div className="bg-primary-dark text-white px-6 py-4 rounded-lg font-bold text-lg md:text-xl min-w-[100px] md:min-w-[120px] text-center flex-shrink-0 shadow-md">
                  2010
                </div>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500 flex-1">
                  Achieved consistent 90%+ matric pass rates and recognition for academic excellence
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white p-6 md:p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-x-2">
                <div className="bg-accent-neon text-white px-6 py-4 rounded-lg font-bold text-lg md:text-xl min-w-[100px] md:min-w-[120px] text-center flex-shrink-0 shadow-md">
                  2025
                </div>
                <p className="text-base md:text-lg leading-relaxed text-neutral-500 flex-1">
                  Continuing our legacy with 1,252 learners and expanding digital learning initiatives
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-primary-dark text-white p-8 md:p-12 lg:p-16 rounded-xl text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-8 md:mb-10">
                Our Impact Today
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div className="transition-all duration-300 hover:scale-110">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">1,252</div>
                  <p className="text-base md:text-lg opacity-90">Students</p>
                </div>
                <div className="transition-all duration-300 hover:scale-110">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">41</div>
                  <p className="text-base md:text-lg opacity-90">Educators</p>
                </div>
                <div className="transition-all duration-300 hover:scale-110">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">95%</div>
                  <p className="text-base md:text-lg opacity-90">Pass Rate</p>
                </div>
                <div className="transition-all duration-300 hover:scale-110">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3">70+</div>
                  <p className="text-base md:text-lg opacity-90">Years</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;