import { Button, FloatingLabel, Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginView(props) {
  return (
    <Card style={{ minWidth: "300px" }}>
      <Card.Body>
        <h2 className="text-center mb-4"> Login </h2>
        {props.error && <Alert variant="danger">{props.error}</Alert>}
        <Form
          className="text-center"
          noValidate
          onSubmit={(e) => {
            props.handleSubmit(e);
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
              onChange={(e) => props.setInput(e)}
              required
              isInvalid={
                props.isValidated && props.email && !props.isValidEmail()
              }
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid email (example@domain.com)
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="inputPassword"
            label="password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => props.setInput(e)}
              required
            />
          </FloatingLabel>
          <Button disabled={props.loading} variant="primary" type="submit">
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
