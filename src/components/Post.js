import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import MyAudioPlayer from "./AudioPlayer/MyAudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
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
    <Container className="my-3 py-md-2 rounded bg-dark shadow-lg" fluid>
      <Row>
        <Col sm={7} md={8} lg={9} xl={10}>
          <Link to={`/viewpost/${post._id}`} className="text-decoration-none">
            <h3 className="font-weight-bold card-headline">{post.title}</h3>
          </Link>
          <h6 className="text-info card-paragraph">
            {post.category[0]} {post.category[1] ? "| " + post.category[1] : ""}
          </h6>
          <h5 className="font-weight-normal font-smaller text-secondary">
            Description - {post.description.slice(0, 400)}...
            <strong>
              <Link to={`/viewpost/${post._id}`} className="text-light">
                Read More
              </Link>
            </strong>
          </h5>
          <h6>
            {post.genres.map((genre) => (
              <Badge pill className="mx-2 mt-1 p-1" variant="info">
                {genre}
              </Badge>
            ))}
          </h6>
        </Col>
        <Col sm={5} md={4} lg={3} xl={2}>
          <div className="row">
            {myProfile ? (
              <Button onClick={handleDelete} className="ml-auto mr-2">
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            ) : null}
          </div>
          <div className="row text-center">
            <div className="col-5">
              {
                <Image
                  src={checkImage(post.userImage, post.username)}
                  roundedCircle
                  height="120"
                  className="mr-md-3 my-2"
                  width="120"
                />
              }
            </div>
            <div className="col-7 my-auto col-md-12">
              <Link
                to={`/secondUser/${post.userid}`}
                className="text-decoration-none"
              >
                <h5 className="font-weight-bold text-light">{post.name}</h5>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-lg-3 mx-lg-2">
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
              {userLiked
                ? postLiked
                  ? post.likes.length - 1
                  : post.likes.length
                : postLiked
                ? post.likes.length + 1
                : post.likes.length}{" "}
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
              )}
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
              {userDisliked
                ? postDisliked
                  ? post.dislikes.length - 1
                  : post.dislikes.length
                : postDisliked
                ? post.dislikes.length + 1
                : post.dislikes.length}{" "}
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
              )}
            </Button>
          </ButtonGroup>
          <Link to={`/viewpost/${post._id}`} className="text-decoration-none">
            <Button className="ml-1 bg-primary border-dark text-light text-decoration-none">
              <FontAwesomeIcon icon={faCommentAlt} />{" "}
              {comments && commentReplies
                ? comments.length + commentReplies.length
                : "0"}{" "}
              Comments
            </Button>
          </Link>
        </Col>
        <Col>
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
      </Row>
    </Container>
  );
};

export default Post;
