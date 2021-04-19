import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";
import axios from "../../axios";
import "./Messages.css";

const Messages = ({ messages, name, room }) => {
  const [oldMessages, setOldMessages] = useState();
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
        req.data.map((oldMessage) => {
          if (oldMessage.username !== name && oldMessage.readStatus === false) {
            axios.patch(
              "https://chat-litsoc.herokuapp.com/chat/message/update",
              { secondUser: oldMessage.username, readStatus: true },
              {
                headers: {
                  "x-auth-token": token,
                },
              }
            );
          }
          messages.push(oldMessage);
        });
        setOldMessages(req.data);
      }
    };
    fetchData();
  }, [room]);
  if (oldMessages) {
    return messages.length > 0 ? (
      <ScrollToBottom className="messages" followButtonClassName="scrollButton">
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
      </ScrollToBottom>
    ) : (
      <div className="messages">
        <h4 className="text-light pl-3">
          Start the conversation by saying hello!
        </h4>
      </div>
    );
  } else
    return (
      <div className="messages">
        <h4 className="text-light pl-3">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading...
        </h4>
      </div>
    );
};

export default Messages;
