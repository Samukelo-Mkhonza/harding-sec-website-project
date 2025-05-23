import React from 'react';

function InfoSection() {
  // Inline style objects
  const infoSectionStyle = {
    padding: '3rem 1rem',
    backgroundColor: '#ffffff',
    color: '#000000',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#00ff00',
    fontSize: '2rem',
    marginBottom: '1rem',
  };

  const paragraphStyle = {
    maxWidth: '700px',
    margin: '0 auto',
  };

  const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const infoCardStyle = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '1.5rem',
    borderRadius: '4px',
  };

  const subHeadingStyle = {
    color: '#00ff00',
    marginBottom: '0.5rem',
  };

  return (
    <section style={infoSectionStyle} id="info">
      <h3 style={headingStyle}>About Our School</h3>
      <p style={paragraphStyle}>
        Our school provides top-notch education and a nurturing environment
        for students to explore their talents, excel academically, and
        develop into responsible citizens.
      </p>
      <div style={infoGridStyle}>
        <div style={infoCardStyle}>
          <h4 style={subHeadingStyle}>Our Mission</h4>
          <p>To foster critical thinking, creativity, and leadership among students.</p>
        </div>
        <div style={infoCardStyle}>
          <h4 style={subHeadingStyle}>Our Values</h4>
          <p>Integrity, Collaboration, Excellence, and Innovation.</p>
        </div>
        <div style={infoCardStyle}>
          <h4 style={subHeadingStyle}>Our Vision</h4>
          <p>Empowering every student to become a global leader of tomorrow.</p>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
