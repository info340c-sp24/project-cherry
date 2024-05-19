import React from 'react'
import {SummaryApp} from './summary';
import { IntroQuiz } from './quiz';
import { TreatmentQuiz } from './treatment';
import JournalApp  from './journal';
import Dashboard from './Dashboard';


const App = () => {
  return (
    <div>
      <Dashboard></Dashboard>
      <IntroQuiz></IntroQuiz>
      <TreatmentQuiz></TreatmentQuiz>
      <JournalApp /> 
        <SummaryApp></SummaryApp>
    </div>
  )
}

export default App
