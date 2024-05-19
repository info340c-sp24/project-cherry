import React from 'react'
import {SummaryApp} from './summary';
import { IntroQuiz } from './quiz';
import { TreatmentQuiz } from './treatment';
import JournalApp  from './journal';


const App = () => {
  return (
    <div>
      <IntroQuiz></IntroQuiz>
      <TreatmentQuiz></TreatmentQuiz>
      <JournalApp /> 
        <SummaryApp></SummaryApp>
        
    </div>
  )
}

export default App
