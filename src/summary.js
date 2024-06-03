import React, { useEffect, useState} from 'react';
import './css/summary.css';
import {Footer} from './footer';
import {Navbar} from './navbar';
import { ref, get, update } from 'firebase/database';
import { db } from './index';
import SummaryHeader from './summaryHeader';

function SummaryCard({ title, text, imgSrc, alt, user, isGoal, onGoalChange, goalValue, isEditing, onEditClick }) {
  return (
    <div className="summary-card" aria-label={title}>
      <div className="summary-card-content">
        <img src={imgSrc} className="summary-card-img" alt={alt} />
        <div>
          <h2 className="summary-card-title">{title}</h2>
          {isGoal ? (
            <div>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={goalValue}
                    onChange={onGoalChange}
                    className="goal-input"
                    placeholder="Enter goal here"
                    aria-label="Enter goal here"
                  />
                  <button onClick={onEditClick} className="save-goal-button" aria-label="Save Goal">
                    Save Goal
                  </button>
                </div>
              ) : (
                <div>
                  <p>{goalValue}</p>
                  <button onClick={onEditClick} className="save-goal-button" aria-label="Edit Goal">
                    Edit Goal
                  </button>
                </div>
              )}
            </div>
          ) : (
            text
          )}
        </div>
      </div>
    </div>
  );
}

export function SummaryApp({ user }) {
 const [completedTasks, setCompletedTasks] = useState(0);
 const [streakCount, setStreakCount] = useState(0);
 const [goal, setGoal] = useState('');
 const [isEditing, setIsEditing] = useState(false);

 useEffect(() => {
  if (!user || !user.uid) {
    console.error("User or user.uid is undefined");
    return;
  }

  const completedDailyTasksRef = ref(db, `users/${user.uid}/completedDailyTasks`);
  const completedWeeklyTasksRef = ref(db, `users/${user.uid}/completedWeeklyTasks`);
  const streakCountRef = ref(db, `users/${user.uid}/streakCount`);
  const goalRef = ref(db, `users/${user.uid}/goal`);

  Promise.all([
    get(completedDailyTasksRef),
    get(completedWeeklyTasksRef),
    get(streakCountRef),
    get(goalRef)
  ])
  .then(([dailySnapshot, weeklySnapshot, streakSnapshot, goalSnapshot]) => {
    const completedDailyTasksCount = dailySnapshot.val() || 0;
    const completedWeeklyTasksCount = weeklySnapshot.val() || 0;
    const streakCountData = streakSnapshot.val() || 0;
    const goalData = goalSnapshot.val() ? goalSnapshot.val().goal : '';
    setCompletedTasks(completedDailyTasksCount + completedWeeklyTasksCount);
    setStreakCount(streakCountData);
    setGoal(goalData);
  })
  .catch((error) => {
    console.error('Error getting completed tasks count:', error);
  });}, [user.uid]);


  const handleGoalChange = (e) => {
    const newGoal = e.target.value;
    setGoal(newGoal);
    if (user && user.uid) {
      const goalRef = ref(db, `users/${user.uid}/goal`);
      update(goalRef, { goal: newGoal }).catch((error) => {
        console.error('Error saving goal:', error);
      });
    }
  };

  const handleEditClick = () => {
    if (isEditing && user && user.uid) {
      const goalRef = ref(db, `users/${user.uid}/goal`);
      update(goalRef, { goal }).catch((error) => {
        console.error('Error saving goal:', error);
      });
    }
    setIsEditing(!isEditing);
  };


 return (
   <div>
     <Navbar />
     <SummaryHeader user = {user}/>
     <main>
       <div className="summary-container">
         <div className="row">
           <SummaryCard user = {user}
             title="CURRENT JOURNALING STREAK"
             text={`${streakCount} Days`}
             imgSrc="images/flame.png"
             alt="Red, Orange, and Yellow Flame Emoticon"
           />
           <SummaryCard user = {user}
             title="TOTAL COMPLETED TASKS"
             text={`${completedTasks} Tasks`}
             imgSrc="images/graph.png"
             alt="Black bar graph, with three bars"
           />
           <SummaryCard user = {user}
             title="GOAL"
             text=""
             imgSrc="images/goal.png"
             alt="Circle dart board with dart on the center"
             isGoal={true}
             onGoalChange={handleGoalChange}
             goalValue={goal}
             isEditing={isEditing}
             onEditClick={handleEditClick}
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

