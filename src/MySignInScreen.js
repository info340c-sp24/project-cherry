import React from 'react';
import Login from './StyledFirebaseAuth';
//import { getAuth } from 'firebase/auth';
//import './css/MySignInScreen.css';

function MySignInScreen() {

  return (
    <div className="sign-in-container">
      <h1>Welcome to Cherry Habit Tracker!</h1>
      <p>A personalized habit tracker to simplify your daily routines and reach your goals.</p>
      <Login />
    </div>
  );
}

export default MySignInScreen;

