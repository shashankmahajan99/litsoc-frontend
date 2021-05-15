import React, { useState, useEffect, useContext } from "react";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SwipeDrawer from "../SwipeDrawer";
// import bg from "../photos/Endless-Constellation2.svg";
import bg from "../photos/video.mp4";

import Comments from "./Comment";
import axios from "../axios";
import moment from "moment";
import UserContext from "../context/UserContext";
import MyAudioPlayer from "./AudioPlayer/MyAudioPlayer";

const ViewPost = ({ match }) => {
  const [post, setPost] = useState();
  const { userData } = useContext(UserContext);
  const [userLiked, setUserLiked] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [postDisliked, setPostDisliked] = useState(false);
  const [relatedPost, setRelatedPost] = useState(undefined);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://app-litsoc.herokuapp.com/post/${match.params.id}`
        );
        if (res.data.similarPosts.length > 0) {
          let relPost =
            res.data.similarPosts[
              Math.floor(
                Math.random() * (res.data.similarPosts.length - 0 + 1)
              ) + 0
            ];
          axios
            .get(
              `https://app-litsoc.herokuapp.com/post/${
                relPost ? relPost.Post_Id : undefined
              }`
            )
            .then((data) => setRelatedPost(data.data));
        }
        setPost(res.data);
        userData.user
          ? axios.patch(
              `https://app-litsoc.herokuapp.com/post/views/${match.params.id}`,
              { user: userData.user.id }
            )
          : axios.patch(
              `https://app-litsoc.herokuapp.com/post/views/${match.params.id}`
            );
        setUserLiked(
          res.data.likes.includes(userData.user ? userData.user.id : null)
        );
        setUserDisliked(
          res.data.dislikes.includes(userData.user ? userData.user.id : null)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [match.params.id, userData.user]);
  const checkImage = (userImage, username) => {
    if (userImage === "true") {
      return `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${username}?alt=media`;
    }
    return "https://app-litsoc.herokuapp.com/image/guest";
  };
  if (post) {
    return (
      <div
        style={{
          // backgroundAttachment: "fixed",
          // backgroundImage: `url(${bg})`,
          backgroundColor: "#16161A",
        }}
      >
        {/* <video
          autoPlay
          muted
          loop
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            objectFit: "cover",
            transform: "translate(-50%,-50%)",
            zIndex: "-1",
          }}
        >
          <source src={bg} type="video/mp4" />
        </video> */}
        <SwipeDrawer isFalse={1} />
        <div className="container mt-4 bg-primary text-light rounded">
          <div className="row">
            {/* <!-- Post Content Column --> */}
            <div className="col-lg-8">
              {/* <!-- Title --> */}
              <h1 className="mt-4 font-weight-bold font-xs-130">
                {post.title}
              </h1>
              {/* <!-- Author --> */}
              <h5 className="text-info text-decoration-none font-xs-100">
                {post.category[0]}
                {post.category[1] ? " | " + post.category[1] : ""}
              </h5>
              <hr className="bg-light" />
              <div className="container">
                <div className="row">
                  <div className="col-6 pl-0">
                    <a
                      href={`/secondUser/${post.userid}`}
                      className="text-decoration-none text-light font-xs-100"
                    >
                      <h5>{post.name}</h5>
                    </a>
                  </div>
                  {/* <!-- Date/Time --> */}
                  <div className="col-6 text-right font-xs-100 pr-0">
                    <p>Posted on {moment(post.time).format("LLL")}</p>
                  </div>
                </div>
                {/* <!-- Post Content --> */}
              </div>
              <hr className="bg-light" />
              <div className="font-weight-normal font-xs-100 text-secondary">
                <p>Post Description - "{post.description}"</p>
              </div>
              <hr className="bg-light" />
              {/* <!-- Preview Image --> */}
              {/* <ReactAudioPlayer
                    src={`https://app-litsoc.herokuapp.com/files/${post.fileName}`}
                    controls
                    controlsList="nodownload"
                    volume={0.5}
                    onListen={handleViews}
                    onCanPlay={() => {
                      setCanPlay(true);
                    }}
                  /> */}
              <MyAudioPlayer filename={post.fileName} postId={post._id} />
              <div className="row">
                <div className="col-lg-3 col-12 mt-3 my-lg-auto">
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
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className="text-danger"
                        />
                      )
                    ) : postLiked ? (
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="text-danger"
                      />
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
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className="text-danger"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faThumbsDown} />
                    )}
                  </Button>
                </div>
                <div className="col-lg-2"></div>
              </div>
              <hr className="bg-light" />
              {/* <!-- Comments Form --> */}
              <div className="media mt-4">
                <div className="media-body">
                  <Comments postId={match.params.id} />
                </div>
              </div>
            </div>

            {/* <!-- Sidebar Widgets Column --> */}
            <div className="col-md-4">
              <div className="card my-4 bg-dark text-light">
                <h5 className="card-header border-secondary">Tags</h5>
                <div className="card-body">
                  <h6>
                    {post.genres.map((genre) => (
                      <Badge pill className="mx-2 mt-1" variant="info">
                        {genre}
                      </Badge>
                    ))}
                  </h6>
                </div>
              </div>
              {/* <!-- Side Widget --> */}
              {relatedPost ? (
                <div className="card my-4 bg-dark">
                  <h5 className="card-header border-secondary text-light">
                    Related Post
                  </h5>
                  <div className="card-body">
                    <Link
                      to={`/viewpost/${relatedPost._id}`}
                      className="text-decoration-none"
                    >
                      <h4 className="font-weight-bold card-headline font-xs-130">
                        {relatedPost.title}
                      </h4>
                    </Link>
                    <h6 className="text-muted card-paragraph font-xs-100">
                      {relatedPost.category && relatedPost.category[0]}{" "}
                      {relatedPost.category && relatedPost.category[1]
                        ? "| " + relatedPost.category[1]
                        : ""}
                    </h6>
                    <div className="font-weight-normal text-secondary font-xs-100">
                      <p>
                        Description -{" "}
                        {relatedPost.description
                          ? relatedPost.description.slice(0, 400)
                          : null}
                        ...
                        <strong>
                          <Link
                            to={`/viewpost/${relatedPost._id}`}
                            className="text-light"
                          >
                            Read More
                          </Link>
                        </strong>
                      </p>
                    </div>
                    <h6>
                      {relatedPost.genres &&
                        relatedPost.genres.map((genre) => (
                          <Badge pill className="mx-2 mt-1 p-1" variant="info">
                            {genre}
                          </Badge>
                        ))}
                    </h6>
                    <div className="row">
                      <div className="col-5">
                        <Image
                          src={checkImage(
                            relatedPost.userImage,
                            relatedPost.username
                          )}
                          roundedCircle
                          height="120"
                          className="mr-md-3 my-2 postProfilePic"
                          width="120"
                        />
                      </div>
                      <div className="col-7 my-auto">
                        <Link
                          to={`/secondUser/${relatedPost.userid}`}
                          className="text-decoration-none"
                        >
                          <h5 className="font-weight-bold text-light">
                            {relatedPost.name}
                          </h5>
                        </Link>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {/* <!-- /.row --> */}
        </div>
      </div>
    );
  }
  return (
    <div>
      Redirecting... if you are not redirect in 5 seconds please refresh the
      page.
    </div>
  );
};

export default ViewPost;
