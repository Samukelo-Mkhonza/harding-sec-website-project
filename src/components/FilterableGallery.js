import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import LazyImage from './LazyImage';
import { GALLERY_CONFIG } from '../utils/constants';

const FilterableGallery = ({
  items = [],
  categories = [],
  itemsPerPage = GALLERY_CONFIG.ITEMS_PER_PAGE,
  layout = 'grid',
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(itemsPerPage);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = filteredItems.map(item => ({
    src: item.src,
    title: item.title,
    description: item.date,
  }));

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            activeCategory === 'all'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary text-white shadow-lg'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className={`grid ${
          layout === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        } gap-6`}
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <LazyImage
                  src={item.src}
                  alt={item.title}
                  placeholder={item.thumbnail}
                  className="aspect-square group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.date && <p className="text-sm opacity-90">{item.date}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="btn-primary"
          >
            Load More
          </button>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </div>
  );
};

export default FilterableGallery;
