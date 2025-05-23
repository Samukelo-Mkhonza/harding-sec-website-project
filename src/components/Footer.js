// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyles = {
    backgroundColor: '#0D3F2F',
    color: '#FFFFFF',
    marginTop: 'auto'
  };

  const topSectionStyles = {
    backgroundColor: '#19467E',
    padding: '60px 20px'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px'
  };

  const columnTitleStyles = {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#FFFFFF'
  };

  const linkStyles = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    display: 'block',
    padding: '5px 0',
    transition: 'color 0.3s ease'
  };

  const bottomSectionStyles = {
    backgroundColor: '#0D3F2F',
    padding: '30px 20px',
    textAlign: 'center',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const socialLinksStyles = {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  };

  const socialIconStyles = {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    textDecoration: 'none',
    transition: 'all 0.3s ease'
  };

  const newsletterFormStyles = {
    display: 'flex',
    marginTop: '20px',
    maxWidth: '400px'
  };

  const inputStyles = {
    flex: 1,
    padding: '12px 20px',
    border: 'none',
    borderRadius: '6px 0 0 6px',
    fontSize: '16px',
    fontFamily: "'Outfit', sans-serif"
  };

  const buttonStyles = {
    padding: '12px 30px',
    backgroundColor: '#FFFFFF',
    color: '#19467E',
    border: 'none',
    borderRadius: '0 6px 6px 0',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyles}>
      <div style={topSectionStyles}>
        <div style={containerStyles}>
          <div style={gridStyles}>
            {/* About Column */}
            <div>
              <h3 style={columnTitleStyles}>Harding Secondary School</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.8' }}>
                Excellence in education since 1950. Nurturing tomorrow's leaders 
                in the heart of KwaZulu-Natal with over 1,250 learners and 41 dedicated educators.
              </p>
              <div style={socialLinksStyles}>
                <a 
                  href="#" 
                  style={socialIconStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  f
                </a>
                <a 
                  href="#" 
                  style={socialIconStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  t
                </a>
                <a 
                  href="#" 
                  style={socialIconStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  in
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 style={columnTitleStyles}>Quick Links</h3>
              <Link 
                to="/about" 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                About Us
              </Link>
              <Link 
                to="/academics" 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                Academics
              </Link>
              <Link 
                to="/admissions" 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                Admissions
              </Link>
              <Link 
                to="/student-life" 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                Student Life
              </Link>
              <Link 
                to="/gallery" 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                Gallery
              </Link>
            </div>

            {/* Contact Info Column */}
            <div>
              <h3 style={columnTitleStyles}>Contact Information</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '10px' }}>
                <strong>Phone:</strong> 039 433 1223
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '10px' }}>
                <strong>Email:</strong> info@hardingsecondary.edu.za
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '10px' }}>
                <strong>Address:</strong> Harding, KwaZulu-Natal
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                <strong>Office Hours:</strong><br />
                Mon-Thu: 7:30 AM - 4:00 PM<br />
                Fri: 7:30 AM - 3:00 PM
              </p>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 style={columnTitleStyles}>Stay Connected</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}>
                Subscribe to our newsletter for updates and announcements.
              </p>
              <form style={newsletterFormStyles} onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing!');
              }}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required
                  style={inputStyles}
                />
                <button 
                  type="submit" 
                  style={buttonStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F0F0F0';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div style={bottomSectionStyles}>
        <div style={containerStyles}>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
            © {currentYear} Harding Secondary School. All rights reserved. | 
            <Link 
              to="/privacy" 
              style={{ ...linkStyles, display: 'inline', marginLeft: '10px' }}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              Privacy Policy
            </Link> | 
            <Link 
              to="/terms" 
              style={{ ...linkStyles, display: 'inline', marginLeft: '10px' }}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;