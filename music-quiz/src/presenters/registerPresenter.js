import { useState } from "react";
import RegisterView from "../views/registerView.js";
import { Container } from "react-bootstrap";
import { register } from '../firebaseAuthentication'
import resolvePromise from '../resolvePromise'

export default function Register(props) {
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [validConfirmPassword, setValidConfirmPassword] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registerPromiseState, setRegisterPromiseState] = useState({})
  const [, reRender] = useState()

  function registerAttempt() {
    const checkEmail = isValidEmail()
    const checkPassword = isValidPassword()
    const checkMatchingPassword = isMatchingPassword()

    setValidEmail(checkEmail)
    setValidPassword(checkPassword)
    setValidConfirmPassword(checkMatchingPassword)

    // No need to send a request to firebase if the email, password or matching password is invalid.
    if (checkEmail && checkPassword && checkMatchingPassword) {
        resolvePromise(register(username, email, password), registerPromiseState, () => reRender(new Object()))
    }
  }

  function isValidEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function isValidPassword() {
    return password.length >= 6;
  }

  function passwordFeedback() {
    if (password && password.length < 6)
      return "Password should be at least 6 characters";
    return "Please input password";
  }

  function isMatchingPassword() {
    return password === confirmPassword;
  }

  function confirmPasswordFeedback() {
    if (confirmPassword && password !== confirmPassword)
      return "Passwords do not match";
    return "Please confirm password";
  }

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <RegisterView
          error={registerPromiseState.error}
          validEmail={validEmail}
          validPassword={validPassword}
          validConfirmPassword={validConfirmPassword}
          setEmail={setEmail}
          setUsername={setUsername}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={registerAttempt}
          passwordFeedback={passwordFeedback}
          confirmPasswordFeedback={confirmPasswordFeedback}
        />
      </Container>
    </div>
  );
}
