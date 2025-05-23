// pages/About.js
import React from 'react';

const About = () => {
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

  const paragraphStyles = {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#666',
    marginBottom: '20px'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    marginTop: '40px'
  };

  const valueCardStyles = {
    backgroundColor: '#F9F9F9',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const iconStyles = {
    width: '80px',
    height: '80px',
    backgroundColor: '#19467E',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontSize: '36px',
    color: '#FFFFFF'
  };

  const timelineStyles = {
    position: 'relative',
    padding: '40px 0'
  };

  const timelineItemStyles = {
    display: 'flex',
    marginBottom: '40px',
    alignItems: 'center'
  };

  const timelineYearStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '700',
    marginRight: '30px',
    minWidth: '100px',
    textAlign: 'center'
  };

  return (
    <div style={pageStyles}>
      {/* Hero Section */}
      <section style={heroSectionStyles}>
        <div style={containerStyles}>
          <h1 style={headingStyles}>About Harding Secondary School</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
            A legacy of excellence in education, shaping futures since 1950
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={subHeadingStyles}>Our Story</h2>
        <div style={{ maxWidth: '800px' }}>
          <p style={paragraphStyles}>
            Harding Secondary School stands as a beacon of educational excellence in KwaZulu-Natal. 
            As a distinguished public secondary school operating under the Ugu Education District, 
            we have been committed to nurturing young minds and building future leaders for over seven decades.
          </p>
          <p style={paragraphStyles}>
            With our current enrollment of 1,252 learners supported by 41 dedicated educators, 
            we maintain an optimal learning environment that balances academic rigor with personal attention. 
            Our school has grown from humble beginnings to become one of the region's most respected educational institutions.
          </p>
          <p style={paragraphStyles}>
            Located in the vibrant community of Harding, our school serves as more than just an educational 
            institution – we are a cornerstone of the community, fostering growth, development, and opportunity 
            for generations of learners.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ backgroundColor: '#F9F9F9', ...sectionStyles }}>
        <div style={containerStyles}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px'
          }}>
            <div>
              <h3 style={{ ...subHeadingStyles, fontSize: '28px' }}>Our Mission</h3>
              <p style={paragraphStyles}>
                To provide quality education that empowers learners with knowledge, skills, and values 
                necessary for success in the 21st century. We strive to create an inclusive learning 
                environment that nurtures academic excellence, personal growth, and social responsibility.
              </p>
            </div>
            <div>
              <h3 style={{ ...subHeadingStyles, fontSize: '28px' }}>Our Vision</h3>
              <p style={paragraphStyles}>
                To be a leading secondary school in South Africa, recognized for producing well-rounded, 
                confident, and capable individuals who contribute positively to society and excel in 
                their chosen fields of endeavor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={subHeadingStyles}>Our Core Values</h2>
        <div style={gridStyles}>
          <div 
            style={valueCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={iconStyles}>🎯</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>Excellence</h3>
            <p style={{ color: '#666' }}>
              We pursue the highest standards in academics, sports, and character development.
            </p>
          </div>
          
          <div 
            style={valueCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={iconStyles}>🤝</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>Integrity</h3>
            <p style={{ color: '#666' }}>
              We uphold honesty, fairness, and ethical behavior in all our interactions.
            </p>
          </div>
          
          <div 
            style={valueCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={iconStyles}>💡</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>Innovation</h3>
            <p style={{ color: '#666' }}>
              We embrace creative thinking and modern teaching methods to enhance learning.
            </p>
          </div>
          
          <div 
            style={valueCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={iconStyles}>🌍</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>Community</h3>
            <p style={{ color: '#666' }}>
              We foster a sense of belonging and encourage active community participation.
            </p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section style={{ backgroundColor: '#F9F9F9', ...sectionStyles }}>
        <div style={containerStyles}>
          <h2 style={subHeadingStyles}>Our Journey</h2>
          <div style={timelineStyles}>
            <div style={timelineItemStyles}>
              <div style={timelineYearStyles}>1950</div>
              <p style={{ ...paragraphStyles, margin: 0 }}>
                Harding Secondary School founded to serve the educational needs of the local community
              </p>
            </div>
            <div style={timelineItemStyles}>
              <div style={timelineYearStyles}>1975</div>
              <p style={{ ...paragraphStyles, margin: 0 }}>
                Major expansion with new science laboratories and sports facilities
              </p>
            </div>
            <div style={timelineItemStyles}>
              <div style={timelineYearStyles}>1994</div>
              <p style={{ ...paragraphStyles, margin: 0 }}>
                Integration and transformation to serve all learners in the new South Africa
              </p>
            </div>
            <div style={timelineItemStyles}>
              <div style={timelineYearStyles}>2010</div>
              <p style={{ ...paragraphStyles, margin: 0 }}>
                Achieved consistent 90%+ matric pass rates and recognition for academic excellence
              </p>
            </div>
            <div style={timelineItemStyles}>
              <div style={timelineYearStyles}>2025</div>
              <p style={{ ...paragraphStyles, margin: 0 }}>
                Continuing our legacy with 1,252 learners and expanding digital learning initiatives
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;