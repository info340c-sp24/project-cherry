import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import './css/summary.css';

function SummaryHeader({ user }) {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <header className="summary-header">
      <h1>{user.displayName}'s Account</h1>
      <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
    </header>
  );
}

export default SummaryHeader;