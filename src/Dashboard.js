import React, { useState, useEffect } from 'react';
import './css/dash.css';
import Task from './Task';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { db } from './index';
import { ref, get, set, onValue } from 'firebase/database';
import SummaryCarousel from './SummaryCarousel';

function Dashboard({ userId }) {
  const [todayTasks, setTodayTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [newTodayTask, setNewTodayTask] = useState('');
  const [newWeeklyTask, setNewWeeklyTask] = useState('');
  const [completedDailyTasks, setCompletedDailyTasks] = useState(0);
  const [completedWeeklyTasks, setCompletedWeeklyTasks] = useState(0);

  useEffect(() => {
    const todayTasksRef = ref(db, `users/${userId}/todayTasks`);
    const weeklyTasksRef = ref(db, `users/${userId}/weeklyTasks`);
    const completedDailyTasksRef = ref(db, `users/${userId}/completedDailyTasks`);
    const completedWeeklyTasksRef = ref(db, `users/${userId}/completedWeeklyTasks`);

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
  }, [userId]);

  const addTask = (setTasks, tasks, newTask, setNewTask, taskType) => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, newTask.trim()];
      setTasks(updatedTasks);
      setNewTask('');
      const taskRef = ref(db, `users/${userId}/${taskType}`);
      set(taskRef, updatedTasks);
    }
  };

  const removeTask = (setTasks, tasks, index, taskType) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    const taskRef = ref(db, `users/${userId}/${taskType}`);
    set(taskRef, updatedTasks);
  };

  const editTask = (setTasks, tasks, index, newTask, taskType) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? newTask : task));
    setTasks(updatedTasks);
    const taskRef = ref(db, `users/${userId}/${taskType}`);
    set(taskRef, updatedTasks);
  };

  const completeTask = (setTasks, tasks, index, isDaily, taskType) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    const taskRef = ref(db, `users/${userId}/${taskType}`);
    set(taskRef, updatedTasks);

    if (isDaily) {
      const newCount = completedDailyTasks + 1;
      setCompletedDailyTasks(newCount);
      const countRef = ref(db, `users/${userId}/completedDailyTasks`);
      set(countRef, newCount);
    } else {
      const newCount = completedWeeklyTasks + 1;
      setCompletedWeeklyTasks(newCount);
      const countRef = ref(db, `users/${userId}/completedWeeklyTasks`);
      set(countRef, newCount);
    }
  };

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
              {todayTasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  onRemove={() => removeTask(setTodayTasks, todayTasks, index, 'todayTasks')}
                  onEdit={(newTask) => editTask(setTodayTasks, todayTasks, index, newTask, 'todayTasks')}
                  onComplete={() => completeTask(setTodayTasks, todayTasks, index, true, 'todayTasks')}
                />
              ))}
            </ul>
            <input
              type="text"
              value={newTodayTask}
              onChange={(e) => setNewTodayTask(e.target.value)}
              placeholder="Add new task"
            />
            <button className="add-task-button" onClick={() => addTask(setTodayTasks, todayTasks, newTodayTask, setNewTodayTask, 'todayTasks')}>Add Task</button>
          </article>
          <article className="checklist">
            <h2>Weekly Checklist</h2>
            <ul>
              {weeklyTasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  onRemove={() => removeTask(setWeeklyTasks, weeklyTasks, index, 'weeklyTasks')}
                  onEdit={(newTask) => editTask(setWeeklyTasks, weeklyTasks, index, newTask, 'weeklyTasks')}
                  onComplete={() => completeTask(setWeeklyTasks, weeklyTasks, index, false, 'weeklyTasks')}
                />
              ))}
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
              <SummaryCarousel completedDailyTasks={completedDailyTasks} completedWeeklyTasks={completedWeeklyTasks} />
            </article>
            <article>
              <h2>Journal</h2>
              <form>
                <label htmlFor="date">Date: </label>
                <input type="date" id="date" name="trip-start" defaultValue="2024-05-19" min="2018-01-01" max="2026-12-31" />
                <textarea name="user-input" rows="4" cols="20" placeholder="Type here..."></textarea>
                <input type="submit" value="Submit" />
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