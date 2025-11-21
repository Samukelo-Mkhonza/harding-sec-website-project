// pages/Contact.js
import React from 'react';
import ContactForm from '../components/ContactForm';
import { SEO, SEOConfigs } from '../components';

const Contact = () => {
  return (
    <>
      <SEO {...SEOConfigs.contact} />
      <div className="pt-0">
        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-16 md:py-20 lg:py-24 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Get in touch with Harding Secondary School
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
                  Get In Touch
                </h2>
                <div className="bg-neutral-50 p-6 md:p-8 lg:p-10 rounded-xl space-y-6 md:space-y-8">
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-neon text-white rounded-full flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-black">
                        Address
                      </h3>
                      <p className="text-neutral-500 leading-relaxed">
                        Harding Secondary School<br />
                        Harding<br />
                        KwaZulu-Natal, South Africa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-neon text-white rounded-full flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-black">
                        Phone
                      </h3>
                      <p className="text-neutral-500">
                        <a href="tel:0394331223" className="text-accent-neon hover:text-primary transition-colors">
                          039 433 1223
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-neon text-white rounded-full flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-black">
                        Email
                      </h3>
                      <p className="text-neutral-500">
                        <a href="mailto:info@hardingsecondary.edu.za" className="text-accent-neon hover:text-primary transition-colors break-all">
                          info@hardingsecondary.edu.za
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-neon text-white rounded-full flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
                      🏫
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-black">
                        School Details
                      </h3>
                      <p className="text-neutral-500 leading-relaxed">
                        Exam Number: 5312210<br />
                        Education District: Ugu<br />
                        Sector: Public School
                      </p>
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
            <div className="bg-primary-dark text-white p-8 md:p-12 lg:p-16 rounded-xl text-center mt-12 md:mt-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-8 md:mb-10">
                Office Hours
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">
                    Monday - Thursday
                  </h3>
                  <p className="text-base md:text-lg">7:30 AM - 4:00 PM</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">
                    Friday
                  </h3>
                  <p className="text-base md:text-lg">7:30 AM - 3:00 PM</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">
                    Weekends
                  </h3>
                  <p className="text-base md:text-lg">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-8 md:mb-12 text-center">
              Find Us
            </h2>
            <div className="h-64 md:h-96 lg:h-[450px] rounded-xl overflow-hidden shadow-lg relative">
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
            <div className="text-center mt-6 md:mt-8 p-4 md:p-6 bg-white rounded-lg shadow-sm">
              <p className="text-neutral-500 text-sm md:text-base mb-4">
                <i className="fas fa-directions mr-2 text-accent-neon"></i>
                Click on the map to get directions
              </p>
              <a
                href="https://www.google.com/maps/place/Kirk+St,+Harding,+4680/@-30.5715987,29.8845752,17z/data=!3m1!4b1!4m6!3m5!1s0x1ef5ee9ecb734163:0x51508346adc98662!8m2!3d-30.5715987!4d29.8871501!16s%2Fg%2F11c5q3y3y3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 md:px-8 py-3 md:py-4 bg-primary-dark text-white rounded-lg text-sm md:text-base font-semibold transition-all duration-300 hover:bg-primary hover:scale-105"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;