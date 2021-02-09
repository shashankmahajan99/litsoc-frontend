import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

function ModalCentered(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark text-light">
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <Form.Group id="loginId">
                <Form.Label htmlFor="inlineFormInputGroup">
                  Username/Email
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text className="bg-primary text-light">
                      @
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroup"
                    placeholder="Enter Username/Email"
                    className="bg-primary text-light"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid username/email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Text className="my-3" muted>
                <a href="/" className="text-secondary">
                  Reset Password
                </a>
              </Form.Text>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  className="bg-primary text-light"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Invalid username or password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="bg-dark text-light">
            <Button variant="info" onClick={props.onHide}>
              Close
            </Button>
            <Link to="/home">
              <Button variant="info" type="submit">
                Login
              </Button>
            </Link>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function SignUp() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Container>
      <Button
        className="mt-1 dark w-100 text-center"
        variant="info"
        onClick={() => setModalShow(true)}
      >
        Login
      </Button>{" "}
      <ModalCentered show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default SignUp;
