import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SummaryCarousel() {
  return (
    <div className="carousel-container"> {/* Scoped CSS container */}
      <Carousel>
        <Carousel.Item>
          <h3>0 Day Streak</h3>
        </Carousel.Item>
        <Carousel.Item>
          <h3>0 Completed Habits</h3>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SummaryCarousel;