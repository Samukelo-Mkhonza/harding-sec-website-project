import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing page metadata
 * Includes Open Graph, Twitter Cards, and structured data
 * 
 * @param {string} title - Page title
 * @param {string} description - Page description (max 160 chars recommended)
 * @param {string} keywords - SEO keywords
 * @param {string} image - OG image URL (1200x630px minimum)
 * @param {string} url - Canonical URL
 * @param {string} type - OG type (website, article, etc.)
 * @param {Object} structuredData - JSON-LD structured data
 * @param {string} author - Content author
 * @param {string} publishedTime - Article published time (ISO 8601)
 * @param {string} modifiedTime - Article modified time (ISO 8601)
 */
const SEO = ({
  title = 'Harding Secondary School - Excellence in Education',
  description = 'Harding Secondary School in KwaZulu-Natal offers quality education with a 95% matric pass rate. Discover our academic programs, sports, and extracurricular activities.',
  keywords = 'Harding Secondary School, KwaZulu-Natal education, matric results, secondary school, academic excellence, sports programs',
  image = '/harding-sec-logo-2.png',
  url = 'https://hardingsecondary.edu.za',
  type = 'website',
  structuredData = null,
  author = 'Harding Secondary School',
  publishedTime = null,
  modifiedTime = null,
}) => {
  // Ensure description is within recommended length
  const metaDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  // Construct full image URL
  const fullImageUrl = image.startsWith('http') 
    ? image 
    : `${url}${image}`;

  // Default structured data for organization
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Harding Secondary School',
    description: 'A leading secondary school in KwaZulu-Natal, South Africa, providing quality education since 1950.',
    url: url,
    logo: fullImageUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Harding',
      addressRegion: 'KwaZulu-Natal',
      addressCountry: 'ZA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-39-433-1223',
      contactType: 'Admissions',
      email: 'info@hardingsecondary.edu.za',
    },
    sameAs: [
      'https://www.facebook.com/hardingsecondary',
      'https://twitter.com/hardingsec',
      'https://www.instagram.com/hardingsecondary',
    ],
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Harding Secondary School" />
      <meta property="og:locale" content="en_ZA" />

      {/* Article specific OG tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@hardingsec" />
      <meta name="twitter:creator" content="@hardingsec" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

/**
 * Predefined SEO configurations for common pages
 */
export const SEOConfigs = {
  home: {
    title: 'Harding Secondary School - Excellence in Education Since 1950',
    description: 'Harding Secondary School in KwaZulu-Natal offers quality education with a 95% matric pass rate, 67% bachelor\'s pass. Explore our academic programs, sports, and extracurricular activities.',
    keywords: 'Harding Secondary School, KwaZulu-Natal education, matric results, secondary school, academic excellence, sports programs, Ugu District',
    url: 'https://hardingsecondary.edu.za',
  },
  about: {
    title: 'About Us - Harding Secondary School',
    description: 'Learn about Harding Secondary School\'s 70+ year legacy of educational excellence in KwaZulu-Natal. Discover our mission, values, and commitment to student success.',
    keywords: 'about Harding Secondary, school history, mission and values, educational excellence, KwaZulu-Natal schools',
    url: 'https://hardingsecondary.edu.za/about',
  },
  academics: {
    title: 'Academic Programs - Harding Secondary School',
    description: 'Explore our comprehensive academic programs with a 95% matric pass rate. We offer diverse subjects, extra classes, and support for all learners.',
    keywords: 'academic programs, matric subjects, curriculum, extra classes, academic support, science, mathematics, languages',
    url: 'https://hardingsecondary.edu.za/academics',
  },
  admissions: {
    title: 'Admissions - Harding Secondary School',
    description: 'Apply to Harding Secondary School. Learn about our admission process, requirements, fees, and how to enroll your child in our school.',
    keywords: 'school admissions, enrollment, application process, school fees, admission requirements, KwaZulu-Natal schools',
    url: 'https://hardingsecondary.edu.za/admissions',
  },
  studentLife: {
    title: 'Student Life - Harding Secondary School',
    description: 'Experience vibrant student life at Harding Secondary with 20+ sports codes, cultural activities, leadership programs, and extracurricular opportunities.',
    keywords: 'student life, sports programs, extracurricular activities, cultural activities, leadership development, school clubs',
    url: 'https://hardingsecondary.edu.za/student-life',
  },
  gallery: {
    title: 'Photo Gallery - Harding Secondary School',
    description: 'Browse photos of campus life, events, sports, and activities at Harding Secondary School. See our facilities and student achievements.',
    keywords: 'school photos, campus gallery, school events, sports photos, student activities, school facilities',
    url: 'https://hardingsecondary.edu.za/gallery',
  },
  contact: {
    title: 'Contact Us - Harding Secondary School',
    description: 'Get in touch with Harding Secondary School. Find our contact information, location, office hours, and send us a message.',
    keywords: 'contact school, school location, phone number, email address, office hours, school address Harding',
    url: 'https://hardingsecondary.edu.za/contact',
  },
};

export default SEO;
