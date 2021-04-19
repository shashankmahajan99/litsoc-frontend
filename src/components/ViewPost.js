import React, { useState, useEffect, useContext } from "react";
import photo from "../photos/livespace.jpg";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ReactAudioPlayer from "react-audio-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import SwipeDrawer from "../SwipeDrawer";
import bg from "../photos/Endless-Constellation2.svg";
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://app-litsoc.herokuapp.com/post/${match.params.id}`
        );
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

  if (post) {
    return (
      <div
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: `url(${bg})`,
        }}
      >
        <SwipeDrawer isFalse={1} />
        <div className="container bg-primary text-light rounded">
          <div className="row">
            {/* <!-- Post Content Column --> */}
            <div className="col-lg-8">
              {/* <!-- Title --> */}
              <h1 className="mt-4 font-weight-bold">{post.title}</h1>
              {/* <!-- Author --> */}
              <h5 className="text-light text-muted text-decoration-none">
                {post.category[0]}
                {post.category[1] ? "| " + post.category[1] : ""}
              </h5>
              <hr className="bg-light" />
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <a
                      href={`/secondUser/${post.userid}`}
                      className="text-decoration-none text-light"
                    >
                      <h5>{post.name}</h5>
                    </a>
                  </div>
                  {/* <!-- Date/Time --> */}
                  <div className="col-6 text-right">
                    <p>Posted on {moment(post.time).format("LLL")}</p>
                  </div>
                </div>
                {/* <!-- Post Content --> */}
              </div>
              <hr className="bg-light" />
              <div className="font-weight-normal font-small text-secondary">
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
              <div className="card my-4 bg-dark">
                <h5 className="card-header border-secondary text-light">
                  Related Post
                </h5>
                <div className="card-body">
                  <NavLink to="/viewpost" className="text-decoration-none">
                    <h4 className="font-weight-bold card-headline">
                      Cosmos - Carl Sagan
                    </h4>
                  </NavLink>
                  <h6 className="text-muted card-paragraph">
                    Review | Analysis
                  </h6>
                  <div className="font-weight-normal font-small text-secondary">
                    <p>
                      Post Description - "Cosmos is a 1980 popular science book
                      by astronomer and Pulitzer Prize-winning author Carl
                      Sagan. Its 13 illustrated chapters, corresponding to the
                      13 episodes of the Cosmos TV series, which the book was
                      co-developed with and intended to complement, explore the
                      mutual development of science and civilization. One of
                      Sagan's main purposes for the book and television series
                      was to explain complex scientific ideas to anyone
                      interested in learning. "
                    </p>
                  </div>
                  <h6>
                    <Badge pill className="mx-2 mt-1" variant="info">
                      Non Fiction
                    </Badge>
                    <Badge pill className="mx-2 mt-1" variant="info">
                      Science
                    </Badge>
                    <Badge pill className="mx-2 mt-1" variant="info">
                      Space
                    </Badge>
                    <Badge pill className="mx-2 mt-1" variant="info">
                      Physics
                    </Badge>
                    <Badge pill className="mx-2 mt-1" variant="info">
                      Astronomy
                    </Badge>
                  </h6>
                  <div className="row">
                    <div className="col-5">
                      <Image
                        src={photo}
                        roundedCircle
                        height="110"
                        width="120"
                      />
                    </div>
                    <div className="col-7 my-auto">
                      <NavLink
                        to="/secondUser"
                        className="text-decoration-none"
                      >
                        <h5 className="font-weight-bold text-light">
                          Jenny Scott
                        </h5>
                      </NavLink>
                    </div>
                  </div>
                  <br />
                  <a
                    href="/"
                    className="ml-2 mr-5 text-light text-decoration-none"
                  >
                    <FontAwesomeIcon icon={faCommentAlt} /> 45 Comments
                  </a>
                </div>
              </div>
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
