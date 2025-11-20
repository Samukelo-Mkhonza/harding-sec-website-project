/**
 * Centralized Image Constants
 * 
 * All images used throughout the website are defined here using reliable,
 * publicly available sources (Unsplash). This ensures:
 * - No broken image links
 * - Consistent image quality
 * - Easy maintenance and updates
 * - High-resolution images optimized for web
 */

// Hero/Banner Images - High resolution for hero sections
export const HERO_IMAGES = {
  students: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80&fit=crop',
  classroom: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80&fit=crop',
  graduation: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80&fit=crop',
  library: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&fit=crop',
  campus: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80&fit=crop',
};

// News & Events Images
export const NEWS_IMAGES = {
  academicAwards: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80&fit=crop',
  scienceLab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80&fit=crop',
  sportsDay: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80&fit=crop',
  community: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80&fit=crop',
  matricResults: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop',
  schoolEvent: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&fit=crop',
};

// Student Life & Activities Images
export const ACTIVITY_IMAGES = {
  sports: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80&fit=crop',
  cultural: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80&fit=crop',
  academicClubs: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop',
  music: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80&fit=crop',
  drama: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80&fit=crop',
  debate: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80&fit=crop',
};

// Gallery Images - Organized by category
export const GALLERY_IMAGES = {
  academic: [
    {
      id: 1,
      category: 'academic',
      title: 'Science Laboratory',
      description: 'Students conducting experiments',
      image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800&q=80&fit=crop',
    },
    {
      id: 2,
      category: 'academic',
      title: 'Computer Lab',
      description: 'IT education in progress',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop',
    },
    {
      id: 3,
      category: 'academic',
      title: 'School Library',
      description: 'Modern learning resource center',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&fit=crop',
    },
  ],
  sports: [
    {
      id: 4,
      category: 'sports',
      title: 'Athletics Day',
      description: 'Annual sports competition',
      image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&q=80&fit=crop',
    },
    {
      id: 5,
      category: 'sports',
      title: 'Soccer Team',
      description: 'School soccer champions',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80&fit=crop',
    },
    {
      id: 6,
      category: 'sports',
      title: 'Rugby Practice',
      description: 'Team training session',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80&fit=crop',
    },
  ],
  cultural: [
    {
      id: 7,
      category: 'cultural',
      title: 'Drama Performance',
      description: 'School theatrical production',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80&fit=crop',
    },
    {
      id: 8,
      category: 'cultural',
      title: 'Music Festival',
      description: 'Annual music showcase',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80&fit=crop',
    },
    {
      id: 9,
      category: 'cultural',
      title: 'Art Exhibition',
      description: 'Student artwork showcase',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&fit=crop',
    },
  ],
  events: [
    {
      id: 10,
      category: 'events',
      title: 'Graduation Ceremony',
      description: 'Class of 2024 celebration',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&fit=crop',
    },
    {
      id: 11,
      category: 'events',
      title: 'Awards Ceremony',
      description: 'Recognizing excellence',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80&fit=crop',
    },
    {
      id: 12,
      category: 'events',
      title: 'Open Day',
      description: 'Welcome prospective students',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&fit=crop',
    },
  ],
  facilities: [
    {
      id: 13,
      category: 'facilities',
      title: 'School Grounds',
      description: 'Beautiful campus environment',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&fit=crop',
    },
    {
      id: 14,
      category: 'facilities',
      title: 'Main Building',
      description: 'Historic school architecture',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80&fit=crop',
    },
    {
      id: 15,
      category: 'facilities',
      title: 'Sports Field',
      description: 'Athletic facilities',
      image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80&fit=crop',
    },
  ],
};

// Flatten gallery images for easy access
export const ALL_GALLERY_IMAGES = [
  ...GALLERY_IMAGES.academic,
  ...GALLERY_IMAGES.sports,
  ...GALLERY_IMAGES.cultural,
  ...GALLERY_IMAGES.events,
  ...GALLERY_IMAGES.facilities,
];

// About Page Images
export const ABOUT_IMAGES = {
  history: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80&fit=crop',
  mission: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&fit=crop',
  values: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop',
  staff: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&fit=crop',
};

// Academics Page Images
export const ACADEMICS_IMAGES = {
  sciences: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80&fit=crop',
  mathematics: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80&fit=crop',
  languages: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&fit=crop',
  commerce: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&fit=crop',
  technology: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop',
  arts: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&fit=crop',
};

// Placeholder/Fallback Images
export const PLACEHOLDER_IMAGES = {
  default: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&fit=crop',
  avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80&fit=crop',
  card: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80&fit=crop',
};

/**
 * Helper function to get a random image from a category
 * @param {Array} imageArray - Array of image URLs
 * @returns {string} Random image URL
 */
export const getRandomImage = (imageArray) => {
  return imageArray[Math.floor(Math.random() * imageArray.length)];
};

/**
 * Helper function to get image with fallback
 * @param {string} imageUrl - Primary image URL
 * @param {string} fallbackUrl - Fallback image URL
 * @returns {string} Image URL
 */
export const getImageWithFallback = (imageUrl, fallbackUrl = PLACEHOLDER_IMAGES.default) => {
  return imageUrl || fallbackUrl;
};

export default {
  HERO_IMAGES,
  NEWS_IMAGES,
  ACTIVITY_IMAGES,
  GALLERY_IMAGES,
  ALL_GALLERY_IMAGES,
  ABOUT_IMAGES,
  ACADEMICS_IMAGES,
  PLACEHOLDER_IMAGES,
  getRandomImage,
  getImageWithFallback,
};
