import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import MySignInScreen from './MySignInScreen';
import AuthStatus from './AuthStatus';
import { SummaryApp } from './summary';
import JournalApp from './journal';
import Dashboard from './Dashboard';
import 'firebaseui/dist/firebaseui.css';
import { Navbar } from './navbar';

const App = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const db = getDatabase();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Router>
      <div>
        {user && <Navbar />}
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/journal" element={<JournalApp user={user} />} />
              <Route path="/summary" element={<SummaryApp user={user} />} />
            </>
          ) : (
            <>
              <Route path="*" element={<MySignInScreen />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
