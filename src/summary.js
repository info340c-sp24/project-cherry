import React, { useEffect, useState} from 'react';
import './css/summary.css';
import {Footer} from './footer';
import {Navbar} from './navbar';
import { ref, get, update } from 'firebase/database';
import { db } from './index';
import SummaryHeader from './summaryHeader';

function SummaryCard({ title, text, imgSrc, alt, user }) {
 const [editableText, setEditableText] = useState(text);

 useEffect(() => {
   setEditableText(text);
 }, [text]);

 const handleTextChange = (event) => {
   setEditableText(event.target.innerText);
 };

 const handleBlur = () => {
   if (title === "GOALS") {
     const userGoalRef = ref(db, `users/${user.uid}/goal`);
     update(userGoalRef, { goal: editableText })
       .then(() => console.log("Goal updated successfully"))
       .catch((error) => console.error('Error updating goal:', error));
   }
 };

 let summaryContent;
 if (title === "GOALS") {
   summaryContent = (
     <p
       className="summary-card-text"
       contentEditable="true"
       onBlur={handleBlur}
       onInput={handleTextChange}
     >
       {editableText}
     </p>
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
 const [goal, setGoal] = useState("");
 const [streakCount, setStreakCount] = useState(0);

 useEffect(() => {
  if (!user || !user.uid) {
    console.error("User or user.uid is undefined");
    return;
  }

  const completedDailyTasksRef = ref(db, `users/${user.uid}/completedDailyTasks`);
  const completedWeeklyTasksRef = ref(db, `users/${user.uid}/completedWeeklyTasks`);
  const streakCountRef = ref(db, `users/${user.uid}/streakCount`);

  Promise.all([
    get(completedDailyTasksRef),
    get(completedWeeklyTasksRef),
    get(streakCountRef)
  ])
  .then(([dailySnapshot, weeklySnapshot, streakSnapshot]) => {
    const completedDailyTasksCount = dailySnapshot.val() || 0;
    const completedWeeklyTasksCount = weeklySnapshot.val() || 0;
    const streakCountData = streakSnapshot.val() || 0;
    setCompletedTasks(completedDailyTasksCount + completedWeeklyTasksCount);
    setStreakCount(streakCountData);
  })
  .catch((error) => {
    console.error('Error getting completed tasks count:', error);
  });


 const userGoalRef = ref(db, `users/${user.uid}/goal`);
   get(userGoalRef)
     .then((snapshot) => {
       const goalData = snapshot.val();
       if (goalData && typeof goalData.goal === 'string') {
         setGoal(goalData.goal);
       } else {
         setGoal("");
       }
     })
     .catch((error) => {
       console.error('Error getting user goal:', error);
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
             title="GOALS"
             text={goal}
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

