import { useState, useEffect, useCallback } from 'react';
import { FaPlay } from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { ALL_GALLERY_IMAGES, PLACEHOLDER_IMAGES, HERO_IMAGES } from '../utils/imageConstants';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'academic', label: 'Academic' },
  { id: 'sports', label: 'Sports' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'events', label: 'Events' },
  { id: 'facilities', label: 'Facilities' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    selectedCategory === 'all'
      ? ALL_GALLERY_IMAGES
      : ALL_GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  const closeModal = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') closeModal(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, closeModal]);

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGES.default;
  };

  return (
    <>
      <SEO {...SEOConfigs.gallery} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Page Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden">
          <img
            src={HERO_IMAGES.graduation}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Visual Stories</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              Gallery
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white/90">
              Capturing moments and memories at Harding Secondary School
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-10">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Browse</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-8">Our Photo Gallery</h2>
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-primary-dark text-white shadow-lg'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredImages.map((image, index) => (
                <AnimateOnScroll key={image.id} animation="zoom-in" delay={index * 50}>
                  <div
                    className="relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-100 aspect-[4/3] group shadow-sm hover:shadow-xl transition-shadow duration-300"
                    onClick={() => setSelectedImage(image)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedImage(image); }}
                    aria-label={`View ${image.title}`}
                  >
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold mb-0.5">{image.title}</h3>
                      <p className="text-sm text-white/80">{image.description}</p>
                    </div>
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.category}
                    </span>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Video Highlights */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Media</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Video Highlights</h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'School Tour', desc: 'Take a virtual tour of our facilities' },
                { label: 'Year in Review 2024', desc: 'Highlights from the 2024 academic year' },
              ].map(({ label, desc }) => (
                <AnimateOnScroll key={label} animation="slide-up">
                  <div className="group relative bg-primary-dark aspect-video rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-lg cursor-pointer">
                    <div className="absolute inset-0 bg-primary-dark/70 group-hover:bg-primary-dark/50 transition-colors duration-300" />
                    <div className="relative z-10 text-center text-white">
                      <div className="w-16 h-16 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <FaPlay className="text-white text-xl ml-1" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{label}</h3>
                      <p className="text-white/70 text-sm">{desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 md:p-6 animate-fade-in"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`Image: ${selectedImage.title}`}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors cursor-pointer"
              onClick={closeModal}
              aria-label="Close image viewer"
              autoFocus
            >
              ×
            </button>
            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-white">
                <h3 className="text-lg font-bold">{selectedImage.title}</h3>
                <p className="text-white/70 text-sm">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
