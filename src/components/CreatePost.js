import React, { useState, useContext, useRef } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "../axios";
import UserContext from "../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import firebaseStorage from "../base.js";

const CreatePost = () => {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const genreList = {
    genresArray: [
      "Action",
      "Adventure",
      "Anthology",
      "Architecture",
      "Art",
      "Astronomy",
      "Autobiography",
      "Biography",
      "Biology",
      "Business",
      "Classic",
      "Comic",
      "Coming-of-age",
      "Cookbook",
      "Crafts/hobbies",
      "Crime",
      "Diary",
      "Drama",
      "Economics",
      "Encyclopedia",
      "Fairytale",
      "Fantasy",
      "Fiction",
      "Finance",
      "Geography",
      "Graphic Novel",
      "Guide",
      "Health/fitness",
      "Historical fiction",
      "History",
      "Home and garden",
      "Horror",
      "Humor",
      "Journal",
      "Math",
      "Memoir",
      "Mystery",
      "New Age",
      "Non Fiction",
      "Philosophy",
      "Physics",
      "Poetry",
      "Politics",
      "Prayer",
      "Psychology",
      "Religion",
      "Romance",
      "Satire",
      "Sci-fi",
      "Science",
      "Self Help",
      "Spirituality",
      "Sports and leisure",
      "Suspense",
      "Textbook",
      "Thriller",
      "Travel",
      "True Crime",
      "Western",
      "Young adult",
    ],
  };
  const categoryList = {
    categoryArray: ["Review", "Analysis", "Summary", "Poem", "Story"],
  };
  const [postBody, setPostBody] = useState({
    name: userData.user.firstName + " " + userData.user.lastName,
    username: userData.user.username,
    title: undefined,
    category: undefined,
    description: undefined,
    genres: undefined,
    fileName: uuidv4(),
    userImage: userData.user.imgId !== "false" ? "true" : "false",
  });
  const genreRef = useRef();
  const categoryRef = useRef();
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    if (event.target.files[0].size > 100000000) {
      alert("File too large");
      setFile(null);
      return;
    } else setFile(event.target.files[0]);
  };
  const uploadFile = async (event) => {
    const storageRef = firebaseStorage.storage().ref();
    let fileRef;
    if (file) {
      fileRef = storageRef.child(postBody.fileName);
      await fileRef.put(file);
      console.log("file", postBody.fileName);
      setShow(true);
      setLoading(false);
    }
  };
  const makePostRequest = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    try {
      await axios.post("https://app-litsoc.herokuapp.com/post/", postBody, {
        headers: {
          "x-auth-token": token,
        },
      });
    } catch (err) {
      if (err) setLoading(false);
    }
    uploadFile();
  };
  const onChangeTitle = (e) => {
    setPostBody({ ...postBody, title: e.target.value });
  };
  const onChangeCategory = (e) => {
    setPostBody({
      ...postBody,
      category: categoryRef.current.getSelectedItems(),
    });
  };
  const onChangeDescription = (e) => {
    setPostBody({
      ...postBody,
      description: e.target.value,
    });
  };
  const onChangeGenres = (e) => {
    setPostBody({ ...postBody, genres: genreRef.current.getSelectedItems() });
  };
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "13%",
        }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={5000}
          style={{
            position: "absolute",
            marginTop: 0,
            marginRight: 0,
            zIndex: 1,
          }}
          autohide
        >
          <Toast.Header className="bg-dark text-light">
            <strong className="mr-auto">Create Post</strong>
          </Toast.Header>
          <Toast.Body>Post Created!</Toast.Body>
        </Toast>
      </div>
      <Container className="my-3 py-2 rounded bg-dark shadow-lg">
        <Form>
          <br />
          <h2 className="text-light font-weight-bold">Create Post</h2>
          <br />
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">
              Title :
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Post Title | Max 240 characters"
              value={postBody.title}
              onChange={onChangeTitle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">
              Category :
            </Form.Label>
            <Multiselect
              placeholder="Select a category"
              hidePlaceholder="true"
              selectionLimit="2"
              options={categoryList.categoryArray}
              isObject={false}
              style={styles}
              ref={categoryRef}
              value={postBody.category}
              onSelect={onChangeCategory}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">
              Description :
            </Form.Label>
            <Form.Control
              className="description"
              as="textarea"
              rows={3}
              placeholder="Post Description | Max 1000 characters"
              value={postBody.description}
              onChange={onChangeDescription}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-light">
              Genre :
            </Form.Label>
            <Multiselect
              placeholder="Select a genre"
              hidePlaceholder="true"
              options={genreList.genresArray}
              isObject={false}
              style={styles}
              ref={genreRef}
              value={postBody.genres}
              onSelect={onChangeGenres}
            />
          </Form.Group>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="font-weight-bold text-light"
          />
          <Button
            className="mt-3"
            variant="info"
            onClick={makePostRequest}
            disabled={loading}
          >
            {loading && <FontAwesomeIcon icon={faSpinner} spin />}
            {loading && " Creating Post"}
            {!loading && "Create Post"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreatePost;

const styles = {
  option: {
    background: "#16161a",
    color: "#fff",
  },
  searchBox: {
    // To change search box element look
    background: "#fff",
    border: "none",
    textColor: "#000",
  },
  chips: {
    // To change css chips(Selected options)
    background: "#7f5af0",
  },
};
