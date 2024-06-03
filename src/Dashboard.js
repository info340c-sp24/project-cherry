import React, { useState } from 'react';
import './css/dash.css';
import Task from './Task';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { db } from './index';
import { ref, get, set } from 'firebase/database';
import SummaryCarousel from './SummaryCarousel';

function Dashboard({ userId }) {
  const [todayTasks, setTodayTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [newTodayTask, setNewTodayTask] = useState('');
  const [newWeeklyTask, setNewWeeklyTask] = useState('');
  const [completedDailyTasks, setCompletedDailyTasks] = useState(0);
  const [completedWeeklyTasks, setCompletedWeeklyTasks] = useState(0);

  const addTask = (setTasks, tasks, newTask, setNewTask) => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const removeTask = (setTasks, tasks, index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
    const userRef = ref(db, `users/${userId}/removedTasksCount`);

    // Get current count
    get(userRef)
      .then((snapshot) => {
        const currentCount = snapshot.val() || 0;

        // Update count in the database
        set(userRef, currentCount + 1).catch((error) => {
          console.error('Error updating completed tasks count:', error);
        });
      })
      .catch((error) => {
        console.error('Error for completed tasks count:', error);
      });
  };

  const editTask = (setTasks, tasks, index, newTask) => {
    const newTasks = tasks.map((task, i) => (i === index ? newTask : task));
    setTasks(newTasks);
  };

  const completeTask = (setTasks, tasks, index, isDaily) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
    if (isDaily) {
      setCompletedDailyTasks(completedDailyTasks + 1);
    } else {
      setCompletedWeeklyTasks(completedWeeklyTasks + 1);
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
                  onRemove={() => removeTask(setTodayTasks, todayTasks, index)}
                  onEdit={(newTask) => editTask(setTodayTasks, todayTasks, index, newTask)}
                  onComplete={() => completeTask(setTodayTasks, todayTasks, index, true)}
                />
              ))}
            </ul>
            <input
              type="text"
              value={newTodayTask}
              onChange={(e) => setNewTodayTask(e.target.value)}
              placeholder="Add new task"
            />
            <button className="add-task-button" onClick={() => addTask(setTodayTasks, todayTasks, newTodayTask, setNewTodayTask)}>Add Task</button>
          </article>
          <article className="checklist">
            <h2>Weekly Checklist</h2>
            <ul>
              {weeklyTasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  onRemove={() => removeTask(setWeeklyTasks, weeklyTasks, index)}
                  onEdit={(newTask) => editTask(setWeeklyTasks, weeklyTasks, index, newTask)}
                  onComplete={() => completeTask(setWeeklyTasks, weeklyTasks, index, false)}
                />
              ))}
            </ul>
            <input
              type="text"
              value={newWeeklyTask}
              onChange={(e) => setNewWeeklyTask(e.target.value)}
              placeholder="Add new task"
            />
            <button className="add-task-button" onClick={() => addTask(setWeeklyTasks, weeklyTasks, newWeeklyTask, setNewWeeklyTask)}>Add Task</button>
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