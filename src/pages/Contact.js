import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSchool, FaClock } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { NEWS_IMAGES } from '../utils/imageConstants';

const CONTACT_ITEMS = [
  {
    Icon: FaMapMarkerAlt,
    title: 'Address',
    content: (
      <p className="text-neutral-500 leading-relaxed text-sm">
        Harding Secondary School<br />
        Kirk Street, Harding, 4680<br />
        KwaZulu-Natal, South Africa
      </p>
    ),
  },
  {
    Icon: FaPhone,
    title: 'Phone',
    content: (
      <a
        href="tel:0394331223"
        className="text-primary font-semibold hover:text-primary-dark transition-colors text-sm"
      >
        039 433 1223
      </a>
    ),
  },
  {
    Icon: FaEnvelope,
    title: 'Email',
    content: (
      <a
        href="mailto:hardingsec@telkomsa.net"
        className="text-primary font-semibold hover:text-primary-dark transition-colors text-sm break-all"
      >
        hardingsec@telkomsa.net
      </a>
    ),
  },
  {
    Icon: FaSchool,
    title: 'School Details',
    content: (
      <div className="text-neutral-500 text-sm space-y-1">
        <p><span className="font-semibold text-neutral-700">Exam Number:</span> 5312210</p>
        <p><span className="font-semibold text-neutral-700">District:</span> Ugu</p>
        <p><span className="font-semibold text-neutral-700">Sector:</span> Public School</p>
      </div>
    ),
  },
];

const OFFICE_HOURS = [
  { day: 'Monday – Thursday', hours: '7:30 AM – 4:00 PM' },
  { day: 'Friday', hours: '7:30 AM – 3:00 PM' },
  { day: 'Weekends & Public Holidays', hours: 'Closed' },
];

const Contact = () => {
  return (
    <>
      <SEO {...SEOConfigs.contact} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Page Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden">
          <img
            src={NEWS_IMAGES.community}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Reach Out</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white/90">
              Get in touch with Harding Secondary School — we're here to help
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <AnimateOnScroll animation="fade-in">
                  <div className="mb-10">
                    <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Get in Touch</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                      We'd Love to Hear From You
                    </h2>
                  </div>
                </AnimateOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {CONTACT_ITEMS.map((item, index) => (
                    <AnimateOnScroll key={item.title} animation="slide-left" delay={index * 80}>
                      <div className="group bg-neutral-50 hover:bg-white p-6 rounded-2xl border border-neutral-200 hover:border-primary hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                            <item.Icon className="text-primary group-hover:text-white text-lg transition-colors duration-300" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-primary-dark mb-2">{item.title}</h3>
                            {item.content}
                          </div>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>

                {/* Office Hours */}
                <AnimateOnScroll animation="slide-up" delay={200}>
                  <div className="mt-6 bg-primary-dark text-white p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <FaClock className="text-accent-neon" />
                      </div>
                      <h3 className="text-lg font-bold">Office Hours</h3>
                    </div>
                    <div className="space-y-3">
                      {OFFICE_HOURS.map(({ day, hours }) => (
                        <div key={day} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                          <span className="text-white/80 text-sm">{day}</span>
                          <span className="font-semibold text-sm text-accent-neon">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>

              {/* Contact Form */}
              <AnimateOnScroll animation="slide-right" delay={100}>
                <div>
                  <ContactForm />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-10">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Location</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Find Us</h2>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slide-up">
              <div className="h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2616.664353518629!2d29.88457517443031!3d-30.571598655920482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5ee9ecb734163%3A0x51508346adc98662!2sKirk%20St%2C%20Harding%2C%204680!5e0!3m2!1sen!2sza!4v1763674351697!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  className="border-0 block"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Harding Secondary School Location"
                />
              </div>
              <div className="text-center mt-6">
                <a
                  href="https://www.google.com/maps/place/Kirk+St,+Harding,+4680"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary-dark text-white rounded-lg font-semibold transition-all duration-300 hover:bg-primary hover:scale-105 shadow-md"
                >
                  <FaMapMarkerAlt />
                  Open in Google Maps
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Quick Contact CTA */}
        <section className="pb-16 md:pb-20 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="zoom-in">
              <div className="bg-gradient-to-r from-primary-dark to-primary text-white p-10 md:p-16 rounded-2xl text-center shadow-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold !text-white mb-4">
                  Have Questions?
                </h2>
                <p className="text-white/85 mb-10 max-w-2xl mx-auto">
                  Our friendly staff is ready to assist with admissions, programs, or any other inquiries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:0394331223"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-dark font-bold rounded-lg transition-all duration-300 hover:bg-neutral-100 hover:scale-105 shadow-md"
                  >
                    <FaPhone />
                    Call: 039 433 1223
                  </a>
                  <a
                    href="mailto:info@hardingsecondary.edu.za"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-bold rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white"
                  >
                    <FaEnvelope />
                    Send Email
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
