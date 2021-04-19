import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Reviews from "./components/Reviews";
import Stories from "./components/Stories";
import Summaries from "./components/Summaries";
import Poems from "./components/Poems";
import Analysis from "./components/Analysis";
import ViewPost from "./components/ViewPost";
import ProfileTab from "./components/ProfileTab";
import SecondUser from "./components/SecondUser";
import Home from "./components/Home";
import Chat from "./components/Chat/Chat";
import JoinChat from "./components/Join/Join";
import UserContext from "./context/UserContext";
import axios from "./axios";
import MyAudioPlayer from "./components/AudioPlayer/MyAudioPlayer";
const Routes = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "https://app-litsoc.herokuapp.com/tokenIsValid",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(
          "https://app-litsoc.herokuapp.com/user/",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route path={"/"} exact component={App} />
          <Route path={"/home"} component={Home} />
          <Route path={"/reviews"} component={Reviews} />
          <Route path={"/stories"} component={Stories} />
          <Route path={"/summaries"} component={Summaries} />
          <Route path={"/poems"} component={Poems} />
          <Route path={"/audioplayer"} component={MyAudioPlayer} />
          <Route path={"/analysis"} component={Analysis} />
          <Route path={"/profile"} component={ProfileTab} />
          <Route path={"/viewpost/:id"} component={ViewPost} />
          <Route path={"/secondUser/:id"} component={SecondUser} />
          <Route path="/chats" component={JoinChat} />
          <Route path="/chat" component={Chat} />
          <Route path="*" component={() => "404 Page Not Found"} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default Routes;
