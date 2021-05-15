import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import logo from "./photos/logo2.png";
import { Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import bg from "./photos/video.mp4";
const App = () => {
  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "-24px !important",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          height: "100vh",
          alignItems: "center",
          backgroundColor: "#16161A",
        }}
      >
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
        <div
          style={{
            width: "50%",
          }}
        >
          <h1 className="text-light">Welcome to </h1>
          <Image src={logo} alt="litsoc" width="200" height="200" rounded />
        </div>
        <div
          style={{
            marginTop: "2%",
          }}
        >
          {loading && (
            <FontAwesomeIcon
              className="text-info"
              icon={faSpinner}
              size="2x"
              pulse
            />
          )}
          {loading && <h5 className="text-light">Loading Content...</h5>}
          {!loading && (
            <NavLink to="/home">
              <Button variant="info">Get Started!</Button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
