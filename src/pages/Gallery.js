// pages/Gallery.js
import { useState } from 'react';
import { SEO, SEOConfigs } from '../components';
import { ALL_GALLERY_IMAGES } from '../utils/imageConstants';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

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
      <div className="pt-0">
        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-16 md:py-20 lg:py-24 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
              Gallery
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Capturing moments and memories at Harding Secondary School
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-dark text-white'
                      : 'bg-neutral-100 text-black hover:bg-neutral-200'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden rounded-xl cursor-pointer bg-neutral-100 aspect-[4/3] group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.image} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-5 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg md:text-xl font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Section */}
            <div className="mt-16 md:mt-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-8 md:mb-10 text-center">
                Video Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-black aspect-video rounded-xl flex items-center justify-center text-white">
                  <p className="text-base md:text-lg">School Tour Video</p>
                </div>
                <div className="bg-black aspect-video rounded-xl flex items-center justify-center text-white">
                  <p className="text-base md:text-lg">Year in Review 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-transparent border-none text-white text-4xl md:text-5xl cursor-pointer p-2 hover:opacity-75 transition-opacity"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;