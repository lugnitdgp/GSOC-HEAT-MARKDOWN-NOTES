import React, { useContext, useState, useEffect } from "react"

import { auth } from "../firebase"
import firebase from '../firebase';

export const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    localStorage.currentUser ? JSON.parse(localStorage.currentUser): []
  );
  useEffect(() => {
    localStorage.setItem("currentUser",JSON.stringify(currentUser));
  },[currentUser]);

  
  

  
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
    
  }

  function logout(){
    auth.signOut()
    .then(()=> {
      console.log("logged out..");
      return;
    })
  }
  // function signInWithGoogle(){
  //   return auth.signInWithPopup.provider
  // }
  

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("currentuserset");
      setCurrentUser(user)
      console.log(user);
      setLoading(false)
      firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        id: user.uid,
        email: user.email,
      })

    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    
    login,
    signup,
    logout,
    // signInWithGoogle,
    
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}