import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Box from "@material-ui/core/Box";
import SearchBox from "./components/SearchBox";
import Posts from "./components/Posts";
import PopularGenres from "./components/PopularGenres";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faComment,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./photos/logo2.png";
import Image from "react-bootstrap/Image";
import photo from "./photos/guest.png";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserContext from "./context/UserContext";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  tabroot: {
    flexGrow: 1,
    display: "flex",
    height: 224,
  },
  indicator: {
    left: "0px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(7),
  },
  tabcontent: {
    flexGrow: 1,
    background: "#0a2126",
    color: "white",
  },
}));

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
        <Box>
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
export default function SwipeDrawer(props) {
  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token && !userData.user) setLoading(true);
    else setLoading(false);
  }, [userData.user]);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      imgUrl: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [searchKeyword, setSearchKeyword] = useState();
  const [genre, setGenre] = useState();
  console.log(searchKeyword, genre, props.category);
  const [value, setValue] = React.useState(
    props.isFalse ? "false" : props.defValue ? props.defValue : 0
  );
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [value2, setValue2] = React.useState(0);

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, classes.tabcontent, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer("right", false)}>
          <ChevronRightIcon className="text-light" />
        </IconButton>
      </div>
      <div className="w-100 text-center">
        <Image
          className="bg-transparent mb-3"
          src={
            userData.user
              ? userData.user.imgId !== "false"
                ? `https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/${userData.user.username}?alt=media`
                : photo
              : photo
          }
          roundedCircle
          alt="user pic"
          height="90"
          width="95"
        />
        <h4 className="text-light text-center mb-1">
          {userData.user ? userData.user.username : "Guest"}
        </h4>
      </div>
      <Divider className="bg-light" />
      <List>
        {userData.user ? (
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            classes={{
              indicator: classes.indicator,
            }}
          >
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/home"
              label="Home"
              {...a11yProps(0)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/reviews"
              label="Reviews"
              {...a11yProps(1)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/stories"
              label="Stories"
              {...a11yProps(2)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/summaries"
              label="Summaries"
              {...a11yProps(3)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/poems"
              label="Poems"
              {...a11yProps(4)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/analysis"
              label="Analysis"
              {...a11yProps(5)}
            />
            <Divider className="bg-light" />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/profile"
              icon={
                <div>
                  <FontAwesomeIcon icon={faUser} /> Profile
                </div>
              }
              {...a11yProps(6)}
            />
            <Tab
              component="a"
              className="text-decoration-none text-light"
              href="/home"
              onClick={logout}
              icon={
                <div>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </div>
              }
            />
          </Tabs>
        ) : (
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            classes={{
              indicator: classes.indicator,
            }}
          >
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/home"
              label="Home"
              {...a11yProps(0)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/reviews"
              label="Reviews"
              {...a11yProps(1)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/stories"
              label="Stories"
              {...a11yProps(2)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/summaries"
              label="Summaries"
              {...a11yProps(3)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/poems"
              label="Poems"
              {...a11yProps(4)}
            />
            <Tab
              component={NavLink}
              className="text-decoration-none text-light"
              to="/analysis"
              label="Analysis"
              {...a11yProps(5)}
            />
          </Tabs>
        )}
      </List>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={classes.root}>
            <AppBar position="fixed">
              <Toolbar className="bg-primary">
                <NavLink
                  to="/home"
                  className="font-weight-bold text-responsive text-light text-decoration-none"
                >
                  <Image
                    src={logo}
                    alt="litsoc"
                    width="90"
                    height="90"
                    className="d-inline-block align-top"
                    rounded
                  />
                </NavLink>
                {userData.user ? (
                  <>
                    <NavLink
                      to="/chats"
                      className="font-weight-bold text-responsive text-light text-decoration-none ml-auto"
                    >
                      <h5>
                        <FontAwesomeIcon icon={faComment} />
                      </h5>
                    </NavLink>
                    <div className="ml-2">
                      <Notifications />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ml-auto">
                      {loading && <FontAwesomeIcon icon={faSpinner} spin />}
                      {!loading && <SignUp />}
                    </div>
                    <div className="ml-2">{!loading && <SignIn />}</div>
                  </>
                )}
                <div className="ml-2">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer("right", true)}
                    edge="end"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      <main className={clsx(classes.content)}>
        <TabPanel value={value} index={0}>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            setCategory={props.setCategory}
            setGenre={setGenre}
          />
          <Container fluid="xl" className="mw-100">
            <Row>
              <Col md={9} className="bg-primary rounded text-light">
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
                            label="Feed"
                            {...a11yProps(0)}
                          />
                          <Tab
                            className="my-3 mx-1 bg-primary"
                            label="Subscriptions"
                            {...a11yProps(1)}
                          />
                        </Tabs>
                      </div>
                      <TabPanel value={value2} index={0}>
                        <Posts
                          genre={genre}
                          category={props.category}
                          searchKeyword={searchKeyword}
                          viewpost="viewpost"
                          profile={false}
                          subscription={false}
                        />
                      </TabPanel>
                      <TabPanel value={value2} index={1}>
                        {userData.user ? (
                          <Posts
                            genre={genre}
                            category={props.category}
                            searchKeyword={searchKeyword}
                            viewpost="viewpost"
                            profile={false}
                            subscription={true}
                          />
                        ) : (
                          <h1 className="text-light">
                            " You have not subscribed to anyone."
                          </h1>
                        )}
                      </TabPanel>
                    </Row>
                  </Col>
                </Container>
              </Col>
              <Col md={3}>
                <PopularGenres />
              </Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            setCategory={props.setCategory}
            setGenre={setGenre}
          />
          <Container fluid="xl" className="mw-100">
            <Row>
              <Col xs={9}>
                <Posts
                  genre={genre}
                  category={props.category}
                  searchKeyword={searchKeyword}
                  viewpost="viewpost"
                  profile={false}
                  subscription={false}
                />
              </Col>
              <Col xs={3}>
                <PopularGenres />
              </Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            setCategory={props.setCategory}
            setGenre={setGenre}
          />
          <Container fluid="xl" className="mw-100">
            <Row>
              <Col xs={9}>
                <Posts
                  genre={genre}
                  category={props.category}
                  searchKeyword={searchKeyword}
                  viewpost="viewpost"
                  profile={false}
                  subscription={false}
                />
              </Col>
              <Col xs={3}>
                <PopularGenres />
              </Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            setCategory={props.setCategory}
            setGenre={setGenre}
          />
          <Container fluid="xl" className="mw-100">
            <Row>
              <Col xs={9}>
                <Posts
                  genre={genre}
                  category={props.category}
                  searchKeyword={searchKeyword}
                  viewpost="viewpost"
                  profile={false}
                  subscription={false}
                />
              </Col>
              <Col xs={3}>
                <PopularGenres />
              </Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            setCategory={props.setCategory}
            setGenre={setGenre}
          />
          <Container fluid="xl" className="mw-100">
            <Row>
              <Col xs={9}>
                <Posts
                  genre={genre}
                  category={props.category}
                  searchKeyword={searchKeyword}
                  viewpost="viewpost"
                  profile={false}
                  subscription={false}
                />
              </Col>
              <Col xs={3}>
                <PopularGenres />
              </Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            setCategory={props.setCategory}
            setGenre={setGenre}
          />
          <Container fluid="xl" className="mw-100">
            <Row>
              <Col xs={9}>
                <Posts
                  genre={genre}
                  category={props.category}
                  searchKeyword={searchKeyword}
                  viewpost="viewpost"
                  profile={false}
                  subscription={false}
                />
              </Col>
              <Col xs={3}>
                <PopularGenres />
              </Col>
            </Row>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Profile />
        </TabPanel>
      </main>
    </div>
  );
}
