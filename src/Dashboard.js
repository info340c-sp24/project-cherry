import React, { useState } from 'react';
import './App.css';
import Task from './Task';

function Dashboard() {
  const [todayTasks, setTodayTasks] = useState(['Task 1', 'Task 2', 'Task 3', 'Task 4']);
  const [weeklyTasks, setWeeklyTasks] = useState(['Task 1', 'Task 2', 'Task 3', 'Task 4']);
  const [newTask, setNewTask] = useState('');

  const addTask = (setTasks, tasks) => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const removeTask = (setTasks, tasks, index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (setTasks, tasks, index, newTask) => {
    const newTasks = tasks.map((task, i) => (i === index ? newTask : task));
    setTasks(newTasks);
  };

  return (
    <div>
      <header>
        <h1>Cherry Habit Tracker</h1>
      </header>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="journal.html">Journal</a></li>
          <li><a href="summary.html">Summary</a></li>
          <li><a href="quiz.html">Quiz</a></li>
        </ul>
      </nav>
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
                />
              ))}
            </ul>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task"
            />
            <button className="add-task-button" onClick={() => addTask(setTodayTasks, todayTasks)}>Add Task</button>
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
                />
              ))}
            </ul>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task"
            />
            <button className="add-task-button" onClick={() => addTask(setWeeklyTasks, weeklyTasks)}>Add Task</button>
          </article>
          <div className="thirds">
            <article>
              <h2>Summary</h2>
              <p>20 tasks completed this week</p>
              <p>3 tasks completed today</p>
              <img className="placeholder" src="/images/graph_placeholder.webp" alt="Habit tracker graph" />
            </article>
            <article>
              <h2>Journal</h2>
              <form>
                <label for="date">Date: </label>
                <input type="date" id="date" name="trip-start" value="2024-05-19" min="2018-01-01" max="2026-12-31" />
                <textarea name="user-input" rows="4" cols="20" placeholder="Type here..."></textarea>
                <input type="submit" value="Submit"></input>
              </form>
            </article>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Cherry Company. All rights reserved.</p>
        <ul>
          <li>Phone: +1234567890</li>
          <li>Email: <a href="mailto:support@cherrytracker.com">support@cherrytracker.com</a></li>
          <li>Socials:
            <a href="http://twitter.com/" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter">Twitter</a>,
            <a href="http://facebook.com/" target="_blank" rel="noopener noreferrer" title="Like us on Facebook">Facebook</a>,
            <a href="http://instagram.com/" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">Instagram</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Dashboard;
