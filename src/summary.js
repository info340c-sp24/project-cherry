import React from 'react';
import './css/styles.css';
import {Footer} from './footer';
import {Navbar} from './navbar';

function SummaryHeader() {
  return (
    <header className="summary-header">
      <h1>Name's Account</h1>
      <img src="images/profile-picture.png" alt="Profile Picture" className="profile-picture" />
    </header>
  );
}

function SummaryCard({ title, text, imgSrc, alt }) {
  return (
    <div className="summary-card">
      <div className="summary-card-content">
        <img src={imgSrc} className="summary-card-img" alt={alt} />
        <div>
          <h2 className="summary-card-title">{title}</h2>
          <p className="summary-card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}

export function SummaryApp() {
  return (
    <div>
      <Navbar />
      <SummaryHeader />
      <main>
        <div className="summary-container">
          <div className="row">
            <SummaryCard
              title="CURRENT STREAK"
              text="0 Days"
              imgSrc="images/flame.png"
              alt="Red, Orange, and Yellow Flame Emoticon"
            />
            <SummaryCard
              title="TOTAL COMPLETED HABITS"
              text="0 Habits"
              imgSrc="images/graph.png"
              alt="Black bar graph, with three bars"
            />
            <SummaryCard
              title="GOALS"
              text="To have a healthy mindset"
              imgSrc="images/goal.png"
              alt="Circle dart board with dart on the center"
            />
            <SummaryCard
              title="PERSONAL DETAILS"
              text={
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Name: ava</li>
                  <li className="list-group-item">Email: ava19@gmail.com</li>
                  <li className="list-group-item">Age: 20</li>
                </ul>
              }
              imgSrc="images/notepad.png"
              alt="Black and white clip board with paper and writing icon"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

