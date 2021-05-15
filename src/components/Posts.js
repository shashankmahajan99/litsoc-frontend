import React, { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../axios";
import UserContext from ".././context/UserContext";
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const postsNo = 3;
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [page, setPage] = useState(0);
  const [searchResults, setSearchResults] = useState(true);
  const { userData } = useContext(UserContext);
  const fetchData = async () => {
    setSearchResults(true);
    let url;
    let req = await axios.post(
      "https://app-litsoc.herokuapp.com/post/simplerecommender?category=All",
      {
        page: page,
        size: postsNo,
      }
    );
    setPage(0);
    if (props.myProfile && userData.user) {
      setPage(0);
      url = `https://app-litsoc.herokuapp.com/post/all/${userData.user.id}`;
      req = await axios.post(url, { page: page, size: postsNo });
      if (req.data.msg === "No Results" || req.data.posts.length < 1) {
        setSearchResults(false);
      }
    } else if (props.secondUserProfile) {
      setPage(0);
      url = `https://app-litsoc.herokuapp.com/post/all/${props.secondUserId.id}`;
      req = await axios.post(url, { page: page, size: postsNo });
      if (
        props.secondUserId.id &&
        (req.data.msg === "No Results" || req.data.posts.length < 1)
      ) {
        setSearchResults(false);
      }
    } else if (!props.searchKeyword && props.category && !props.genre) {
      setPage(0);
      req = await axios.post(
        `https://app-litsoc.herokuapp.com/post/simplerecommender?category=${
          props.category ? props.category : "All"
        }`,
        { page: page, size: postsNo }
      );
      if (req.data.msg === "No Results" || req.data.posts.length < 1) {
        setSearchResults(false);
      }
    } else if (props.searchKeyword || props.category || props.genre) {
      setPage(0);
      req = await axios.post(
        `https://app-litsoc.herokuapp.com/post/all/search?keyword=${
          props.searchKeyword ? props.searchKeyword : ""
        }&category=${props.category ? props.category : ""}&genres=${
          props.genre ? props.genre : ""
        }`,
        { page: page, size: postsNo }
      );
      if (req.data.msg === "No Results" || req.data.posts.length < 1) {
        setSearchResults(false);
      }
    } else if (props.subscription) {
      setPage(0);
      req = await axios.post(
        "https://app-litsoc.herokuapp.com/post/subscriptions",
        {
          page: page,
          size: postsNo,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      if (!req.data.hasNext && req.data.posts.length < 1) {
        setSearchResults(false);
      }
    } else if (props.feed) {
      setPage(0);
      req = await axios.post(
        "https://app-litsoc.herokuapp.com/post/collaborativerecommender",
        {
          page: page,
          size: postsNo,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      if (!req.data.hasNext && req.data.posts.length < 1) {
        setSearchResults(false);
      }
    }
    setHasMorePosts(req.data.hasNext);
    setPosts(req.data.posts);
  };
  useEffect(() => {
    fetchData();
  }, [
    props.feed,
    props.subscription,
    props.myProfile,
    props.secondUserId,
    props.secondUserProfile,
    userData.user,
    props.searchKeyword,
    props.category,
    props.genre,
  ]);
  const fetchMoreData = async () => {
    const tempPage = page + 1;
    setPage((prevPage) => prevPage + 1);
    let url;
    let res = await axios.post(
      "https://app-litsoc.herokuapp.com/post/simplerecommender?category=All",
      {
        page: tempPage,
        size: postsNo,
      }
    );
    if (props.myProfile && userData.user) {
      url = `https://app-litsoc.herokuapp.com/post/all/${userData.user.id}`;
      res = await axios.post(url, { page: tempPage, size: postsNo });
    } else if (props.secondUserProfile) {
      url = `https://app-litsoc.herokuapp.com/post/all/${props.secondUserId.id}`;
      res = await axios.post(url, { page: tempPage, size: postsNo });
    } else if (!props.searchKeyword && props.category && !props.genre) {
      res = await axios.post(
        `https://app-litsoc.herokuapp.com/post/simplerecommender?category=${
          props.category ? props.category : "All"
        }`,
        { page: tempPage, size: postsNo }
      );
    } else if (props.searchKeyword || props.category || props.genre) {
      res = await axios.post(
        `https://app-litsoc.herokuapp.com/post/all/search?keyword=${
          props.searchKeyword ? props.searchKeyword : ""
        }&category=${props.category ? props.category : ""}&genres=${
          props.genre ? props.genre : ""
        }`,
        { page: tempPage, size: postsNo }
      );
    } else if (props.subscription) {
      res = await axios.post(
        "https://app-litsoc.herokuapp.com/post/subscriptions",
        {
          page: tempPage,
          size: postsNo,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
    } else if (props.feed) {
      res = await axios.post(
        "https://app-litsoc.herokuapp.com/post/collaborativerecommender",
        {
          page: tempPage,
          size: postsNo,
        },
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
    }
    setHasMorePosts(res.data.hasNext);
    setPosts((prevPosts) => {
      return prevPosts.concat(res.data.posts);
    });
  };

  return (
    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={hasMorePosts}
      loader={"Loading More Posts..."}
    >
      {searchResults ? (
        posts.length > 0 ? (
          posts.map((post) => <Post post={post} myProfile={props.myProfile} />)
        ) : (
          <Container
            className="my-3 py-md-2 rounded bg-dark shadow-lg text-light"
            fluid={1}
          >
            <h4>
              <FontAwesomeIcon icon={faSpinner} spin />
              Loading
            </h4>
          </Container>
        )
      ) : (
        <Container
          className="my-3 py-md-2 rounded bg-dark shadow-lg text-light"
          fluid={1}
        >
          <h2>No Results</h2>
        </Container>
      )}
    </InfiniteScroll>
  );
};

export default Posts;
