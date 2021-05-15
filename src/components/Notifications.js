import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from ".././context/UserContext";
import Notification from "./Notification";
import { NavLink } from "react-router-dom";
import {
  Col,
  Row,
  Badge,
  Toast,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notifications = () => {
  const { userData } = useContext(UserContext);
  const [recentChats, setRecentChats] = useState();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([1, 3]);
  const [badge, setBadge] = useState(0);
  const [notification, setNotification] = useState([]);
  const notificationToastRef = useRef();

  useEffect(() => {
    if (userData.user) {
      setRecentChats(
        userData.user.followers.filter(
          (username) => username && userData.user.following.includes(username)
        )
      );
    }
  }, [userData.user]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationToastRef.current &&
        !notificationToastRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationToastRef]);
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
  if (userData.user && recentChats)
    return (
      <div className="ml-3">
        <Col>
          <Row
            style={{
              position: "relative",
            }}
            className="float-right"
          >
            <ToggleButtonGroup
              type="checkbox"
              value={value}
              onChange={() => setShow(!show)}
            >
              <ToggleButton value={false}>
                <FontAwesomeIcon icon={faBell} />
                <Badge variant="danger">
                  {recentChats.map((user, index) => (
                    <Notification
                      key={index}
                      room={
                        hashGenerator(userData.user.username) +
                        hashGenerator(user)
                      }
                      user={user}
                      setNotification={setNotification}
                      notification={notification}
                      setBadge={setBadge}
                      badge={badge}
                    />
                  ))}
                  {badge}
                </Badge>
              </ToggleButton>
            </ToggleButtonGroup>
          </Row>
          <Row>
            <Toast
              style={{
                position: "absolute",
                top: 45,
                right: 0,
                background: "white",
                width: 250,
              }}
              onClose={() => setShow(false)}
              show={show}
              ref={notificationToastRef}
            >
              <Toast.Header className="text-info">
                <strong className="ml-auto">Notifications</strong>
              </Toast.Header>
              <Toast.Body className="text-primary">
                {notification.length > 0 ? (
                  notification.map((item, index) => (
                    <div>
                      <NavLink
                        key={index}
                        to={{
                          pathname: "/chat",
                          search: `?name=${userData.user.username}&room=${
                            hashGenerator(userData.user.username) +
                            hashGenerator(item.user)
                          }&otherUser=${item.user}`,
                        }}
                      >
                        ( {item.number} ) new messages from {item.user}
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div>No new notifications</div>
                )}
              </Toast.Body>
            </Toast>
          </Row>
          <Divider />
        </Col>
      </div>
    );
  else return <div>No new notifications</div>;
};

export default Notifications;
