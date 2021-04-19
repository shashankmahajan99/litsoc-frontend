import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";
import moment from "moment";
const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (message.username === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{moment(message.time).format("LT")}</p>
      <div className="messageBox backgroundPurple">
        <p className="messageText colorWhite">
          {ReactEmoji.emojify(message.content)}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(message.content)}
        </p>
      </div>
      <p className="sentText pl-10 ">{moment(message.time).format("LT")}</p>
    </div>
  );
};

export default Message;
