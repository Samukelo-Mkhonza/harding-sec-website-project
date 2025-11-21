// pages/Contact.js
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSchool } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';

const Contact = () => {
  return (
    <>
      <SEO {...SEOConfigs.contact} />
      <div className="pt-[3.75rem] md:pt-[4.25rem]">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-16 md:py-20 lg:py-24 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 !text-white text-shadow-strong">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white text-shadow-strong">
              Get in touch with Harding Secondary School
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
                  Get In Touch
                </h2>
                <div className="space-y-5 md:space-y-6">
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-l-4 border-accent-neon transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-neon text-white rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110">
                        <FaMapMarkerAlt className="text-xl md:text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary-dark">
                          Address
                        </h3>
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                          Harding Secondary School<br />
                          Harding<br />
                          KwaZulu-Natal, South Africa
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-l-4 border-accent-neon transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-neon text-white rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110">
                        <FaPhone className="text-xl md:text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary-dark">
                          Phone
                        </h3>
                        <p className="text-sm md:text-base text-neutral-500">
                          <a href="tel:0394331223" className="text-accent-neon hover:text-primary-dark transition-colors font-medium hover:underline">
                            039 433 1223
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-l-4 border-accent-neon transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-neon text-white rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110">
                        <FaEnvelope className="text-xl md:text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary-dark">
                          Email
                        </h3>
                        <p className="text-sm md:text-base text-neutral-500">
                          <a href="mailto:info@hardingsecondary.edu.za" className="text-accent-neon hover:text-primary-dark transition-colors font-medium hover:underline break-all">
                            info@hardingsecondary.edu.za
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-l-4 border-primary-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-dark text-white rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110">
                        <FaSchool className="text-xl md:text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary-dark">
                          School Details
                        </h3>
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                          <strong>Exam Number:</strong> 5312210<br />
                          <strong>Education District:</strong> Ugu<br />
                          <strong>Sector:</strong> Public School
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-primary-dark text-white p-8 md:p-12 lg:p-16 rounded-xl text-center mt-12 md:mt-16 shadow-xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-8 md:mb-10 !text-white">
                Office Hours
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                <div className="transition-all duration-300 hover:scale-105">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 !text-white">
                    Monday - Thursday
                  </h3>
                  <p className="text-base md:text-lg opacity-90 !text-white">7:30 AM - 4:00 PM</p>
                </div>
                <div className="transition-all duration-300 hover:scale-105">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 !text-white">
                    Friday
                  </h3>
                  <p className="text-base md:text-lg opacity-90 !text-white">7:30 AM - 3:00 PM</p>
                </div>
                <div className="transition-all duration-300 hover:scale-105">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 !text-white">
                    Weekends
                  </h3>
                  <p className="text-base md:text-lg opacity-90 !text-white">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12 text-center">
              Find Us
            </h2>
            <div className="h-64 md:h-96 lg:h-[450px] rounded-xl overflow-hidden shadow-xl relative transition-all duration-300 hover:shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2616.664353518629!2d29.88457517443031!3d-30.571598655920482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5ee9ecb734163%3A0x51508346adc98662!2sKirk%20St%2C%20Harding%2C%204680!5e0!3m2!1sen!2sza!4v1763674351697!5m2!1sen!2sza"
                width="100%"
                height="100%"
                className="border-0 block"
                allowFullScreen=""
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title="Harding Secondary School Location"
              />
            </div>
            <div className="text-center mt-6 md:mt-8 p-6 md:p-8 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
              <p className="text-neutral-500 text-sm md:text-base mb-5 md:mb-6 flex items-center justify-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-neon/10 rounded-full">
                  <FaMapMarkerAlt className="text-accent-neon text-sm" />
                </span>
                Click on the map to get directions
              </p>
              <a
                href="https://www.google.com/maps/place/Kirk+St,+Harding,+4680/@-30.5715987,29.8845752,17z/data=!3m1!4b1!4m6!3m5!1s0x1ef5ee9ecb734163:0x51508346adc98662!8m2!3d-30.5715987!4d29.8871501!16s%2Fg%2F11c5q3y3y3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-primary-dark text-white rounded-lg text-sm md:text-base font-semibold transition-all duration-300 hover:bg-primary hover:scale-105 shadow-md hover:shadow-lg"
              >
                <FaMapMarkerAlt />
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Quick Contact CTA */}
        <section className="pb-16 md:pb-20">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary-dark to-primary text-white p-8 md:p-12 lg:p-16 rounded-xl text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-5 md:mb-6 !text-white">
                Have Questions?
              </h2>
              <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-3xl mx-auto opacity-90 !text-white">
                Our friendly staff is ready to assist you with admissions, programs, or any other inquiries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:0394331223" 
                  className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-white text-primary-dark rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:bg-neutral-100 hover:scale-105 shadow-md"
                >
                  <FaPhone />
                  Call: 039 433 1223
                </a>
                <a 
                  href="mailto:info@hardingsecondary.edu.za" 
                  className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-accent-neon text-white rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:bg-accent-neon/90 hover:scale-105 shadow-md"
                >
                  <FaEnvelope />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;