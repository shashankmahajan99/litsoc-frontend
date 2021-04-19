import React, { useState, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Posts from "./Posts";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CreatePost from "./CreatePost";
import Followers from "./Followers";
import Following from "./Following";
import UserContext from "../context/UserContext";
import photo from "../photos/guest.png";
import Settings from "./Settings";
import UserComments from "./UserComments";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //For Horizontal Tabs: Posts and Comments
  const [value2, setValue2] = useState(0);

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  return (
    <Container fluid>
      <Row>
        <Col className="bg-dark ml-auto mt-3" sm={2}>
          <div className="w-100 text-center">
            <Image
              className="my-3"
              src={
                userData.user && userData.user.imgId !== "false"
                  ? `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${userData.user.username}?alt=media`
                  : photo
              }
              roundedCircle
              height="160"
              width="160"
              style={{ aspectRatio: "16/9" }}
            />
            <h4 className="text-secondary">
              {userData.user
                ? userData.user.firstName + " " + userData.user.lastName
                : "Loading..."}
            </h4>
          </div>
          <Dropdown.Divider />
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <Tab
                className="mt-3 mb-3 bg-primary"
                label="Timeline"
                {...a11yProps(0)}
              />
              <Tab
                className="mb-3 bg-primary"
                label="Create Post"
                {...a11yProps(1)}
              />
              <Tab
                className="mb-3 bg-primary"
                label="Followers"
                {...a11yProps(2)}
              />
              <Tab
                className="mb-3 bg-primary"
                label="Following"
                {...a11yProps(3)}
              />
              <Tab className="bg-primary" label="Settings" {...a11yProps(4)} />
            </Tabs>
          </div>
        </Col>
        <Col className="bg-primary mt-3" sm={10}>
          <TabPanel value={value} index={0}>
            <Container fluid>
              <Col>
                <Row>
                  <div className={classes.root2}>
                    <Tabs
                      value={value2}
                      onChange={handleChange2}
                      aria-label="Horizontal tabs"
                      className={classes.tabs2}
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
                    <Posts myProfile={true} />
                  </TabPanel>
                  <TabPanel value={value2} index={1}>
                    <UserComments
                      username={userData.user ? userData.user.username : null}
                    />
                  </TabPanel>
                </Row>
              </Col>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreatePost />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Followers />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Following />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Settings />
          </TabPanel>
        </Col>
      </Row>
    </Container>
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
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    height: 450,
  },
  root2: {
    flexGrow: 1,
  },
  tabs: {
    alignItems: "center",
    color: "white",
  },
  tabs2: {
    alignItems: "center",
    color: "white",
  },
}));

export default Profile;
