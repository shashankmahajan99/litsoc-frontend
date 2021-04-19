import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import "./searchbox.css";
const SearchBox = ({ setSearchKeyword, setCategory, setGenre }) => {
  const [search, setSearch] = useState({
    keyword: "",
    genres: "",
    categories: "",
  });
  const genreRef = useRef();
  const categoryRef = useRef();
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
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(search.keyword);
    setCategory(search.categories);
    setGenre(search.genres);
  };
  const onChangeGenres = (e) => {
    let genres = genreRef.current.getSelectedItems();
    setSearch({
      ...search,
      genres: genres === undefined ? "" : genres[0],
    });
  };
  const onChangeCategories = (e) => {
    let categories = categoryRef.current.getSelectedItems();
    setSearch({
      ...search,
      categories: categories === undefined ? "" : categories[0],
    });
  };
  console.log(search);
  return (
    <Container>
      <Col md="auto">
        <Row className="justify-content-md-center mx-5 my-5" fluid>
          <Form inline onSubmit={handleSearch}>
            <Col>
              <Row>
                <FormControl
                  type="text"
                  placeholder="Search"
                  onChange={(e) =>
                    setSearch({ ...search, keyword: e.target.value })
                  }
                />
                <Button variant="info" className="mx-1" type="submit">
                  Search
                </Button>
              </Row>
              <Row className="my-1">
                <Col sm={6} className="px-0">
                  <Multiselect
                    className="multiselect"
                    placeholder="Category"
                    hidePlaceholder={true}
                    options={categoryList.categoryArray}
                    isObject={false}
                    style={styles}
                    ref={categoryRef}
                    value={search.categories}
                    onSelect={onChangeCategories}
                    onRemove={onChangeCategories}
                    selectionLimit="1"
                  />
                </Col>
                <Col sm={6} className="pl-0">
                  <Multiselect
                    className="multiselect"
                    placeholder="Genre"
                    hidePlaceholder={true}
                    options={genreList.genresArray}
                    isObject={false}
                    style={styles}
                    ref={genreRef}
                    value={search.genres}
                    onSelect={onChangeGenres}
                    onRemove={onChangeGenres}
                    selectionLimit="1"
                  />
                </Col>
              </Row>
            </Col>
          </Form>
        </Row>
      </Col>
    </Container>
  );
};
const styles = {
  option: {
    background: "#16161a",
    color: "#fff",
  },
  searchBox: {
    // To change search box element look
    background: "#7e59ef",
    border: "none",
    color: "#fff",
    width: "8.55rem",
    height: "2rem",
  },
  chips: {
    // To change css chips(Selected options)
    background: "#7f5af0",
  },
};
export default SearchBox;
