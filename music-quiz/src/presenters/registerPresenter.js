import { useState } from "react";
import RegisterView from "../views/registerView.js";
import Container from "react-bootstrap/Container";
import { registerUser } from "../firebaseModel.js";

export default function Register() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e, username, email, password, confirmPassword) {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else if (password === confirmPassword) {
      e.preventDefault(); // remove later

      try {
        setError("");
        setLoading(true);
        registerUser(email, password);
      } catch {
        setError("Failed to create account");
      }
      setLoading(false);
    }
    setValidated(true);
  }

  function passwordConfirmationMessage(password, confirmPassword) {
    if (confirmPassword && password !== confirmPassword)
      return "Passwords do not match";
    return "Please confirm password";
  }

  function checkIfUnmatchingPasswords(password, confirmPassword) {
    if (!password || !confirmPassword) return false;
    return password !== confirmPassword;
  }

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center">
        <RegisterView
          validated={validated}
          error={error}
          loading={loading}
          handleSubmit={handleSubmit}
          passwordConfirmationMessage={passwordConfirmationMessage}
          checkIfUnmatchingPasswords={checkIfUnmatchingPasswords}
        />
      </Container>
    </div>
  );
}
