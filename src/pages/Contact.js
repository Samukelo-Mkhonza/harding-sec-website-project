// pages/Contact.js
import React from 'react';
import ContactForm from '../components/ContactForm';
import { SEO, SEOConfigs } from '../components';

const Contact = () => {

  const pageStyles = {
    paddingTop: '40px'
  };

  const heroSectionStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '80px 20px',
    textAlign: 'center'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const sectionStyles = {
    padding: '80px 20px'
  };

  const headingStyles = {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '20px'
  };

  const subHeadingStyles = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#19467E',
    marginBottom: '30px'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '60px',
    marginTop: '60px'
  };

  const contactInfoStyles = {
    backgroundColor: '#F9F9F9',
    padding: '40px',
    borderRadius: '12px'
  };

  const infoItemStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '30px'
  };

  const iconStyles = {
    width: '50px',
    height: '50px',
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    fontSize: '20px',
    flexShrink: 0
  };

  const mapSectionStyles = {
    backgroundColor: '#F9F9F9',
    padding: '80px 20px'
  };

  const officeHoursStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '60px',
    borderRadius: '12px',
    textAlign: 'center',
    marginTop: '60px'
  };

  return (
    <>
      <SEO {...SEOConfigs.contact} />
      <div style={pageStyles}>
        {/* Hero Section */}
      <section style={heroSectionStyles}>
        <div style={containerStyles}>
          <h1 style={headingStyles}>Contact Us</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
            Get in touch with Harding Secondary School
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <div style={gridStyles}>
          {/* Contact Information */}
          <div>
            <h2 style={{ ...subHeadingStyles, fontSize: '28px' }}>Get In Touch</h2>
            <div style={contactInfoStyles}>
              <div style={infoItemStyles}>
                <div style={iconStyles}>📍</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
                    Address
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Harding Secondary School<br />
                    Harding<br />
                    KwaZulu-Natal, South Africa
                  </p>
                </div>
              </div>

              <div style={infoItemStyles}>
                <div style={iconStyles}>📞</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
                    Phone
                  </h3>
                  <p style={{ color: '#666' }}>
                    <a href="tel:0394331223" style={{ color: '#19467E', textDecoration: 'none' }}>
                      039 433 1223
                    </a>
                  </p>
                </div>
              </div>

              <div style={infoItemStyles}>
                <div style={iconStyles}>✉️</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
                    Email
                  </h3>
                  <p style={{ color: '#666' }}>
                    <a href="mailto:info@hardingsecondary.edu.za" style={{ color: '#19467E', textDecoration: 'none' }}>
                      info@hardingsecondary.edu.za
                    </a>
                  </p>
                </div>
              </div>

              <div style={infoItemStyles}>
                <div style={iconStyles}>🏫</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
                    School Details
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
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
        <div style={officeHoursStyles}>
          <h2 style={{ fontSize: '36px', marginBottom: '30px' }}>Office Hours</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Monday - Thursday</h3>
              <p style={{ fontSize: '18px' }}>7:30 AM - 4:00 PM</p>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Friday</h3>
              <p style={{ fontSize: '18px' }}>7:30 AM - 3:00 PM</p>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Weekends</h3>
              <p style={{ fontSize: '18px' }}>Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={mapSectionStyles}>
        <div style={containerStyles}>
          <h2 style={{ ...subHeadingStyles, textAlign: 'center' }}>Find Us</h2>
          <div style={{
            height: '450px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2616.664353518629!2d29.88457517443031!3d-30.571598655920482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5ee9ecb734163%3A0x51508346adc98662!2sKirk%20St%2C%20Harding%2C%204680!5e0!3m2!1sen!2sza!4v1763674351697!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title="Harding Secondary School Location"
            />
          </div>
          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '15px' }}>
              <i className="fas fa-directions" style={{ marginRight: '10px', color: '#19467E' }}></i>
              Click on the map to get directions
            </p>
            <a
              href="https://www.google.com/maps/place/Kirk+St,+Harding,+4680/@-30.5715987,29.8845752,17z/data=!3m1!4b1!4m6!3m5!1s0x1ef5ee9ecb734163:0x51508346adc98662!8m2!3d-30.5715987!4d29.8871501!16s%2Fg%2F11c5q3y3y3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: '#19467E',
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0D3F2F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#19467E'}
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