import profilepic from "../photos/profilepic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import bg from "../photos/Endless-Constellation2.svg";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";
import React from "react";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Container, Col, Row } from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
const Notifications = () => {
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState([1, 3]);

  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */
  return (
    <div className="container">
      <Col>
        <Row
          style={{
            position: "relative",
          }}
          className="float-right"
        >
          <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={() => setShow(!show)}
          >
            <ToggleButton value={false}>
              <FontAwesomeIcon icon={faBell} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Row>
          <Toast
            style={{
              position: "absolute",
              top: 45,
              right: 0,
              background: "white",
              width: 250,
            }}
            onClose={() => setShow(false)}
            show={show}
          >
            <Toast.Header className="text-info">
              <strong className="ml-auto">Notifications</strong>
            </Toast.Header>
            <Toast.Body className="text-primary">
              You have (5) new messages.
            </Toast.Body>
          </Toast>
        </Row>
        <Divider />
      </Col>
    </div>
  );
};

export default Notifications;
