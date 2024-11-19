export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyBc6qKuTZxxbcXDFiSD4dDJhWs9ysJHqJQ",
    authDomain: "bakito-app.firebaseapp.com",
    projectId: "bakito-app",
    storageBucket: "bakito-app.appspot.com",
    messagingSenderId: "533548112413",
    appId: "1:533548112413:web:f1e017457d61362a2104f4"
  }
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc6qKuTZxxbcXDFiSD4dDJhWs9ysJHqJQ",
  authDomain: "bakito-app.firebaseapp.com",
  projectId: "bakito-app",
  storageBucket: "bakito-app.appspot.com",
  messagingSenderId: "533548112413",
  appId: "1:533548112413:web:f1e017457d61362a2104f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);