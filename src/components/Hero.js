// components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ images, currentIndex }) => {
  const heroStyles = {
    position: 'relative',
    height: '600px',
    overflow: 'hidden',
    backgroundColor: '#19467E'
  };

  const imageContainerStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    transition: 'transform 1s ease-in-out',
    transform: `translateX(-${currentIndex * 100}%)`
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    flexShrink: 0
  };

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(25, 70, 126, 0.7), rgba(25, 70, 126, 0.4))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const contentStyles = {
    textAlign: 'center',
    color: '#FFFFFF',
    padding: '0 20px',
    maxWidth: '800px',
    animation: 'fadeInUp 1s ease-out'
  };

  const titleStyles = {
    fontSize: '56px',
    fontWeight: '800',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    lineHeight: '1.2'
  };

  const subtitleStyles = {
    fontSize: '24px',
    fontWeight: '400',
    marginBottom: '30px',
    opacity: 0.95
  };

  const ctaButtonStyles = {
    display: 'inline-block',
    backgroundColor: '#FFFFFF',
    color: '#19467E',
    padding: '15px 40px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  };

  const indicatorContainerStyles = {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px'
  };

  const indicatorStyles = (isActive) => ({
    width: isActive ? '30px' : '10px',
    height: '10px',
    backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  });

  return (
    <section style={heroStyles}>
      <div style={imageContainerStyles}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`School slide ${index + 1}`}
            style={imageStyles}
          />
        ))}
      </div>
      
      <div style={overlayStyles}>
        <div style={contentStyles}>
          <h1 style={titleStyles}>Excellence in Education</h1>
          <p style={subtitleStyles}>
            Nurturing Tomorrow's Leaders in the Heart of KwaZulu-Natal
          </p>
          <Link 
            to="/about" 
            style={ctaButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F0F0F0';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Discover More
          </Link>
        </div>
      </div>
      
      <div style={indicatorContainerStyles}>
        {images.map((_, index) => (
          <div
            key={index}
            style={indicatorStyles(index === currentIndex)}
          />
        ))}
      </div>
      
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .hero-title {
              font-size: 36px !important;
            }
            .hero-subtitle {
              font-size: 18px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;