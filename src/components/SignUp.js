import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

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
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter First Name"
                className="bg-primary text-light"
              />
            </Col>
            <Col xs={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter Last Name"
                className="bg-primary text-light"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={6}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="bg-primary text-light"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="validationCustomUsername">
                <Form.Label htmlFor="inlineFormInputGroup">Username</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text className="bg-primary text-light">
                      @
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroup"
                    placeholder="Enter Username"
                    className="bg-primary text-light"
                    required
                  />
                  <Form.Control.Feedback>
                    Username Available
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  className="bg-primary text-light"
                  required
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter Password"
                  className="bg-primary text-light"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="bg-dark text-light">
            <Button variant="info" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Register
            </Button>
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
        Register
      </Button>{" "}
      <ModalCentered show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default SignUp;
