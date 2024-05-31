import React from 'react';
import Login from './StyledFirebaseAuth';
//import { getAuth } from 'firebase/auth';
import './css/MySignInScreen.css';

function MySignInScreen() {

  return (
    <div className="sign-in-container">
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <Login />
    </div>
  );
}

export default MySignInScreen;

