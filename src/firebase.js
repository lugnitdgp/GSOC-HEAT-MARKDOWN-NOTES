import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";


const app = firebase.initializeApp({
    apiKey: "AIzaSyChotuPPRlTww80Y5TCiaTbYGN5aW0Cv-k",
    authDomain: "note-app-412a3.firebaseapp.com",
    projectId: "note-app-412a3",
    storageBucket: "note-app-412a3.appspot.com",
    messagingSenderId: "1076041763531",
    appId: "1:1076041763531:web:a2b676f154ca68d3bba94e"
})

const db = app.firestore();

export {db}
export const auth = app.auth()
export default app


