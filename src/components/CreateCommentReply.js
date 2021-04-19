import React, { useState } from "react";
import axios from "../axios";
import { Button, Form } from "react-bootstrap";

const CreateCommentReply = ({ parentId, postId }) => {
  const [commentReply, setCommentReply] = useState("");
  const postComment = async () => {
    const token = localStorage.getItem("auth-token");
    await axios.patch(
      `https://app-litsoc.herokuapp.com/comment/reply/${parentId}`,
      { content: commentReply, postId: postId },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    setCommentReply("");
  };
  return (
    <Form>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write a reply."
          onChange={(e) => setCommentReply(e.target.value)}
          value={commentReply}
        />
      </Form.Group>
      <Button variant="info" onClick={postComment}>
        Reply
      </Button>
    </Form>
  );
};

export default CreateCommentReply;
