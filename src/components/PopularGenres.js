import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class PopularGenres extends React.Component {
  render() {
    return (
      <Card
        style={{ width: "14rem" }}
        className="mt-3"
        bg="primary"
        text="secondary"
      >
        <Card.Header as="h4">Popular Genres</Card.Header>
        <ListGroup bg="primary">
          <ListGroup.Item className="bg-dark">
            <a href="/" className="text-decoration-none text-light">
              Non Fiction
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark">
            <a href="/" className="text-decoration-none text-light">
              Romance
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark">
            <a href="/" className="text-decoration-none text-light">
              Horror
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark">
            <a href="/" className="text-decoration-none text-light">
              Science
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark">
            <a href="/" className="text-decoration-none text-light">
              Fiction
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark">
            <a href="/" className="text-decoration-none text-light">
              History
            </a>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default PopularGenres;
