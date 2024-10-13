import React, { useEffect, useState } from 'react';

const ScrollComponent = () => {
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const navElement = document.getElementById('nav');
      if (!navElement) return; // Check if the nav element exists

      // Get the bottom position of the nav element
      const navBottom = navElement.getBoundingClientRect().bottom;

      // Show button if the scroll position is past the nav element's bottom
      if (navBottom < 0) {
        setShowGoTopBtn(true);
      } else {
        setShowGoTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {showGoTopBtn && (
        <button 
          id="goTopBtn" 
          className={`go-top-btn ${showGoTopBtn ? 'visible' : ''}`} 
          onClick={goToTop}
        >
          <i className="fa-solid fa-arrow-up-long"></i>
          <br />Top
        </button>
      )}
    </div>
  );
};

export default ScrollComponent;
