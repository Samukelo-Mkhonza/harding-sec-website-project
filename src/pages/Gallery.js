// pages/Gallery.js
import React, { useState } from 'react';

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

  const galleryImages = [
    {
      id: 1,
      category: 'academic',
      title: 'Science Laboratory',
      description: 'Students conducting experiments',
      image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800'
    },
    {
      id: 2,
      category: 'sports',
      title: 'Athletics Day',
      description: 'Annual sports competition',
      image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800'
    },
    {
      id: 3,
      category: 'cultural',
      title: 'Drama Performance',
      description: 'School theatrical production',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'
    },
    {
      id: 4,
      category: 'facilities',
      title: 'School Library',
      description: 'Modern learning resource center',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'
    },
    {
      id: 5,
      category: 'events',
      title: 'Graduation Ceremony',
      description: 'Class of 2024 celebration',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
    },
    {
      id: 6,
      category: 'academic',
      title: 'Computer Lab',
      description: 'IT education in progress',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'
    },
    {
      id: 7,
      category: 'sports',
      title: 'Soccer Team',
      description: 'School soccer champions',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800'
    },
    {
      id: 8,
      category: 'cultural',
      title: 'Music Festival',
      description: 'Annual music showcase',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800'
    },
    {
      id: 9,
      category: 'facilities',
      title: 'School Grounds',
      description: 'Beautiful campus environment',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
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
  );
};

export default Gallery;