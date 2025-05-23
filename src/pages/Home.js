// pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Styles
  const sectionStyles = {
    padding: '80px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headingStyles = {
    fontSize: '48px',
    fontWeight: '800',
    color: '#19467E',
    marginBottom: '20px',
    textAlign: 'center'
  };

  const subHeadingStyles = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center'
  };

  const statsContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '60px'
  };

  const statCardStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  };

  const statNumberStyles = {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '10px'
  };

  const statLabelStyles = {
    fontSize: '18px',
    fontWeight: '500',
    opacity: 0.9
  };

  const featureGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    marginTop: '60px'
  };

  const featureCardStyles = {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '2px solid transparent'
  };

  const iconStyles = {
    width: '60px',
    height: '60px',
    backgroundColor: '#19467E',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#FFFFFF'
  };

  const ctaSectionStyles = {
    backgroundColor: '#F5F5F5',
    padding: '80px 20px',
    textAlign: 'center',
    marginTop: '80px'
  };

  const buttonStyles = {
    display: 'inline-block',
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '15px 40px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginTop: '20px'
  };

  return (
    <>
      <Hero images={heroImages} currentIndex={currentImageIndex} />
      
      {/* Welcome Section */}
      <section style={sectionStyles}>
        <h1 style={headingStyles}>Welcome to Harding Secondary School</h1>
        <p style={{
          fontSize: '20px',
          lineHeight: '1.8',
          color: '#666',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Harding Secondary School is a distinguished public institution located in the heart of KwaZulu-Natal. 
          With over 1,250 learners and 41 dedicated educators, we are committed to fostering academic excellence 
          and personal growth in a nurturing environment.
        </p>
        
        {/* Stats */}
        <div style={statsContainerStyles}>
          <div 
            style={statCardStyles}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={statNumberStyles}>1,252</div>
            <div style={statLabelStyles}>Students</div>
          </div>
          <div 
            style={statCardStyles}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={statNumberStyles}>41</div>
            <div style={statLabelStyles}>Qualified Teachers</div>
          </div>
          <div 
            style={statCardStyles}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={statNumberStyles}>95%</div>
            <div style={statLabelStyles}>Matric Pass Rate</div>
          </div>
          <div 
            style={statCardStyles}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={statNumberStyles}>70+</div>
            <div style={statLabelStyles}>Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ ...sectionStyles, backgroundColor: '#F9F9F9' }}>
        <h2 style={subHeadingStyles}>Why Choose Harding Secondary School?</h2>
        <div style={featureGridStyles}>
          <div 
            style={featureCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = '#19467E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={iconStyles}>📚</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
              Academic Excellence
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Comprehensive curriculum covering Sciences, Commerce, Humanities, and Technical subjects
              with exceptional matric results.
            </p>
          </div>
          
          <div 
            style={featureCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = '#19467E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={iconStyles}>🏃</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
              Sports & Activities
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Wide range of sporting codes and cultural activities to develop well-rounded individuals
              beyond the classroom.
            </p>
          </div>
          
          <div 
            style={featureCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = '#19467E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={iconStyles}>👥</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
              Dedicated Staff
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Our 41 qualified educators are passionate about nurturing each student's potential
              and preparing them for success.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section style={sectionStyles}>
        <h2 style={subHeadingStyles}>Latest News & Events</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          <article style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800" 
              alt="School event"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#19467E' }}>
                2025 Academic Year Begins
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                We welcome all learners back for another exciting year of learning and growth.
              </p>
              <span style={{ color: '#19467E', fontWeight: '600' }}>January 15, 2025</span>
            </div>
          </article>
          
          <article style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800" 
              alt="Matric results"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#19467E' }}>
                Outstanding Matric Results
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                Celebrating our Class of 2024 with a 95% pass rate and numerous distinctions.
              </p>
              <span style={{ color: '#19467E', fontWeight: '600' }}>January 10, 2025</span>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSectionStyles}>
        <h2 style={{ ...headingStyles, marginBottom: '20px' }}>
          Begin Your Journey With Us
        </h2>
        <p style={{
          fontSize: '20px',
          color: '#666',
          marginBottom: '30px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Join our community of learners and discover your potential at Harding Secondary School.
        </p>
        <Link 
          to="/admissions" 
          style={buttonStyles}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0D3F2F';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#19467E';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Apply Now
        </Link>
      </section>
    </>
  );
};

export default Home;