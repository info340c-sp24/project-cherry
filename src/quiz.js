import React, { useState } from 'react';
import './css/styles.css';
// import { useHistory } from 'react-router-dom';
import {Footer} from './footer';
import { Navbar } from './navbar';



function SummaryHeader() {
    return (
        <header>
        <div>
          <h1>Cherry Habit Tracker</h1>
          <h2>Welcome Quiz</h2>
        </div>
      </header>
    );
  }
export function IntroQuiz() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    // const history = useHistory();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       console.log('Form submitted with:', { name, email, file });
    //    history.push('/treatmentinput');
    };
    return (
        <div>
        <Navbar />
        <SummaryHeader></SummaryHeader>
        <div className="orientation">
        <h2> Hello! Welcome to Cherry.</h2>
        <p className="quizmessage" >We are here to help you stay on top of your treatment plan - 
                  whether it's prescribed or self-made! 
                  For example, we help you keep track of 
                  how many times you took your medication, or how many ounces of water you drank in a day.
                </p>
        <p className="quizmessage">Fill out these questions so we can curate the best experience for you!</p>

              <section>
              {/* <form action="" method="get" class="form-example"> */}
              <form onSubmit={handleSubmit} className="form-example">
              <div className="form-example">
                <label for="name">Enter your name: </label>
                <input type="text" name="name" id="name" value={name} onChange={handleNameChange} required />
              </div>
              <div className="form-example">
                <label for="email">Enter your email: </label>
                <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} required />
              </div>
              <div className="form-example">
                            <label htmlFor="file">Upload a Profile Picture: </label>
                            <input type="file" name="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                        
            
              </form>
            </section>
            <div class="form-navigation">
              <a href="treatmentinput.html" class="mybutton">Create Account</a>
            </div>
          </div>
          <Footer />
          </div>

    )
  }
 
  
  