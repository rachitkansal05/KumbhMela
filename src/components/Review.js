import React, { useState, useEffect } from 'react';

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = [
    {
      quote: "Good try! This page is helping people to handle the lost and found things easily.",
      name: "Nehul Neha",
      location: "Mumbai",
    },
    {
      quote: "Thank you for helping me to get my mobile back. Such a great help!",
      name: "Krishnan Kutti",
      location: "Trivandrum",
    },
    {
      quote: "I am really grateful to have found my lost items through this service.",
      name: "Sruthi Garu",
      location: "Hyderabad",
    },
  ];

  const moveNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const movePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <div>
      <section className="review">
        <div className="carousel-container">
          <h2 className="carousel-title">Success Stories</h2>
          <div className="carousel" id="testimonialCarousel">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${currentIndex === index ? 'active' : ''} ${
                  currentIndex === (index - 1 + carouselItems.length) % carouselItems.length ? 'left' : ''
                } ${
                  currentIndex === (index + 1) % carouselItems.length ? 'right' : ''
                }`}
              >
                <div className="testimonial">
                  <i className="quote-icon fas fa-quote-left"></i>
                  <p>{item.quote}</p>
                  <h4>{item.name}</h4>
                  <h5>{item.location}</h5>
                </div>
              </div>
            ))}
          </div>
          <button className="prev" onClick={movePrev}>
            &#10094;
          </button>
          <button className="next" onClick={moveNext}>
            &#10095;
          </button>
        </div>
      </section>
      <section className="write-review container">
        <h2 className="carousel-title">Rate Your Own Experience</h2>
        <form>
          <div className="review-textarea">
            <label htmlFor="reviewInput" className="sr-only">Share your review</label>
            <textarea
              className="input-area"
              id="reviewInput" // Give the textarea an ID for accessibility
              name="review"
              placeholder="Share your reviews"
              rows="5" // Set rows for textarea height
              required // Optional: Add validation
            ></textarea>

          </div>
          <div className="to-center">
          <button type="submit" className="btn-primary lost-btn toCenter">Submit Review</button>
          </div>
        </form>
      </section>
    </div>
  );
}
