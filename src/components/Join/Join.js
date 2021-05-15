import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import SwipeDrawer from "../../SwipeDrawer";
import { NavLink } from "react-router-dom";
import "./Join.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import bg from "../../photos/video.mp4";

const JoinChat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const { userData } = useContext(UserContext);
  const [recentChats, setRecentChats] = useState();
  const hashGenerator = (user) => {
    let hash = 0,
      i,
      chr;
    for (i = 0; i < user.length; i++) {
      chr = user.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash + 2147483647 + 1;
  };
  useEffect(() => {
    if (userData.user) {
      setName(userData.user.username);
      setRecentChats(
        userData.user.followers.filter(
          (username) => username && userData.user.following.includes(username)
        )
      );
    }
  }, [userData.user]);
  return (
    <>
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
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Litsoc Chat</h1>
          {userData.user && recentChats ? (
            recentChats.map((user, index) => (
              <NavLink
                key={index}
                onClick={(event) =>
                  userData.user ? null : event.preventDefault()
                }
                to={{
                  pathname: "/chat",
                  search: `?name=${name}&room=${
                    hashGenerator(userData.user.username) + hashGenerator(user)
                  }&otherUser=${user}`,
                }}
              >
                <button className="button mt-2" type="submit">
                  {user}
                </button>
              </NavLink>
            ))
          ) : (
            <FontAwesomeIcon icon={faSpinner} className="text-light" spin />
          )}
        </div>
      </div>
    </>
  );
};
export default JoinChat;
