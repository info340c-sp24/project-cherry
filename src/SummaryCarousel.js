import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SummaryCarousel({ completedDailyTasks, completedWeeklyTasks, streakCount }) {
  console.log(streakCount);
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <h1>{streakCount} Days Journaling Streak</h1>
        </Carousel.Item>
        <Carousel.Item>
          <h1>{completedDailyTasks} Completed Daily Tasks</h1>
        </Carousel.Item>
        <Carousel.Item>
          <h1>{completedWeeklyTasks} Completed Weekly Tasks</h1>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SummaryCarousel;