// pages/StudentLife.js
import React from 'react';

const StudentLife = () => {
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

  const activityGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    marginTop: '40px'
  };

  const activityCardStyles = {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease'
  };

  const activityImageStyles = {
    width: '100%',
    height: '250px',
    objectFit: 'cover'
  };

  const activityContentStyles = {
    padding: '30px'
  };

  const clubsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '40px'
  };

  const clubCardStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const timelineStyles = {
    maxWidth: '800px',
    margin: '40px auto'
  };

  const eventStyles = {
    display: 'flex',
    marginBottom: '40px',
    alignItems: 'flex-start'
  };

  const dateBoxStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '120px',
    textAlign: 'center',
    marginRight: '30px'
  };

  const eventContentStyles = {
    backgroundColor: '#F9F9F9',
    padding: '30px',
    borderRadius: '12px',
    flex: 1
  };

  const activitiesData = [
    {
      title: 'Sports Programs',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      description: 'Soccer, rugby, netball, athletics, and more. Our sports programs develop teamwork, discipline, and healthy competition.'
    },
    {
      title: 'Cultural Activities',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      description: 'Drama, music, dance, and debate societies that nurture creativity and self-expression.'
    },
    {
      title: 'Academic Clubs',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      description: 'Science club, mathematics olympiad, computer club, and reading clubs for academic enrichment.'
    }
  ];

  const clubs = [
    { name: 'Debate Society', icon: '💬' },
    { name: 'Science Club', icon: '🔬' },
    { name: 'Drama Club', icon: '🎭' },
    { name: 'Music Society', icon: '🎵' },
    { name: 'Environmental Club', icon: '🌱' },
    { name: 'Photography Club', icon: '📷' },
    { name: 'Chess Club', icon: '♟️' },
    { name: 'First Aid Club', icon: '🏥' }
  ];

  const events = [
    {
      month: 'MAR',
      day: '15',
      title: 'Annual Sports Day',
      description: 'A day of athletic competition and team spirit'
    },
    {
      month: 'MAY',
      day: '20',
      title: 'Cultural Festival',
      description: 'Celebrating diversity through music, dance, and food'
    },
    {
      month: 'AUG',
      day: '10',
      title: 'Science Fair',
      description: 'Students showcase innovative science projects'
    },
    {
      month: 'OCT',
      day: '25',
      title: 'Awards Ceremony',
      description: 'Recognizing academic and extracurricular excellence'
    }
  ];

  return (
    <div style={pageStyles}>
      {/* Hero Section */}
      <section style={heroSectionStyles}>
        <div style={containerStyles}>
          <h1 style={headingStyles}>Student Life</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
            Beyond the classroom: Building character, friendships, and memories
          </p>
        </div>
      </section>

      {/* Activities Overview */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={subHeadingStyles}>A Vibrant School Community</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666', marginBottom: '40px' }}>
          At Harding Secondary School, we believe in developing well-rounded individuals. 
          Our diverse range of extracurricular activities ensures every learner finds their passion 
          and develops skills beyond academics.
        </p>

        <div style={activityGridStyles}>
          {activitiesData.map((activity, index) => (
            <div 
              key={index}
              style={activityCardStyles}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img src={activity.image} alt={activity.title} style={activityImageStyles} />
              <div style={activityContentStyles}>
                <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
                  {activity.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clubs and Societies */}
      <section style={{ backgroundColor: '#F9F9F9', ...sectionStyles }}>
        <div style={containerStyles}>
          <h2 style={subHeadingStyles}>Clubs & Societies</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666', marginBottom: '40px' }}>
            Join our vibrant clubs and societies to explore your interests and develop new skills.
          </p>
          
          <div style={clubsGridStyles}>
            {clubs.map((club, index) => (
              <div 
                key={index}
                style={clubCardStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0D3F2F';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#19467E';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{club.icon}</div>
                <h4 style={{ fontSize: '18px', margin: 0 }}>{club.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={{ ...subHeadingStyles, textAlign: 'center' }}>Annual Events Calendar</h2>
        <div style={timelineStyles}>
          {events.map((event, index) => (
            <div key={index} style={eventStyles}>
              <div style={dateBoxStyles}>
                <div style={{ fontSize: '14px', marginBottom: '5px' }}>{event.month}</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{event.day}</div>
              </div>
              <div style={eventContentStyles}>
                <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#19467E' }}>
                  {event.title}
                </h3>
                <p style={{ color: '#666', margin: 0 }}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Support */}
      <section style={{ backgroundColor: '#F9F9F9', ...sectionStyles }}>
        <div style={containerStyles}>
          <h2 style={subHeadingStyles}>Student Support Services</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginTop: '40px'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{
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
              }}>
                🎯
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
                Counseling Services
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Professional guidance counselors available to support students' emotional 
                well-being and academic planning.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{
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
              }}>
                📚
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
                Peer Tutoring
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Senior students mentor and tutor junior students, fostering a 
                supportive learning community.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{
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
              }}>
                🏥
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
                Health & Wellness
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                On-site health services and wellness programs promoting physical 
                and mental health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Opportunities */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <div style={{
          backgroundColor: '#19467E',
          color: '#FFFFFF',
          padding: '60px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
            Student Leadership
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto' }}>
            Develop leadership skills through our Student Representative Council, 
            prefect system, and various leadership programs.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>25</div>
              <p>Prefects</p>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>15</div>
              <p>SRC Members</p>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '10px' }}>30+</div>
              <p>Club Leaders</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLife;