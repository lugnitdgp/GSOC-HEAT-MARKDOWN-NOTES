import React, { useContext, useEffect, useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./App.css"
// import {  auth } from "firebase/app"
import { auth } from "../firebase"
// import firebase from '../firebase'
// import {provider} from "../firebase";
// import {SignInWithGoogle} from "../firebase";
import firebase from 'firebase/app';
import "firebase/auth";
// import Google from "..firebase/"
import { AuthContext } from "../contexts/AuthContext"
// import { Redirect } from "react-router-dom"


 function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const currentUser = useContext(AuthContext)
  // const [redirect,setredirect]= useState(null)
  // const googleProvider = new firebase.auth.GoogleAuthProvider()

  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(googleProvider).then((res)=>{
      console.log("signedinusing google");
      console.log(res.user)
    }).catch((error)=> {
      console.log(error.message)
    })
    history.push("/");
  }

  // useEffect(()=>{
  //   if (currentUser) {
  //     console.log("redirectset");
  //     setredirect("/")
  //   }
  // },[currentUser]);
  // if (redirect){
  //   <Redirect to = {redirect} />
  // }
  // console.log("identifier");
  return (
    <>
    
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <br/>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br/>
            <Button disabled={loading} className="w-100" type="submit" >
              Log In
            </Button>
          </Form>
          </Card.Body>
      </Card>
       <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <br/>
      {/* <Button disabled={loading} className="w-100" type="submit">
      <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
      </Button> */}
      {/* <Google/> */}
      <div className="login-buttons">
        <button className="login-provider-button" type="submit" onClick={signInWithGoogle} >
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>
      </div>
      </div>
      </Container>
      </>
  )
}
export default Login;