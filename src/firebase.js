import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// import {useHistory} from "react-router-dom"


const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
    
})

const db = app.firestore();
const storage = firebase.storage();

// const provider = new firebase.auth.GoogleAuthProvider();
// // function Google(){
// // const history = useHistory()
//  export const SignInWithGoogle = () => {
//     // const History = useHistory() 
//     auth.signInWithPopup(provider).then((res) => {
//       // user object
//       console.log(res.user)
//     }).catch((error) => {
//       console.log(error.message)
//     })
//     // history.push("/")
//   }
  
//   return(
//     <div className="login-buttons">
//     <button className="login-provider-button" onClick={SignInWithGoogle}>
//     <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
//     <span> Continue with Google</span>
//    </button>
//   </div>
//   )
// }
export {db}
export {storage}
// export  {provider}
export const auth = app.auth()
export default app
// export default Google

