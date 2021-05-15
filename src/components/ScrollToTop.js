import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <FontAwesomeIcon
      icon={faArrowCircleUp}
      onClick={scrollToTop}
      size="lg"
      className="text-info"
      style={{
        display: visible ? "inline" : "none",
        position: "fixed",
        left: "96%",
        bottom: "10px",
        zIndex: "1",
        cursor: "pointer",
      }}
    />
  );
};

export default ScrollButton;
