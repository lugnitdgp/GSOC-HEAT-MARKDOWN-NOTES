import React, { useContext, useState, useEffect } from "react"
import uuid from "react-uuid";
import { auth } from "../firebase"
import firebase from '../firebase';

const AuthContext = React.createContext()

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
    return auth.signOut()
  }
  

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
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
    
    
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}