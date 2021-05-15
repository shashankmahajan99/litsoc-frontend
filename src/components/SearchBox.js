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

  return (
    <Container>
      <Col md={12}>
        <Row className="my-5 ml-auto" fluid={1}>
          <Form inline onSubmit={handleSearch}>
            <Row className="my-1" fluid={1}>
              <Col xs={11} md={4}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  onChange={(e) =>
                    setSearch({ ...search, keyword: e.target.value })
                  }
                />
              </Col>
              <Col xs={4} md={2} className="mt-2 mt-sm-0 mr-md-2">
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
              <Col xs={4} md={2} className="mt-2 mt-sm-0 mx-md-2">
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
              <Col xs={4} md={2} className="mt-2 mt-sm-0 mx-md-2">
                <Button variant="info" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
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
    background: "#0fa697",
    border: "none",
    color: "#fff",
    width: "7rem",
    height: "2.35rem",
  },
  chips: {
    // To change css chips(Selected options)
    background: "#0fa697",
  },
};
export default SearchBox;
