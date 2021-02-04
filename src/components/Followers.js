import ListGroup from "react-bootstrap/ListGroup";
import photo from "../photos/guest.png";
import Image from "react-bootstrap/Image";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Followers = () => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="bg-dark border-secondary mt-3 rounded-pill">
        <Row>
          <Col sm={1}>
            <Image
              className="bg-transparent mb-3"
              src={photo}
              roundedCircle
              alt="user pic"
              height="70"
              width="75"
            />
          </Col>
          <Col sm={8} className="mt-4 ml-2">
            <NavLink
              to="/secondUser"
              className="text-decoration-none text-light"
            >
              <h4 className="w-25">Jenny Scott</h4>
            </NavLink>
          </Col>
          <div className="h-25 mr-3 my-auto"></div>
          <div className="h-25 ml-auto mr-5 my-auto">
            <Button variant="info" type="submit">
              Follow
            </Button>
          </div>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item className="bg-dark border-secondary mt-3 rounded-pill">
        <Row>
          <Col sm={1}>
            <Image
              className="bg-transparent mb-3"
              src={photo}
              roundedCircle
              alt="user pic"
              height="70"
              width="75"
            />
          </Col>
          <Col sm={8} className="mt-4 ml-2">
            <NavLink
              to="/secondUser"
              className="text-decoration-none text-light"
            >
              <h4>Shashank Mahajan</h4>
            </NavLink>
          </Col>
          <div className="h-25 ml-1 my-auto">
            <Button variant="info" type="submit">
              Message
            </Button>
          </div>
          <div className="h-25 ml-3 my-auto">
            <Button variant="info" type="submit">
              Following
            </Button>
          </div>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item className="bg-dark border-secondary mt-3 rounded-pill">
        <Row>
          <Col sm={1}>
            <Image
              className="bg-transparent mb-3"
              src={photo}
              roundedCircle
              alt="user pic"
              height="70"
              width="75"
            />
          </Col>
          <Col sm={8} className="mt-4 ml-2">
            <NavLink
              to="/secondUser"
              className="text-decoration-none text-light"
            >
              <h4>Jai Arora</h4>
            </NavLink>
          </Col>
          <div className="h-25 my-auto ml-auto mr-5">
            <Button variant="info" type="submit">
              Follow
            </Button>
          </div>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item className="bg-dark border-secondary mt-3 rounded-pill">
        <Row>
          <Col sm={1}>
            <Image
              className="bg-transparent mb-3"
              src={photo}
              roundedCircle
              alt="user pic"
              height="70"
              width="75"
            />
          </Col>
          <Col sm={8} className="mt-4 ml-2">
            <NavLink
              to="/secondUser"
              className="text-decoration-none text-light"
            >
              <h4>Utkarsh Bhardwaj</h4>
            </NavLink>
          </Col>
          <div className="h-25 ml-1 my-auto">
            <Button variant="info" type="submit">
              Message
            </Button>
          </div>
          <div className="h-25 ml-3 my-auto">
            <Button variant="info" type="submit">
              Following
            </Button>
          </div>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Followers;
