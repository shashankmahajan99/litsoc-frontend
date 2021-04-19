import React, { useEffect, useState, useContext } from "react";
import axios from "../axios";
import UserContext from ".././context/UserContext";
const Notification = ({
  room,
  user,
  setNotification,
  notification,
  setBadge,
  badge,
}) => {
  const { userData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("auth-token");
      let req;
      if (room) {
        req = await axios.get(
          `https://chat-litsoc.herokuapp.com/chat/messages/${room}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setMessages(
          req.data.filter(
            (oldMessage) =>
              oldMessage.username !== userData.user.username &&
              oldMessage.readStatus === false
          )
        );
      }
    };
    fetchData();
  }, [room, userData.user]);
  useEffect(() => {
    console.log(messages);
    if (messages.length > 0) {
      setNotification((prevState) => [
        ...prevState,
        { user: user, number: messages.length },
      ]);
      setBadge((prevState) => prevState + messages.length);
    }
  }, [messages.length, user, setBadge, setNotification]);
  return null;
};
export default Notification;
