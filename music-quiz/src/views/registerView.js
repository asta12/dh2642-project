import { Button, FloatingLabel, Form, Card, Alert } from "react-bootstrap";
import { useRef } from "react";

export default function RegisterView(props) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4"> Register </h2>
        {props.error && <Alert variant="danger">{props.error}</Alert>}
        <Form
          noValidate
          validated={props.validated}
          onSubmit={(e) => {
            props.handleSubmit(
              e,
              usernameRef.current?.value,
              emailRef.current?.value,
              passwordRef.current?.value,
              confirmPasswordRef.current?.value
            );
          }}
        >
          <FloatingLabel
            controlId="floatingInputUsername"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              ref={usernameRef}
              placeholder="Username"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInputEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              ref={emailRef}
              placeholder="Email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid email
            </Form.Control.Feedback>
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <FloatingLabel
              controlId="floatingInputPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input password
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <FloatingLabel
            controlId="floatingInputConfirmPassword"
            label="Confirm password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              ref={confirmPasswordRef}
              placeholder="Password"
              required
              isInvalid={props.checkIfUnmatchingPasswords(
                passwordRef?.current?.value,
                confirmPasswordRef?.current?.value
              )}
            />
            <Form.Control.Feedback type="invalid">
              {props.passwordConfirmationMessage(
                passwordRef?.current?.value,
                confirmPasswordRef.current?.value
              )}
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
