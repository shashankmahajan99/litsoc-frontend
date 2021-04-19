import React, { useContext, useState } from "react";
import UserContext from ".././context/UserContext";
import {
  Form,
  Row,
  Col,
  Button,
  Card,
  Accordion,
  Image,
  Toast,
} from "react-bootstrap";
import axios from "../axios";
import photo from ".././photos/guest.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import firebaseStorage from "../base.js";
const Settings = () => {
  const { userData } = useContext(UserContext);
  const [firstName, setFirstName] = useState(userData.user.firstName);
  const [lastName, setLastName] = useState(userData.user.lastName);
  const [imagePreview, setImagePreview] = useState();
  const [image, setImage] = useState();
  const [isImage, setIsImage] = useState(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setImagePreview(
      event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : null
    );
    setImage(event.target.files[0]);
    event.target.files[0].type === "image/jpeg" ||
    event.target.files[0].type === "image/png"
      ? setIsImage(true)
      : setIsImage(false);
  };

  const uploadFile = async (event) => {
    const storageRef = firebaseStorage.storage().ref();
    let fileRef;
    let url;
    let pictureRef;
    let fileRes;
    setLoading(true);
    if (image && isImage) {
      fileRef = storageRef.child(userData.user.username);
      url = await fileRef.getDownloadURL().catch((err) => {
        console.log(err);
      });
      if (url) {
        pictureRef = firebaseStorage.storage().refFromURL(url);
        firebaseStorage.storage().ref(pictureRef.fullPath).delete();
      }
      const res = await fileRef.put(image);
      setShow(true);
      setLoading(false);
      fileRes = res;
    }
    await axios.patch(
      "https://app-litsoc.herokuapp.com/user/",
      {
        id: fileRes ? true : false,
        firstName: firstName,
        lastName: lastName,
      },
      { headers: { "x-auth-token": userData.token } }
    );
  };

  return (
    <div>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "13%",
          }}
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={5000}
            style={{
              position: "absolute",
              marginTop: 0,
              marginRight: 0,
              zIndex: 1,
            }}
            autohide
          >
            <Toast.Header className="bg-dark text-light">
              <strong className="mr-auto">Settings</strong>
            </Toast.Header>
            <Toast.Body>Profile Updated!</Toast.Body>
          </Toast>
        </div>
        <Accordion defaultActiveKey="0">
          <Card className="mt-1 text-light bg-dark">
            <Card.Header className="border-light">
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                className="text-decoration-none text-light"
              >
                <h6>Personal Information</h6>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Row>
                    <Col xs={4}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        className="bg-primary text-light"
                        onChange={(e) => setFirstName(e.target.value)}
                        defaultValue={userData.user.firstName}
                      />
                    </Col>
                    <Col xs={4}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        className="bg-primary text-light"
                        onChange={(e) => setLastName(e.target.value)}
                        defaultValue={userData.user.lastName}
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="mt-1 bg-dark text-light">
            <Card.Header className="border-light">
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="1"
                className="text-decoration-none text-light"
              >
                <h6>Profile Settings</h6>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <h5>Change profile picture:</h5>
                <Row>
                  <Col xs={4}></Col>
                  <Col xs={4}>
                    <Row>
                      <Image
                        src={imagePreview ? imagePreview : photo}
                        roundedCircle
                        height="160"
                        width="180"
                      />
                    </Row>
                    <Row className="my-2">
                      <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        className="font-weight-bold text-light"
                      />
                    </Row>
                    <Row></Row>
                  </Col>
                  <Col xs={4}></Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Button variant="info" onClick={uploadFile} disabled={loading}>
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
          {loading && " Saving"}
          {!loading && "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
