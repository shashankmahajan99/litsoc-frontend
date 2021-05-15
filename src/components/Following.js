import ListGroup from "react-bootstrap/ListGroup";
import photo from "../photos/guest.png";
import Image from "react-bootstrap/Image";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect, useContext } from "react";
import axios from "../axios";
import UserContext from ".././context/UserContext";
import { Divider } from "@material-ui/core";

const Following = ({ otherUser }) => {
  const [user, setUser] = useState({});
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      const id = userData.user ? userData.user.id : undefined;
      let res = id
        ? await axios.get(`https://app-litsoc.herokuapp.com/user/${id}`)
        : null;
      setUser(otherUser ? otherUser : res.data);
    };
    fetchUser();
  }, [userData, otherUser]);

  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="bg-dark border-secondary mt-3">
        {user.following &&
          user.following.map((username) =>
            otherUser && userData.user ? (
              userData.user.following.includes(username) ? (
                <PersonFollowed
                  key={user.id}
                  username={username}
                  initialFollow={true}
                />
              ) : (
                <PersonFollowed
                  key={user.id}
                  username={username}
                  initialFollow={false}
                />
              )
            ) : (
              <PersonFollowed
                key={user.id}
                username={username}
                initialFollow={true}
              />
            )
          )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Following;

const PersonFollowed = ({ username, initialFollow }) => {
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
        `https://app-litsoc.herokuapp.com/user/addFollower/${username}`,
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(
        (response) => {
          if (userData.user) {
            userData.user.following.push(username);
            setUserData({
              ...userData,
              user: {
                ...userData.user,
                following: userData.user.following,
              },
            });
          }
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
        `https://app-litsoc.herokuapp.com/user/deleteFollower/${username}`,
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(
        (response) => {
          if (userData.user) {
            setUserData({
              ...userData,
              user: {
                ...userData.user,
                following: userData.user.following.filter(
                  (item) => item !== username
                ),
              },
            });
          }
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const handleFollowButton = () => {
    if (isFollowed === false) {
      console.log("added");
      setIsFollowed(true);
      follow(secondUser.username);
    } else {
      console.log("deleted");
      setIsFollowed(false);
      unfollow(secondUser.username);
    }
  };
  return (
    <>
      <Row>
        <Col xs={4} sm={1}>
          <Image
            className="bg-transparent mb-sm-3"
            src={
              secondUser.imgId !== "false"
                ? `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${secondUser.username}?alt=media`
                : photo
            }
            roundedCircle
            alt="user pic"
            height="90"
            width="90"
          />
        </Col>
        <Col xs={4} sm={7} className="mt-sm-4 ml-sm-2">
          <NavLink
            to={`/secondUser/${secondUser.id}`}
            className="text-decoration-none text-light"
          >
            <h5>
              {secondUser.firstName} {secondUser.lastName}
            </h5>
          </NavLink>
        </Col>
        <Col xs={4} sm={3}>
          <div className="h-25 my-auto">
            {userData.user ? (
              secondUser.username !== userData.user.username ? (
                <Button
                  variant="info"
                  type="submit"
                  className="my-2 my-sm-0"
                  onClick={handleFollowButton}
                >
                  {isFollowed ? "following" : "follow"}
                </Button>
              ) : null
            ) : null}
            <NavLink
              onClick={(event) =>
                userData.user ? null : event.preventDefault()
              }
              to={{
                pathname: "/chat",
                search: `?name=${
                  userData.user ? userData.user.username : null
                }&room=${
                  hashGenerator(userData.user ? userData.user.username : null) +
                  hashGenerator(secondUser.username)
                }&otherUser=${secondUser.username}`,
              }}
            >
              {isFollowed ? (
                <Button
                  variant="info"
                  type="submit"
                  className="ml-sm-2 mb-2 mb-sm-0"
                >
                  Message
                </Button>
              ) : null}
            </NavLink>
          </div>
        </Col>
      </Row>
      <Divider className="bg-light mb-3" />
    </>
  );
};
