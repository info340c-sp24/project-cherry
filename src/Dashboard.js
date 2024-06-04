import React, { useState, useEffect } from 'react';
import './css/dash.css';
import Task from './Task';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { db } from './index';
import { ref, onValue, set, push } from 'firebase/database';
import SummaryCarousel from './SummaryCarousel';

function Dashboard({ user }) {
  const [todayTasks, setTodayTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [newTodayTask, setNewTodayTask] = useState('');
  const [newWeeklyTask, setNewWeeklyTask] = useState('');
  const [completedDailyTasks, setCompletedDailyTasks] = useState(0);
  const [completedWeeklyTasks, setCompletedWeeklyTasks] = useState(0);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalDate, setJournalDate] = useState('');
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    if (!user || !user.uid) {
      console.error("User or user.uid is undefined");
      return;
    }

    const todayTasksRef = ref(db, `users/${user.uid}/todayTasks`);
    const weeklyTasksRef = ref(db, `users/${user.uid}/weeklyTasks`);
    const completedDailyTasksRef = ref(db, `users/${user.uid}/completedDailyTasks`);
    const completedWeeklyTasksRef = ref(db, `users/${user.uid}/completedWeeklyTasks`);
    const streakCountRef = ref(db, `users/${user.uid}/streakCount`);

    onValue(todayTasksRef, (snapshot) => {
      const data = snapshot.val();
      setTodayTasks(data ? data : []);
    });

    onValue(weeklyTasksRef, (snapshot) => {
      const data = snapshot.val();
      setWeeklyTasks(data ? data : []);
    });

    onValue(completedDailyTasksRef, (snapshot) => {
      const data = snapshot.val();
      setCompletedDailyTasks(data ? data : 0);
    });

    onValue(completedWeeklyTasksRef, (snapshot) => {
      const data = snapshot.val();
      setCompletedWeeklyTasks(data ? data : 0);
    });

    onValue(streakCountRef, (snapshot) => {
      const data = snapshot.val();
      setStreakCount(data ? data : 0);
    });

    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
    setJournalDate(formattedDate);
  }, [user]);

  const addTask = (setTasks, tasks, newTask, setNewTask, taskType) => {
    if (!user || !user.uid) {
      console.error("User or user.uid is undefined");
      return;
    }

    if (newTask.trim()) {
      const updatedTasks = [...tasks, newTask.trim()];
      setTasks(updatedTasks);
      setNewTask('');
      const taskRef = ref(db, `users/${user.uid}/${taskType}`);
      set(taskRef, updatedTasks);
    }
  };

  const removeTask = (setTasks, tasks, index, taskType) => {
    if (!user || !user.uid) {
      console.error("User or user.uid is undefined");
      return;
    }

    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    const taskRef = ref(db, `users/${user.uid}/${taskType}`);
    set(taskRef, updatedTasks);
  };

  const editTask = (setTasks, tasks, index, newTask, taskType) => {
    if (!user || !user.uid) {
      console.error("User or user.uid is undefined");
      return;
    }

    const updatedTasks = tasks.map((task, i) => (i === index ? newTask : task));
    setTasks(updatedTasks);
    const taskRef = ref(db, `users/${user.uid}/${taskType}`);
    set(taskRef, updatedTasks);
  };

  const completeTask = (setTasks, tasks, index, isDaily, taskType) => {
    if (!user || !user.uid) {
      console.error("User or user.uid is undefined");
      return;
    }

    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    const taskRef = ref(db, `users/${user.uid}/${taskType}`);
    set(taskRef, updatedTasks);

    if (isDaily) {
      const newCount = completedDailyTasks + 1;
      setCompletedDailyTasks(newCount);
      const countRef = ref(db, `users/${user.uid}/completedDailyTasks`);
      set(countRef, newCount);
    } else {
      const newCount = completedWeeklyTasks + 1;
      setCompletedWeeklyTasks(newCount);
      const countRef = ref(db, `users/${user.uid}/completedWeeklyTasks`);
      set(countRef, newCount);
    }
  };

  const handleJournalSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.uid) {
      console.error("User or user.uid is undefined");
      return;
    }

    const journalRef = ref(db, `users/${user.uid}/journal`);
    const newJournalEntry = {
      title: journalTitle,
      content: journalContent,
      datetime: new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
      date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).split('/').join('-')
    };

    push(journalRef, newJournalEntry)
      .then(() => {
        setJournalTitle('');
        setJournalContent('');
      })
      .catch((error) => {
        console.error('Error saving journal entry:', error);
      });
  };

  if (!user || !user.uid) {
    return <div>Loading...</div>; 
  }

  const todayTaskList = todayTasks.map((task, index) => (
    <Task
      key={index}
      task={task}
      onRemove={() => removeTask(setTodayTasks, todayTasks, index, 'todayTasks')}
      onEdit={(newTask) => editTask(setTodayTasks, todayTasks, index, newTask, 'todayTasks')}
      onComplete={() => completeTask(setTodayTasks, todayTasks, index, true, 'todayTasks')}
    />
  ));

  const weeklyTaskList = weeklyTasks.map((task, index) => (
    <Task
      key={index}
      task={task}
      onRemove={() => removeTask(setWeeklyTasks, weeklyTasks, index, 'weeklyTasks')}
      onEdit={(newTask) => editTask(setWeeklyTasks, weeklyTasks, index, newTask, 'weeklyTasks')}
      onComplete={() => completeTask(setWeeklyTasks, weeklyTasks, index, false, 'weeklyTasks')}
    />
  ));

  return (
    <div>
      <header>
        <h1>Cherry Habit Tracker</h1>
      </header>
      <Navbar />
      <main>
        <div className="content">
          <article className="checklist">
            <h2>Today's Checklist</h2>
            <ul>
              {todayTaskList}
            </ul>
            <input
              type="text"
              value={newTodayTask}
              onChange={(e) => setNewTodayTask(e.target.value)}
              placeholder="Add new task"
              aria-label="Add new task for today"
            />
            <button className="add-task-button" onClick={() => addTask(setTodayTasks, todayTasks, newTodayTask, setNewTodayTask, 'todayTasks')}>Add Task</button>
          </article>
          <article className="checklist">
            <h2>Weekly Checklist</h2>
            <ul>
              {weeklyTaskList}
            </ul>
            <input
              type="text"
              value={newWeeklyTask}
              onChange={(e) => setNewWeeklyTask(e.target.value)}
              placeholder="Add new task"
            />
            <button className="add-task-button" onClick={() => addTask(setWeeklyTasks, weeklyTasks, newWeeklyTask, setNewWeeklyTask, 'weeklyTasks')}>Add Task</button>
          </article>
          <div className="thirds">
            <article>
              <h2>Summary</h2>
              <SummaryCarousel streakCount={streakCount} completedDailyTasks={completedDailyTasks} completedWeeklyTasks={completedWeeklyTasks} />
            </article>
            <article>
              <h2>Journal</h2>
              <form onSubmit={handleJournalSubmit}>
                <label htmlFor="title">Title: </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                  placeholder="Journal Title"
                  required
                />
                <br />
                <textarea
                  name="content"
                  rows="4"
                  cols="20"
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  placeholder="Type here..."
                  required
                ></textarea>
                <input type="submit" value="Submit"/>
              </form>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;