import { Button, FloatingLabel, Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginView(props) {
  return (
    <Card style={{ minWidth: "300px" }}>
      <Card.Body>
        <h2 className="text-center mb-4"> Login </h2>
        {props.error && <Alert variant="danger">Wrong email or password!</Alert>}
        <Form
          className="text-center"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmit();
          }}
        >
          <FloatingLabel
            controlId="inputEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => props.setEmail(e.target.value)}
              required
              isInvalid={!props.validEmail}
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid email (example@domain.com)
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="inputPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => props.setPassword(e.target.value)}
              required
              isInvalid={!props.validPassword}
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid password of at least 6 characters
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Link to="/register" variant="body2">
          Do you not have an account? Sign up here!
        </Link>
      </Card.Body>
    </Card>
  );
}
