import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import axios from "../../axios";
import SwipeDrawer from "../../SwipeDrawer";
import UserContext from "../../context/UserContext";

import "./Chat.css";

const ENDPOINT = "https://chat-litsoc.herokuapp.com/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState("");
  const [users, setUsers] = useState("");
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const { name, room, otherUser } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setOtherUser(otherUser);
    setRoom(room);
    setName(name);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    return () => {
      socket.close();
    };
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("auth-token");
    if (message && message.trim().length) {
      socket.emit("sendMessage", message, async () => {
        setMessage("");
        await axios.post(
          "https://chat-litsoc.herokuapp.com/chat/messages",
          {
            message: message,
            room: room,
            readStatus: users.length > 1 ? true : false,
            receiver: otherUser,
          },
          { headers: { "x-auth-token": token } }
        );
      });
    }
  };

  return (
    <div className="outerContainer">
      <SwipeDrawer isFalse={1} />
      <div className="innerContainer">
        <InfoBar room={room} otherUser={otherUser} />
        <Messages messages={messages} name={name} room={room} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
