// pages/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

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

  const formStyles = {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  };

  const inputStyles = {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    border: '2px solid #E0E0E0',
    borderRadius: '6px',
    fontSize: '16px',
    fontFamily: "'Outfit', sans-serif",
    transition: 'border-color 0.3s ease'
  };

  const textareaStyles = {
    ...inputStyles,
    minHeight: '150px',
    resize: 'vertical'
  };

  const buttonStyles = {
    width: '100%',
    padding: '15px',
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
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
            <h2 style={{ ...subHeadingStyles, fontSize: '28px' }}>Send Us a Message</h2>
            <form style={formStyles} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyles}
                onFocus={(e) => e.target.style.borderColor = '#19467E'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
              />
              
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyles}
                onFocus={(e) => e.target.style.borderColor = '#19467E'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyles}
                onFocus={(e) => e.target.style.borderColor = '#19467E'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
              />
              
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={inputStyles}
                onFocus={(e) => e.target.style.borderColor = '#19467E'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
              >
                <option value="">Select Subject</option>
                <option value="admissions">Admissions Inquiry</option>
                <option value="academic">Academic Information</option>
                <option value="general">General Inquiry</option>
                <option value="other">Other</option>
              </select>
              
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                style={textareaStyles}
                onFocus={(e) => e.target.style.borderColor = '#19467E'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
              />
              
              <button 
                type="submit" 
                style={buttonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#0D3F2F';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#19467E';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Send Message
              </button>
            </form>
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
            backgroundColor: '#E0E0E0',
            height: '400px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '18px'
          }}>
            <p>Map placeholder - Integrate with Google Maps API</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;