import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Posts from "./Posts";
import photo from "../photos/livespace.jpg";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeDrawerLoggedIn from "../SwipeDrawerLoggedIn";
import bg from "../photos/Endless-Constellation2.svg";
import Followers from "./Followers";
import Following from "./Following";

const SecondUser = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //For Horizontal Tabs: Posts and Comments
  const [value2, setValue2] = React.useState(0);

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawerLoggedIn isFalse={1} />
      <Container fluid>
        <Row>
          <Col className="bg-dark ml-auto mt-3" sm={2}>
            <div className="w-100 text-center">
              <Image
                className="my-3"
                src={photo}
                roundedCircle
                height="160"
                width="180"
              />
              <h4 className="text-secondary">Jenny Scott</h4>
            </div>
            <Dropdown.Divider />
            <Row className="mt-4 mb-5">
              <Col sm={6}>
                <Button variant="outline-info" className="ml-3">
                  Follow
                </Button>
              </Col>
              <Col sm={6}>
                <Button variant="outline-info">Message</Button>
              </Col>
            </Row>
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
                  label="Followers"
                  {...a11yProps(1)}
                />
                <Tab
                  className="mb-3 bg-primary"
                  label="Following"
                  {...a11yProps(2)}
                />
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
                      <Posts />
                    </TabPanel>
                    <TabPanel value={value2} index={1}>
                      Item Three
                    </TabPanel>
                  </Row>
                </Col>
              </Container>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Followers />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Following />
            </TabPanel>
          </Col>
        </Row>
      </Container>
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
    borderRight: `1px solid ${theme.palette.divider}`,
    color: "white",
  },
}));

export default SecondUser;
