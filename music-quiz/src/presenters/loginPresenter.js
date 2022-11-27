import LoginView from "../views/loginView.js";
import Container from "react-bootstrap/Container";
import { useState } from "react";

export default function Login(props) {
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (
      e.currentTarget.checkValidity() === false ||
      !isValidEmail() ||
      !isValidPassword()
    ) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault(); // remove later

      setError("");
      setLoading(true);
      props.model.loginUser(email, password).catch((error) => {
        setError("Failed to log in");
        console.log(error);
      });
      setLoading(false);
    }
    setIsValidated(true);
  }

  function isValidEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function isValidPassword() {
    return password.length >= 6;
  }

  function setInput(e) {
    switch (e.target.id) {
      case "inputEmail":
        console.log("email: " + email);
        setEmail(e.target.value);
        break;
      case "inputPassword":
        setPassword(e.target.value);
        break;
      default:
    }
  }

  return (
    <div className="loginContainer">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <LoginView
          isValidated={isValidated}
          error={error}
          loading={loading}
          handleSubmit={handleSubmit}
          setInput={setInput}
          isValidEmail={isValidEmail}
        />
      </Container>
    </div>
  );
}
