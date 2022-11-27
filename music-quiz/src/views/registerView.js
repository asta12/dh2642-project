import { Button, FloatingLabel, Form, Card, Alert } from "react-bootstrap";

export default function RegisterView(props) {
  return (
    <Card style={{ minWidth: "300px" }}>
      <Card.Body>
        <h2 className="text-center mb-4"> Register </h2>
        {props.error && <Alert variant="danger">{props.error}</Alert>}
        <Form
          noValidate
          onSubmit={(e) => {
            props.handleSubmit(e);
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
              onChange={(e) => props.setInput(e)}
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

          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <FloatingLabel
              controlId="inputPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => props.setInput(e)}
                required
                isInvalid={
                  props.isValidated &&
                  props.password &&
                  !props.isValidPassword()
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.passwordFeedback()}
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
              onChange={(e) => props.setInput(e)}
              required
              isInvalid={
                props.isValidated &&
                props.confirmPassword &&
                !props.isMatchingPassword()
              }
            />
            <Form.Control.Feedback type="invalid">
              {props.confirmPasswordFeedback()}
            </Form.Control.Feedback>
          </FloatingLabel>

          <Button disabled={props.loading} variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
