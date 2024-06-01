import React, { useEffect, useState } from 'react';
import './css/summary.css';
import {Footer} from './footer';
import {Navbar} from './navbar';
import { ref, get } from 'firebase/database';
import { db } from './index';
import SummaryHeader from './summaryHeader';

//<img src="images/profile-picture.png" alt="Profile Picture" className="profile-picture" />

function SummaryCard({ title, text, imgSrc, alt }) {
  const [editableText, setEditableText] = useState(text);

  const handleTextChange = (event) => {
    setEditableText(event.target.innerText);
  };

  let summaryContent;
  if (title === "GOALS") {
    summaryContent = (
      <p
        className="summary-card-text"
        contentEditable="true"
        onBlur={handleTextChange}
      ></p>
    );
  } else {
    summaryContent = <p className="summary-card-text">{text}</p>;
  }

  return (
    <div className="summary-card">
      <div className="summary-card-content">
        <img src={imgSrc} className="summary-card-img" alt={alt} />
        <div>
          <h2 className="summary-card-title">{title}</h2>
          {summaryContent}
        </div>
      </div>
    </div>
  );
}

export function SummaryApp({ user }) {
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const userRef = ref(db, `users/${user.uid}/completedTasks`);
    get(userRef)
      .then((snapshot) => {
        const completedTasksCount = snapshot.val() || 0;
        setCompletedTasks(completedTasksCount);
      })
      .catch((error) => {
        console.error('Error fetching completed tasks count:', error);
      });
  }, [user.uid]);

  return (
    <div>
      <Navbar />
      <SummaryHeader user = {user}/>
      <main>
        <div className="summary-container">
          <div className="row">
            <SummaryCard user = {user}
              title="CURRENT STREAK"
              text="0 Days"
              imgSrc="images/flame.png"
              alt="Red, Orange, and Yellow Flame Emoticon"
            />
            <SummaryCard user = {user}
              title="TOTAL COMPLETED HABITS"
              text={`${completedTasks} Habits`}
              imgSrc="images/graph.png"
              alt="Black bar graph, with three bars"
            />
            <SummaryCard user = {user}
              title="GOALS"
              text="To have a healthy mindset"
              imgSrc="images/goal.png"
              alt="Circle dart board with dart on the center"
            />
            <SummaryCard user = {user}
              title="PERSONAL DETAILS"
              text={
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Name: {user.displayName}</li>
                  <li className="list-group-item">Email: {user.email}</li>
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

