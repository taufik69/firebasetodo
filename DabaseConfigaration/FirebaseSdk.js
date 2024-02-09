// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCwxay-TvVENY8goUjBMxaeSkTqerEefY8",
  authDomain: "realtime-todo-61201.firebaseapp.com",
  projectId: "realtime-todo-61201",
  storageBucket: "realtime-todo-61201.appspot.com",
  messagingSenderId: "244738447199",
  appId: "1:244738447199:web:bbbe72b64e6b7fda1388ea",
  measurementId: "G-2WT89GLH9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
