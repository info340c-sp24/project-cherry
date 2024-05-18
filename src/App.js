import React from 'react'
import {SummaryApp} from './summary';
import { IntroQuiz } from './quiz';
import { TreatmentQuiz } from './treatment';


const App = () => {
  return (
    <div>
      <IntroQuiz></IntroQuiz>
      <TreatmentQuiz></TreatmentQuiz>
        <SummaryApp></SummaryApp>
    </div>
  )
}

export default App
