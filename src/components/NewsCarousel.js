import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const NewsCarousel = ({ news = [] }) => {
  const defaultNews = [
    {
      id: 1,
      title: "Academic Excellence Awards 2024",
      excerpt: "Celebrating our students' outstanding achievements in the recent national examinations.",
      date: "March 15, 2024",
      category: "Academics",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      link: "#"
    },
    {
      id: 2,
      title: "New Science Laboratory Opening",
      excerpt: "State-of-the-art facilities to enhance our STEM education programs.",
      date: "March 10, 2024",
      category: "Facilities",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
      link: "#"
    },
    {
      id: 3,
      title: "Sports Day Success",
      excerpt: "Our athletes shine at the inter-school sports competition, bringing home multiple medals.",
      date: "March 5, 2024",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
      link: "#"
    },
    {
      id: 4,
      title: "Community Service Initiative",
      excerpt: "Students making a difference through our new outreach program.",
      date: "February 28, 2024",
      category: "Community",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      link: "#"
    }
  ];

  const newsItems = news.length > 0 ? news : defaultNews;

  const getCategoryColor = (category) => {
    const colors = {
      'Academics': 'bg-primary text-white',
      'Sports': 'bg-secondary text-white',
      'Facilities': 'bg-accent-info text-white',
      'Community': 'bg-accent-success text-white',
      'Events': 'bg-accent-warning text-white'
    };
    return colors[category] || 'bg-neutral-500 text-white';
  };

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
            Latest News & <span className="gradient-text">Announcements</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings, achievements, and events at Harding Secondary School
          </p>
        </div>

        {/* News Carousel */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="news-carousel pb-12"
        >
          {newsItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card card-hover h-full group">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar-alt text-sm"></i>
                      <span className="text-sm font-medium">{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    <span>Read More</span>
                    <i className="fas fa-arrow-right text-sm"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            to="/news"
            className="btn-outline inline-flex items-center gap-2"
          >
            <span>View All News</span>
            <i className="fas fa-newspaper"></i>
          </Link>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .news-carousel :global(.swiper-button-next),
        .news-carousel :global(.swiper-button-prev) {
          color: #19467E;
          background: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .news-carousel :global(.swiper-button-next:after),
        .news-carousel :global(.swiper-button-prev:after) {
          font-size: 18px;
        }

        .news-carousel :global(.swiper-pagination-bullet) {
          background: #19467E;
          opacity: 0.3;
        }

        .news-carousel :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          background: #00A651;
        }
      `}</style>
    </section>
  );
};

export default NewsCarousel;
