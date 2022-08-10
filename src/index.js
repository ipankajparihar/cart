import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9DidUn8cPm-BilLQ59aTossIbeA_6LDU",
  authDomain: "cart-aca03.firebaseapp.com",
  projectId: "cart-aca03",
  storageBucket: "cart-aca03.appspot.com",
  messagingSenderId: "757049049028",
  appId: "1:757049049028:web:e07daaba156b9d00f16e91"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <App />
);


