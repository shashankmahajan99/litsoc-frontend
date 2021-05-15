import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import { NavLink } from "react-router-dom";
import "./InfoBar.css";

const InfoBar = ({ otherUser }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img
        className="onlineIcon onlineIcon"
        src={onlineIcon}
        alt="online icon"
      />
      <h3>{otherUser}</h3>
    </div>
    <div className="rightInnerContainer">
      <NavLink to="/chats">
        <img src={closeIcon} alt="close icon" />
      </NavLink>
    </div>
  </div>
);

export default InfoBar;
