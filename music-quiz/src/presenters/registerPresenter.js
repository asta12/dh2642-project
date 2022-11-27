import { useState } from "react";
import RegisterView from "../views/registerView.js";
import Container from "react-bootstrap/Container";

export default function Register(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      e.currentTarget.checkValidity() === false ||
      !isValidEmail() ||
      !isValidPassword() ||
      !isMatchingPassword()
    ) {
      setIsValidated(true);
      e.preventDefault();
      e.stopPropagation();
    } else {
      //e.preventDefault(); // remove later
      setIsValidated(false);

      setError("");
      setLoading(true);
      props.model.registerUser(email, password).catch((error) => {
        setError("Failed to create account");
        console.log(error);
      });
      setLoading(false);
      //e.target.reset() // clear all input values
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

  function setInput(e) {
    switch (e.target.id) {
      case "inputUsername":
        setUsername(e.target.value);
        break;
      case "inputEmail":
        setEmail(e.target.value);
        break;
      case "inputPassword":
        setPassword(e.target.value);
        break;
      case "inputConfirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
    }
  }

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <RegisterView
          error={error}
          loading={loading}
          isValidated={isValidated}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          passwordFeedback={passwordFeedback}
          confirmPasswordFeedback={confirmPasswordFeedback}
          isMatchingPassword={isMatchingPassword}
        />
      </Container>
    </div>
  );
}
