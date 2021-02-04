import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Posts from "./Posts";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Create_post from "./Create_post";
import profilepic from "../photos/profilepic.jpg";
import Followers from "./Followers";
import Following from "./Following";
import InfiniteScroll from "react-infinite-scroll-component";

const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    items: Array.from({ length: 2 }),
    hasMore: true,
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //For Horizontal Tabs: Posts and Comments
  const [value2, setValue2] = React.useState(0);

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    if (state.items.length >= 5) {
      setState({ ...state, hasMore: false });
      return;
    }
    setTimeout(() => {
      setState({
        ...state,
        items: state.items.concat(Array.from({ length: 1 })),
      });
    }, 1500);
  };
  return (
    <Container fluid>
      <Row>
        <Col className="bg-dark ml-auto mt-3" sm={2}>
          <div className="w-100 text-center">
            <Image
              className="my-3"
              src={profilepic}
              roundedCircle
              height="160"
              width="180"
            />
            <h4 className="text-secondary">Jane Doe</h4>
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
              <Tab
                className="mb-3 bg-primary"
                label="Message"
                {...a11yProps(4)}
              />
              <Tab className="bg-primary" label="Settings" {...a11yProps(5)} />
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
            <Create_post />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Followers />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Following />
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
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
