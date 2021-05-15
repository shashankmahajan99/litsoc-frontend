import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Posts from "./Posts";
import photo from "../photos/guest.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeDrawer from "../SwipeDrawer";
// import bg from "../photos/Endless-Constellation2.svg";
import bg from "../photos/video.mp4";
import Followers from "./Followers";
import Following from "./Following";
import axios from "../axios";
import UserContext from ".././context/UserContext";
import { NavLink } from "react-router-dom";
import UserComments from "./UserComments";

const SecondUser = ({ match }) => {
  const [value, setValue] = useState(0);
  const [secondUserData, setSecondUserData] = useState({});
  // `Follow` Button State
  const [isFollowed, setIsFollowed] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://app-litsoc.herokuapp.com/user/${match.params.id}`
      );
      setSecondUserData(res.data);
      if (userData.user) {
        if (res.data.followers.includes(userData.user.username)) {
          setIsFollowed(true);
        }
      }
    };
    fetchUser();
  }, [match.params.id, userData.user]);
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 0,
      height: width > 768 ? 450 : "auto",
    },
    root2: {
      flexGrow: 1,
    },
    tabs: {
      alignItems: "center",
      borderRight: `1px solid ${theme.palette.divider}`,
      color: "white",
    },
  }));
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addFollower = async (username) => {
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
          userData.user.following.push(username);
          setUserData({
            ...userData,
            user: {
              ...userData.user,
              following: userData.user.following,
            },
          });
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const deleteFollower = async (username) => {
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
          setUserData({
            ...userData,
            user: {
              ...userData.user,
              following: userData.user.following.filter(
                (item) => item !== username
              ),
            },
          });
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleFollowButton = () => {
    if (isFollowed === false) {
      addFollower(secondUserData.username);
    } else {
      deleteFollower(secondUserData.username);
    }
    setIsFollowed((prevState) => !prevState);
  };
  //For Horizontal Tabs: Posts and Comments
  const [value2, setValue2] = useState(0);

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
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
  if (secondUserData)
    return (
      <div style={{ backgroundColor: "#16161A" }}>
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
        <Container fluid={1} className="pt-4 mt-sm-0 pt-sm-0">
          <Row>
            <Col className="bg-dark ml-auto mt-3" sm={2}>
              <div className="w-100 text-center">
                <Image
                  className="my-3 profilePic"
                  src={
                    secondUserData.imgId !== "false"
                      ? `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${secondUserData.username}?alt=media`
                      : photo
                  }
                  roundedCircle
                  height="160"
                  width="160"
                />
                <h4 className="text-secondary">
                  {secondUserData.firstName + " " + secondUserData.lastName}
                </h4>
              </div>
              <Dropdown.Divider />
              {userData.user ? (
                secondUserData.username !== userData.user.username ? (
                  <Row className="mt-4 mb-5">
                    <Col xs={isFollowed ? 4 : 12} sm={isFollowed ? 4 : 12}>
                      <div className="w-100 text-center">
                        <Button
                          variant="outline-info"
                          onClick={handleFollowButton}
                          className={isFollowed ? "" : "ml-auto"}
                        >
                          {isFollowed ? "Following" : "Follow"}
                        </Button>
                      </div>
                    </Col>
                    <Col xs={4} sm={5} className="ml-auto">
                      {isFollowed ? (
                        <NavLink
                          onClick={(event) =>
                            userData.user ? null : event.preventDefault()
                          }
                          to={{
                            pathname: "/chat",
                            search: `?name=${userData.user.username}&room=${
                              hashGenerator(userData.user.username) +
                              hashGenerator(secondUserData.username)
                            }&otherUser=${secondUserData.username}`,
                          }}
                        >
                          <Button variant="outline-info">Message</Button>
                        </NavLink>
                      ) : null}
                    </Col>
                    <Col sm={1} />
                  </Row>
                ) : null
              ) : null}
              <div className={classes.root}>
                <Tabs
                  orientation={width > 768 ? "vertical" : "horizontal"}
                  variant="scrollable"
                  scrollButtons={width < 768 ? "on" : "off"}
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className={classes.tabs}
                >
                  <Tab
                    className="py-4 py-sm-0 mt-sm-3 mb-sm-3 bg-primary"
                    label="Timeline"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className="py-4 py-sm-0 mb-sm-3 bg-primary"
                    label="Followers"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className="py-4 py-sm-0 mb-sm-3 bg-primary"
                    label="Following"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </div>
            </Col>
            <Col className="bg-primary mt-3" sm={10}>
              <TabPanel value={value} index={0}>
                <Container fluid={1}>
                  <Col>
                    <Row>
                      <div className={classes.root2}>
                        <Tabs
                          value={value2}
                          onChange={handleChange2}
                          aria-label="Horizontal tabs"
                          className={classes.tabs}
                        >
                          <Tab
                            className="my-3 mx-1 bg-primary"
                            label="Posts"
                            {...a11yProps(0)}
                          />
                          <Tab
                            className="my-3 mx-1 bg-primary"
                            label="Comments"
                            {...a11yProps(1)}
                          />
                        </Tabs>
                      </div>
                      <TabPanel value={value2} index={0}>
                        <Posts
                          secondUserProfile={true}
                          secondUserId={secondUserData}
                        />
                      </TabPanel>
                      <TabPanel value={value2} index={1}>
                        <UserComments username={secondUserData.username} />
                      </TabPanel>
                    </Row>
                  </Col>
                </Container>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Followers otherUser={secondUserData} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Following otherUser={secondUserData} />
              </TabPanel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  else
    return (
      <div>
        Redirecting... if you are not redirect in 5 seconds please refresh the
        page.
      </div>
    );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default SecondUser;
