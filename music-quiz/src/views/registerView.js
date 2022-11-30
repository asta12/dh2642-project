import { Button, FloatingLabel, Form, Card, Alert } from "react-bootstrap";

export default function RegisterView(props) {
  return (
    <Card style={{ minWidth: "300px" }}>
      <Card.Body>
        <h2 className="text-center mb-4"> Register </h2>
        {props.created && <Alert variant="success">You have created a new account for the user: {props.created}</Alert>}
        {props.error && (props.error === "emailAlreadyRegistered" ? <Alert variant="danger">Email already taken</Alert> : <Alert variant="danger">{props.error}</Alert>)}
        <Form
          className="text-center"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            props.handleSubmit()
          }}
        >
          <FloatingLabel
            controlId="inputUsername"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => props.setUsername(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="inputEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => props.setEmail(e.target.value)}
              required
              isInvalid={
                !props.validEmail
              }
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid email (example@domain.com)
            </Form.Control.Feedback>
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <FloatingLabel
              controlId="inputPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => props.setPassword(e.target.value)}
                required
                isInvalid={
                  !props.validPassword
                }
              />
              <Form.Control.Feedback type="invalid">
                Password should be at least 6 characters
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <FloatingLabel
            controlId="inputConfirmPassword"
            label="Confirm password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => props.setConfirmPassword(e.target.value)}
              required
              isInvalid={
                !props.validConfirmPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match
            </Form.Control.Feedback>
          </FloatingLabel>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
