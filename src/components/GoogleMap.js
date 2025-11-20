import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{
      height: '450px',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2616.664353518629!2d29.88457517443031!3d-30.571598655920482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5ee9ecb734163%3A0x51508346adc98662!2sKirk%20St%2C%20Harding%2C%204680!5e0!3m2!1sen!2sza!4v1763674351697!5m2!1sen!2sza"
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        allowFullScreen=""
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        title="Harding Secondary School Location"
      />
    </div>
  );
};

export default GoogleMap;
