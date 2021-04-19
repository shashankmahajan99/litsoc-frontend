import React, { useState } from "react";
import axios from "../axios";
import { Button, Form } from "react-bootstrap";

const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState("");
  const postComment = async () => {
    const token = localStorage.getItem("auth-token");
    await axios.post(
      `https://app-litsoc.herokuapp.com/comment/${postId}`,
      { content: comment },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    setComment("");
  };
  return (
    <Form>
      <Form.Group>
        <Form.Label className="font-weight-bold text-light mt-3">
          <h4>Comment :</h4>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write a comment."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </Form.Group>
      <Button variant="info" onClick={postComment}>
        Comment
      </Button>
    </Form>
  );
};

export default CreateComment;
