import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "../axios";
import UserContext from ".././context/UserContext";
import ErrorNotice from "./ErrorNotice";

function ModalCentered(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginUser = {
        password,
        username,
      };
      const loginRes = await axios.post(
        "https://app-litsoc.herokuapp.com/user/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
    } catch (err) {
      err.response.data.message && setError(err.response.data.message);
      setTimeout(function () {
        setError(undefined);
      }, 5000);
    }
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
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <Form.Group id="loginId">
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
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  className="bg-primary text-light"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Invalid username or password.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="bg-dark text-light">
            {error && <ErrorNotice message={error} />}
            <Button variant="info" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Login
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
        Login
      </Button>{" "}
      <ModalCentered show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default SignUp;
