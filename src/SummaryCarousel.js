import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SummaryCarousel({ completedDailyTasks, completedWeeklyTasks, streakCount }) {
  console.log(streakCount);
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <h3>{streakCount} Current Journaling Streak</h3>
        </Carousel.Item>
        <Carousel.Item>
          <h3>{completedDailyTasks} Completed Daily Tasks</h3>
        </Carousel.Item>
        <Carousel.Item>
          <h3>{completedWeeklyTasks} Completed Weekly Tasks</h3>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SummaryCarousel;