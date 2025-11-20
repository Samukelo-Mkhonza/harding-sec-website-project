// pages/Gallery.js
import React, { useState } from 'react';
import { SEO, SEOConfigs } from '../components';
import { ALL_GALLERY_IMAGES } from '../utils/imageConstants';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

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

  const filterContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '40px',
    flexWrap: 'wrap'
  };

  const filterButtonStyles = (isActive) => ({
    padding: '10px 25px',
    backgroundColor: isActive ? '#19467E' : '#F0F0F0',
    color: isActive ? '#FFFFFF' : '#666',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  const galleryGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  };

  const imageCardStyles = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: '#F0F0F0',
    aspectRatio: '4/3'
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const overlayStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    color: '#FFFFFF',
    padding: '20px',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease'
  };

  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalImageStyles = {
    maxWidth: '90%',
    maxHeight: '90vh',
    objectFit: 'contain'
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '40px',
    cursor: 'pointer',
    padding: '10px'
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'academic', label: 'Academic' },
    { id: 'sports', label: 'Sports' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'events', label: 'Events' },
    { id: 'facilities', label: 'Facilities' }
  ];

  // Use centralized gallery images from constants
  const galleryImages = ALL_GALLERY_IMAGES;

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <SEO {...SEOConfigs.gallery} />
      <div style={pageStyles}>
        {/* Hero Section */}
      <section style={heroSectionStyles}>
        <div style={containerStyles}>
          <h1 style={headingStyles}>Gallery</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
            Capturing moments and memories at Harding Secondary School
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        {/* Filter Buttons */}
        <div style={filterContainerStyles}>
          {categories.map((category) => (
            <button
              key={category.id}
              style={filterButtonStyles(selectedCategory === category.id)}
              onClick={() => setSelectedCategory(category.id)}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.backgroundColor = '#E0E0E0';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.backgroundColor = '#F0F0F0';
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={galleryGridStyles}>
          {filteredImages.map((image) => (
            <div
              key={image.id}
              style={imageCardStyles}
              onClick={() => setSelectedImage(image)}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                e.currentTarget.querySelector('.overlay').style.transform = 'translateY(0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.overlay').style.transform = 'translateY(100%)';
              }}
            >
              <img 
                src={image.image} 
                alt={image.title}
                style={imageStyles}
              />
              <div className="overlay" style={overlayStyles}>
                <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>{image.title}</h3>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#19467E', 
            marginBottom: '30px',
            textAlign: 'center' 
          }}>
            Video Highlights
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              backgroundColor: '#000',
              aspectRatio: '16/9',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <p>School Tour Video</p>
            </div>
            <div style={{
              backgroundColor: '#000',
              aspectRatio: '16/9',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <p>Year in Review 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div 
          style={modalStyles}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            style={closeButtonStyles}
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img 
            src={selectedImage.image} 
            alt={selectedImage.title}
            style={modalImageStyles}
          />
        </div>
      )}
      </div>
    </>
  );
};

export default Gallery;