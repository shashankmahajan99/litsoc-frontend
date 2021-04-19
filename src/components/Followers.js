import ListGroup from "react-bootstrap/ListGroup";
import photo from "../photos/guest.png";
import Image from "react-bootstrap/Image";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect, useContext } from "react";
import axios from "../axios";
import UserContext from ".././context/UserContext";

const Followers = ({ otherUser }) => {
  const [user, setUser] = useState({});
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      const id = userData.user.id;
      const res = await axios.get(
        `https://app-litsoc.herokuapp.com/user/${id}`
      );
      setUser(otherUser ? otherUser : res.data);
    };
    fetchUser();
  }, [userData, otherUser]);
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="bg-dark border-secondary mt-3">
        {user.followers &&
          user.followers.map((username) =>
            // If followers array contain any people following the user then send `initialFollow` as true or else false
            otherUser ? (
              userData.user.following.includes(username) ? (
                <Follower
                  key={user.id}
                  username={username}
                  initialFollow={true}
                />
              ) : (
                <Follower
                  key={user.id}
                  username={username}
                  initialFollow={false}
                />
              )
            ) : user.following.includes(username) ? (
              <Follower
                key={user.id}
                username={username}
                initialFollow={true}
              />
            ) : (
              <Follower
                key={user.id}
                username={username}
                initialFollow={false}
              />
            )
          )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Followers;

const Follower = ({ username, initialFollow }) => {
  const [secondUser, setSecondUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(initialFollow);
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://app-litsoc.herokuapp.com/user/username/${username}`
      );
      setSecondUser(res.data);
    };
    fetchUser();
  }, [username]);
  const hashGenerator = (user) => {
    let hash = 0,
      i,
      chr;
    if (user)
      for (i = 0; i < user.length; i++) {
        chr = user.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }
    return hash + 2147483647 + 1;
  };
  const follow = async (username) => {
    const token = localStorage.getItem("auth-token");
    await axios
      .patch(
        `http://app-litsoc.herokuapp.com/user/addFollower/${username}`,
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(
        (response) => {
          userData.user.following.push(username);
          setUserData({
            ...userData,
            user: {
              ...userData.user,
              following: userData.user.following,
            },
          });
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const unfollow = async (username) => {
    const token = localStorage.getItem("auth-token");
    await axios
      .patch(
        `http://app-litsoc.herokuapp.com/user/deleteFollower/${username}`,
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(
        (response) => {
          setUserData({
            ...userData,
            user: {
              ...userData.user,
              following: userData.user.following.filter(
                (item) => item !== username
              ),
            },
          });
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const handleFollowButton = () => {
    if (isFollowed === false) {
      setIsFollowed(true);
      follow(secondUser.username);
    } else {
      setIsFollowed(false);
      unfollow(secondUser.username);
    }
  };
  return (
    <>
      <Row>
        <Col sm={1}>
          <Image
            className="bg-transparent mb-3"
            src={
              secondUser.imgId !== "false"
                ? `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${secondUser.username}?alt=media`
                : photo
            }
            roundedCircle
            alt="user pic"
            height="70"
            width="75"
          />
        </Col>
        <Col sm={8} className="mt-4 ml-2">
          <NavLink
            to={`/secondUser/${secondUser.id}`}
            className="text-decoration-none text-light"
          >
            <h5>
              {secondUser.firstName} {secondUser.lastName}
            </h5>
          </NavLink>
        </Col>
        <div className="h-25 ml-1 my-auto">
          <NavLink
            onClick={(event) => (userData.user ? null : event.preventDefault())}
            to={{
              pathname: "/chat",
              search: `?name=${userData.user.username}&room=${
                hashGenerator(userData.user.username) +
                hashGenerator(secondUser.username)
              }&otherUser=${secondUser.username}`,
            }}
          >
            <Button variant="info" type="submit">
              Message
            </Button>
          </NavLink>
        </div>
        <div className="h-25 ml-3 my-auto">
          <Button variant="info" type="submit" onClick={handleFollowButton}>
            {isFollowed ? "following" : "follow"}
          </Button>
        </div>
      </Row>
    </>
  );
};
