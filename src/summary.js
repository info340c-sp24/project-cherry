import React from 'react';
import './css/styles.css';
import {Footer} from './footer';
import {Navbar} from './navbar';

function SummaryHeader(props) {
  return (
    <header className="summary-header">
      <h1>{props.user.displayName}'s Account</h1>
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

export function SummaryApp(props) {
  return (
    <div>
      <Navbar />
      <SummaryHeader user = {props.user}/>
      <main>
        <div className="summary-container">
          <div className="row">
            <SummaryCard user = {props.user}
              title="CURRENT STREAK"
              text="0 Days"
              imgSrc="images/flame.png"
              alt="Red, Orange, and Yellow Flame Emoticon"
            />
            <SummaryCard user = {props.user}
              title="TOTAL COMPLETED HABITS"
              text={`${props.completedTasks} Habits`} 
              imgSrc="images/graph.png"
              alt="Black bar graph, with three bars"
            />
            <SummaryCard user = {props.user}
              title="GOALS"
              text="To have a healthy mindset"
              imgSrc="images/goal.png"
              alt="Circle dart board with dart on the center"
            />
            <SummaryCard user = {props.user}
              title="PERSONAL DETAILS"
              text={
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Name: {props.user.displayName}</li>
                  <li className="list-group-item">Email: {props.user.email}</li>
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

