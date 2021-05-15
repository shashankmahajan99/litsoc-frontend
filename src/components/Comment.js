import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import axios from "../axios";
import moment from "moment";
import { Accordion, Image, Button } from "react-bootstrap";
import CommentReply from "./CommentReply";
import CreateComment from "./CreateComment";
import CreateCommentReply from "./CreateCommentReply";
const Comments = ({ postId }) => {
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const comments = await axios.get(
        `https://app-litsoc.herokuapp.com/comment/all/${postId}`
      );
      setComments(comments.data);
    };
    fetchData();
  }, []);

  const checkImage = (userImage, username) => {
    if (userImage !== "false") {
      return `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${username}?alt=media`;
    }
    return "https://app-litsoc.herokuapp.com/image/guest";
  };
  if (comments)
    return (
      <div className="container bg-dark">
        <CreateComment postId={postId} />
        {comments.map((comment) => (
          <div className="card bg-dark border-0">
            <div className="card-body">
              <hr className="bg-light" />
              <div className="row my-2">
                <div className="col-md-2 col-3">
                  <Image
                    src={checkImage(comment.userImage, comment.username)}
                    roundedCircle
                    width="90"
                    height="90"
                    className="commentPic"
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
                  <p>{comment.content}</p>
                  <Accordion>
                    <Accordion.Toggle
                      eventKey="0"
                      className="btn btn-outline-secondary text-light"
                    >
                      <FontAwesomeIcon icon={faReply} /> Reply
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" className="mt-3">
                      <CreateCommentReply
                        parentId={comment._id}
                        postId={postId}
                      />
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              </div>
              <Accordion>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  className="text-decoration-none text-light"
                >
                  <h6>View Replies</h6>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <CommentReply parentId={comment._id} />
                </Accordion.Collapse>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    );
  else return <div>Loading...</div>;
};

export default Comments;
