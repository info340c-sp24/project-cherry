import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import MySignInScreen from './MySignInScreen';
import AuthStatus from './AuthStatus';
import {SummaryApp} from './summary';
import { IntroQuiz } from './quiz';
import { TreatmentQuiz } from './treatment';
import JournalApp  from './journal';
import Dashboard from './Dashboard';
import 'firebaseui/dist/firebaseui.css';

const App = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return<p>Loading...</p>;
  }

  if (error){
    return <p>Error: {error.message}</p>;
  }

  let content;
  
  if(user != null || user != undefined){
    content = (
      <>
        <Dashboard></Dashboard>
          <IntroQuiz></IntroQuiz>
          <TreatmentQuiz></TreatmentQuiz>
          <JournalApp /> 
            <SummaryApp user = {user}></SummaryApp>
      </>
    );
  } else {
    content = (
      <Routes>
        <Route path="/login" element={<MySignInScreen />} />
        <Route path="*" element={<MySignInScreen />} />
      </Routes>
    );
  }

  return(
    <Router>
      <div>
        <AuthStatus />
        {content}
      </div>
    </Router>
  );
}

export default App
