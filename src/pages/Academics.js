// pages/Academics.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO, SEOConfigs } from '../components';

const Academics = () => {
  const [activeTab, setActiveTab] = useState('sciences');

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

  const tabContainerStyles = {
    display: 'flex',
    gap: '10px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  const tabStyles = (isActive) => ({
    padding: '12px 24px',
    backgroundColor: isActive ? '#19467E' : '#F0F0F0',
    color: isActive ? '#FFFFFF' : '#666',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  const subjectGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  };

  const subjectCardStyles = {
    backgroundColor: '#F9F9F9',
    padding: '25px',
    borderRadius: '8px',
    borderLeft: '4px solid #19467E',
    transition: 'all 0.3s ease'
  };

  const curriculumBoxStyles = {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '40px'
  };

  const featureStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px'
  };

  const featureCardStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'transform 0.3s ease'
  };

  const subjects = {
    sciences: {
      title: 'Physical, Mathematical & Life Sciences',
      items: [
        'Mathematics',
        'Mathematical Literacy',
        'Physical Sciences (Physics & Chemistry)',
        'Life Sciences (Biology)',
        'Computer Applications Technology',
        'Information Technology',
        'Agricultural Sciences'
      ]
    },
    commerce: {
      title: 'Business, Commerce & Management',
      items: [
        'Business Studies',
        'Economics',
        'Accounting',
        'Consumer Studies',
        'Tourism'
      ]
    },
    humanities: {
      title: 'Humanities & Languages',
      items: [
        'History',
        'Geography',
        'Religion Studies',
        'Music',
        'Visual Arts',
        'Dramatic Arts',
        'Additional Languages'
      ]
    },
    technical: {
      title: 'Technical & Vocational',
      items: [
        'Engineering Graphics & Design',
        'Civil Technology',
        'Electrical Technology',
        'Mechanical Technology',
        'Hospitality Studies',
        'Agricultural Technology'
      ]
    }
  };

  return (
    <>
      <SEO {...SEOConfigs.academics} />
      <div style={pageStyles}>
        {/* Hero Section */}
      <section style={heroSectionStyles}>
        <div style={containerStyles}>
          <h1 style={headingStyles}>Academic Excellence</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
            Comprehensive curriculum designed to unlock every learner's potential
          </p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={subHeadingStyles}>Our Curriculum</h2>
        <div style={curriculumBoxStyles}>
          <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#19467E' }}>
            National Senior Certificate (NSC)
          </h3>
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666' }}>
            Harding Secondary School follows the South African National Curriculum (CAPS) for Grades 8-12. 
            Our comprehensive academic program prepares learners for the National Senior Certificate examination 
            and equips them with the knowledge and skills needed for tertiary education and future careers.
          </p>
        </div>

        {/* Subject Streams */}
        <h3 style={{ fontSize: '28px', marginBottom: '30px', color: '#19467E' }}>
          Subject Streams
        </h3>
        <div style={tabContainerStyles}>
          {Object.keys(subjects).map((key) => (
            <button
              key={key}
              style={tabStyles(activeTab === key)}
              onClick={() => setActiveTab(key)}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.target.style.backgroundColor = '#E0E0E0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.target.style.backgroundColor = '#F0F0F0';
                }
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            {subjects[activeTab].title}
          </h4>
          <div style={subjectGridStyles}>
            {subjects[activeTab].items.map((subject, index) => (
              <div 
                key={index} 
                style={subjectCardStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h5 style={{ fontSize: '18px', margin: 0, color: '#19467E' }}>{subject}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Features */}
      <section style={{ backgroundColor: '#F9F9F9', ...sectionStyles }}>
        <div style={containerStyles}>
          <h2 style={subHeadingStyles}>Academic Support & Resources</h2>
          
          {/* Past Papers Portal Highlight */}
          <div style={{ 
            backgroundColor: '#19467E', 
            color: '#FFFFFF', 
            padding: '40px', 
            borderRadius: '12px', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📚</div>
            <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>Past Papers Portal</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '25px', maxWidth: '700px', margin: '0 auto 25px' }}>
              Access our comprehensive collection of past examination papers across all subjects and grades. 
              Perfect for exam preparation and practice.
            </p>
            <Link 
              to="/past-papers"
              style={{
                display: 'inline-block',
                backgroundColor: '#00A651',
                color: '#FFFFFF',
                padding: '15px 40px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#008A43';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#00A651';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Access Past Papers
            </Link>
          </div>

          <div style={featureStyles}>
            <div 
              style={featureCardStyles}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📖</div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Extra Classes</h3>
              <p style={{ lineHeight: '1.6' }}>
                Additional support in Mathematics, Sciences, and Languages for Grade 10-12 learners
              </p>
            </div>
            
            <div 
              style={featureCardStyles}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏛️</div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Modern Facilities</h3>
              <p style={{ lineHeight: '1.6' }}>
                Well-equipped science laboratories, computer labs, and a comprehensive library
              </p>
            </div>
            
            <div 
              style={featureCardStyles}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎓</div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Career Guidance</h3>
              <p style={{ lineHeight: '1.6' }}>
                Comprehensive career counseling and university application support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Achievements */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={subHeadingStyles}>Academic Achievements</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#19467E',
              marginBottom: '10px' 
            }}>95%</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Matric Pass Rate</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#19467E',
              marginBottom: '10px' 
            }}>67%</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Bachelor's Pass</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#19467E',
              marginBottom: '10px' 
            }}>150+</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Distinctions Annually</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#19467E',
              marginBottom: '10px' 
            }}>12</div>
            <p style={{ fontSize: '18px', color: '#666' }}>Top Achievers Awards</p>
          </div>
        </div>
      </section>

      {/* Grade Structure */}
      <section style={{ backgroundColor: '#F9F9F9', ...sectionStyles }}>
        <div style={containerStyles}>
          <h2 style={subHeadingStyles}>Grade Structure</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div style={curriculumBoxStyles}>
              <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#19467E' }}>
                Junior Phase (Grades 8-9)
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#666' }}>
                Foundation years focusing on core subjects with exposure to various learning areas 
                to help learners make informed subject choices.
              </p>
            </div>
            <div style={curriculumBoxStyles}>
              <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#19467E' }}>
                Senior Phase (Grades 10-12)
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#666' }}>
                Specialized subject selection preparing learners for the National Senior Certificate 
                and post-school opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Academics;