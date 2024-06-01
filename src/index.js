import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getDatabase } from 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ1Tun1rHj1NUXx9SOB0gjY39vHgDENak",
  authDomain: "cherry-82ec6.firebaseapp.com",
  projectId: "cherry-82ec6",
  storageBucket: "cherry-82ec6.appspot.com",
  messagingSenderId: "1067359813260",
  appId: "1:1067359813260:web:ddcdbdbf7d11660a8545a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export {db};