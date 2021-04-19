import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import axios from "../axios";
import moment from "moment";
import { Button, Col, Container, Row } from "react-bootstrap";

const UserComments = ({ username }) => {
  const [comments, setComments] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const commentRes = await axios.get(
        `https://app-litsoc.herokuapp.com/comment/all?username=${username}`
      );
      setComments(commentRes.data);
    };
    fetchData();
  }, [username]);

  const checkImage = (userImage, username) => {
    if (userImage !== "false") {
      return `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${username}?alt=media`;
    }
    return "https://app-litsoc.herokuapp.com/image/guest";
  };
  if (comments)
    return comments.map((comment) => (
      <Container className="my-3 py-md-2 rounded bg-dark shadow-lg" fluid>
        <Row>
          <Col sm={12}>
            <div className="card bg-dark border-0">
              <div className="card-body">
                <hr className="bg-light" />
                <div className="row my-2">
                  <div className="col-md-2 col-3">
                    <Image
                      src={checkImage(comment.userImage, username)}
                      roundedCircle
                      fluid
                      style={{ aspectRatio: "16/9" }}
                    />
                    <p className="text-muted text-center small">
                      {moment(comment.time).format("lll")}
                    </p>
                  </div>
                  <div className="col-md-10 col-9">
                    <p>
                      <a
                        className="float-left text-light text-decoration-none"
                        href={`/secondUser/${comment.userId}`}
                      >
                        <strong>{comment.username}</strong>
                      </a>
                    </p>
                    <div className="clearfix"></div>
                    <h5 className="text-light">{comment.content}</h5>
                  </div>
                  <Button
                    href={`/viewpost/${comment.postId}`}
                    className="text-decoration-none text-light"
                  >
                    <h6>View Post</h6>
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    ));
  else return <div>Loading...</div>;
};

export default UserComments;
