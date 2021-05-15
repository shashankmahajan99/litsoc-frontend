import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Accordion, Button, Image } from "react-bootstrap";
import moment from "moment";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateCommentReply from "./CreateCommentReply";
const CommentReply = ({ parentId }) => {
  const [replies, setReplies] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://app-litsoc.herokuapp.com/comment/reply/all/${parentId}`
      );
      setReplies(res.data);
    };
    fetchData();
  }, [parentId]);
  const checkImage = (userImage, username) => {
    if (userImage !== "false") {
      return `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${username}?alt=media`;
    }
    return "https://app-litsoc.herokuapp.com/image/guest";
  };
  if (replies)
    return (
      <>
        {replies.map((reply) => (
          <div className="card card-inner mb-2 bg-dark  border-0">
            <div className="card-body">
              <hr className="bg-light" />
              <div className="row mb-2">
                <div className="col-md-2 col-3">
                  <Image
                    src={checkImage(reply.userImage, reply.username)}
                    roundedCircle
                    width="90"
                    height="90"
                    className="commentPic"
                  />
                  <p className="text-muted text-center small">
                    {moment(reply.time).format("lll")}
                  </p>
                </div>
                <div className="col-md-10 col-9">
                  <p>
                    <a
                      className="float-left text-light text-decoration-none"
                      href={`/secondUser/${reply.userId}`}
                    >
                      <strong>{reply.username}</strong>
                    </a>
                  </p>
                  <div className="clearfix"></div>
                  <p>{reply.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  else return <div>Loading...</div>;
};

export default CommentReply;
