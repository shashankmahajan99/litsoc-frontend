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
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [passwordcheck, setPasswordCheck] = useState();
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let file = await axios
        .get("https://app-litsoc.herokuapp.com/image/guest")
        .then((response) => console.log(response.data));

      if (file) {
        let data = new FormData();
        data.append("name", username);
        data.append("file", file);
        await axios.post("https://app-litsoc.herokuapp.com/upload", data, {
          onUploadProgress: (progressEvent) => {
            if ((progressEvent.loaded / progressEvent.total) * 100 === 100)
              console.log("done");
          },
        });
      }
      const newUser = {
        email,
        password,
        passwordcheck,
        username,
        firstName,
        lastName,
      };
      await axios.post(
        "https://app-litsoc.herokuapp.com/user/register",
        newUser
      );
      const loginRes = await axios.post(
        "https://app-litsoc.herokuapp.com/user/login",
        {
          username,
          password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        imgUrl: loginRes.data.imgUrl ? loginRes.data.imgUrl : undefined,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
    } catch (err) {
      err.response.data && setError(err.response.data);
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
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter First Name"
                className="bg-primary text-light"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter Last Name"
                className="bg-primary text-light"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="bg-primary text-light"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
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
                    onChange={(e) => setUsername(e.target.value)}
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
            <Col xs={12} md={4}>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  className="bg-primary text-light"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter Password"
                  className="bg-primary text-light"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  required
                />
              </Form.Group>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                className="font-weight-bold text-light"
              />
            </Col>
          </Row>
          <Modal.Footer className="bg-dark text-light">
            {error && <ErrorNotice message={error} />}
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
      <ModalCentered
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </Container>
  );
}

export default SignUp;
