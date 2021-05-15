import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import MyAudioPlayer from "./AudioPlayer/MyAudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../axios";
import UserContext from ".././context/UserContext";
import Button from "react-bootstrap/Button";
import firebaseStorage from "../base.js";

const Post = ({ post, myProfile }) => {
  const { userData } = useContext(UserContext);
  const [userLiked, setUserLiked] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [postDisliked, setPostDisliked] = useState(false);
  const [comments, setComments] = useState();
  const [commentReplies, setCommentReplies] = useState();
  const [canPlay, setCanPlay] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setUserLiked(
        post.likes.includes(userData.user ? userData.user.id : null)
      );
      setUserDisliked(
        post.dislikes.includes(userData.user ? userData.user.id : null)
      );
      const commentRes = await axios.get(
        `https://app-litsoc.herokuapp.com/comment/all/${post._id}`
      );
      commentRes.data.map((comment) =>
        axios
          .get(
            `https://app-litsoc.herokuapp.com/comment/reply/all/${comment._id}`
          )
          .then((res) => {
            setCommentReplies(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      );
      setComments(commentRes.data);
    };
    fetchData();
  }, [post, userData.user]);

  const checkImage = (userImage, username) => {
    if (userImage === "true") {
      return `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${username}?alt=media`;
    }
    return "https://app-litsoc.herokuapp.com/image/guest";
  };

  const handleDelete = () => {
    axios.delete(`https://app-litsoc.herokuapp.com/post/${post._id}`, {
      headers: { "x-auth-token": userData.token },
    });
    firebaseStorage.storage().ref().child(post.fileName).delete();
  };
  return (
    <Container className="my-3 py-md-2 rounded bg-dark shadow-lg" fluid={1}>
      <Row>
        <Col xs={2} sm={1} className="px-3">
          <div className="row justify-content-center">
            <Link
              to={`/secondUser/${post.userid}`}
              className="text-decoration-none"
            >
              <Image
                src={checkImage(post.userImage, post.username)}
                roundedCircle
                height="60"
                className="mx-sm-auto my-2 postProfilePic"
                width="60"
              />
            </Link>
          </div>
        </Col>
        <Col xs={10} sm={11} className="border-left">
          <div className="row">
            <Link
              to={`/secondUser/${post.userid}`}
              className="text-decoration-none"
            >
              <h6 className="font-weight-bold text-light ml-3 my-4 my-sm-0">
                {post.name} <span className="text-muted">@{post.username}</span>
              </h6>
            </Link>
            {myProfile ? (
              <Button
                onClick={handleDelete}
                className="mt-2 mt-sm-0 ml-auto mr-2"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            ) : null}
          </div>
          <Link to={`/viewpost/${post._id}`} className="text-decoration-none">
            <h4 className="font-weight-bold card-headline font-xs-130">
              {post.title}
            </h4>
          </Link>
          <h6 className="text-info card-paragraph">
            {post.category[0]} {post.category[1] ? "| " + post.category[1] : ""}
          </h6>
          <div className="font-weight-normal text-secondary font-xs-100">
            <p>
              Description - {post.description.slice(0, 400)}...
              <strong>
                <Link to={`/viewpost/${post._id}`} className="text-light">
                  Read More
                </Link>
              </strong>
            </p>
          </div>
          <h6>
            {post.genres.map((genre) => (
              <Badge pill className="mx-2 mt-1 p-1" variant="info">
                {genre}
              </Badge>
            ))}
          </h6>
        </Col>
      </Row>
      <Row>
        <Col xs={2} sm={1} className="px-3"></Col>
        <Col xs={10} sm={7} className="border-left">
          {/* <ReactAudioPlayer
            src={`https://app-litsoc.herokuapp.com/files/${post.fileName}`}
            controls
            controlsList="nodownload"
            volume={0.5}
            className="ml-auto"
            onListen={handleViews}
            onCanPlay={() => {
              setCanPlay(true);
            }}
          /> */}
          <MyAudioPlayer filename={post.fileName} postId={post._id} />
        </Col>
        <Col
          xs={{ span: 10, order: "last" }}
          sm={{ span: 3 }}
          className="mt-lg-3 mb-3 mb-sm-0"
        >
          <ButtonGroup>
            <Button
              className="mr-1 text-light bg-primary border-dark text-decoration-none"
              onClick={() => {
                const token = localStorage.getItem("auth-token");
                axios
                  .patch(
                    `https://app-litsoc.herokuapp.com/post/likes/${post._id}`,
                    null,
                    { headers: { "x-auth-token": token } }
                  )
                  .then((res) => {
                    setPostLiked((prevState) => !prevState);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {userLiked ? (
                postLiked ? (
                  <FontAwesomeIcon icon={faThumbsUp} />
                ) : (
                  <FontAwesomeIcon icon={faThumbsUp} className="text-danger" />
                )
              ) : postLiked ? (
                <FontAwesomeIcon icon={faThumbsUp} className="text-danger" />
              ) : (
                <FontAwesomeIcon icon={faThumbsUp} />
              )}{" "}
              {userLiked
                ? postLiked
                  ? post.likes.length - 1
                  : post.likes.length
                : postLiked
                ? post.likes.length + 1
                : post.likes.length}
            </Button>
            <Button
              className="mr-1 text-light bg-primary border-dark text-decoration-none"
              onClick={() => {
                const token = localStorage.getItem("auth-token");
                axios
                  .patch(
                    `https://app-litsoc.herokuapp.com/post/dislikes/${post._id}`,
                    null,
                    { headers: { "x-auth-token": token } }
                  )
                  .then((res) => {
                    setPostDisliked((prevState) => !prevState);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {userDisliked ? (
                postDisliked ? (
                  <FontAwesomeIcon icon={faThumbsDown} />
                ) : (
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className="text-danger"
                  />
                )
              ) : postDisliked ? (
                <FontAwesomeIcon icon={faThumbsDown} className="text-danger" />
              ) : (
                <FontAwesomeIcon icon={faThumbsDown} />
              )}{" "}
              {userDisliked
                ? postDisliked
                  ? post.dislikes.length - 1
                  : post.dislikes.length
                : postDisliked
                ? post.dislikes.length + 1
                : post.dislikes.length}
            </Button>
          </ButtonGroup>
          <Link to={`/viewpost/${post._id}`} className="text-decoration-none">
            <Button className="ml-1 bg-primary border-dark text-light text-decoration-none">
              <FontAwesomeIcon icon={faComments} />{" "}
              {comments && commentReplies
                ? comments.length + commentReplies.length
                : "0"}
            </Button>
          </Link>
        </Col>
        <Col
          xs={2}
          sm={{ span: 1, order: "last" }}
          className="px-3 px-sm-0"
        ></Col>
      </Row>
    </Container>
  );
};

export default Post;
