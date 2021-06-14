import React from "react"
import Signup from "./Signup"

import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"



function App() {
 return (
    <>
      
        <Router>
          <AuthProvider>
            <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
               </Switch>
          </AuthProvider>
        </Router>
        
      </>
      
      
    

 )
}


export default App


