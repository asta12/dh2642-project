import LoginView from "../views/loginView.js";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import {login} from '../firebaseAuthentication'
import resolvePromise from '../resolvePromise'

export default function Login(props) {
  const [currentUser, setCurrentUser] = useState(props.model.currentUser)
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPromiseState, setLoginPromiseState] = useState({})
  const [, reRender] = useState()

  function componentCreated() {
    
    function onObserverNotification() {
        setCurrentUser(props.model.currentUser)
    }

    function onComponentTakeDown() {
        props.model.removeObserver(onObserverNotification)
    }

    props.model.addObserver(onObserverNotification)

    return onComponentTakeDown
  }
  
  useEffect(componentCreated, [])

  function loginAttempt() {
    // No need to send a request to firebase if the email or password is invalid.
    if (!isValidEmail()) {
        setValidEmail(false)
        return;
    } else {
        setValidEmail(true)
    }

    if (!isValidPassword()) {
        setValidPassword(false)
        return;
    } else {
        setValidPassword(true)
    }

    resolvePromise(login(email, password), loginPromiseState, () => reRender(new Object()))
  }

  function isValidEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function isValidPassword() {
    return password.length >= 6;
  }

  return (
    <div className="loginContainer">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >  
        {
        props.model.currentUser ? 
        "You are already logged in"
        : 
        <LoginView
          error={loginPromiseState.error}
          validEmail={validEmail}
          validPassword={validPassword}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={loginAttempt}
        />
        }
      </Container>
    </div>
  );
}
