import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class Create_post extends React.Component {
  render() {
    return (
      <Container className="my-3 py-2 rounded bg-dark shadow-lg">
        <Form>
          <br />
          <h2 className="text-light font-weight-bold">Create Post</h2>
          <br />
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">Title :</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Post Title | Max 240 characters"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">Category :</Form.Label>
            <Form.Control as="select" defaultValue="Summary">
              <option>Summary</option>
              <option>Book</option>
              <option>Podcast</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">Description :</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Post Description | Max 1000 characters"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">Genre :</Form.Label>
            <Form.Control as="select" defaultValue="Philosophy">
              <option>Philosophy</option>
              <option>Non Fiction</option>
              <option>Romance</option>
              <option>Horror</option>
              <option>Fiction</option>
              <option>History</option>
            </Form.Control>
          </Form.Group>
          <Form.File>
            <Form.File className="font-weight-bold text-light" label="Upload Audio :" />
          </Form.File>
          <Button className="mt-3" variant="info" type="submit">
            Create Post
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Create_post;
