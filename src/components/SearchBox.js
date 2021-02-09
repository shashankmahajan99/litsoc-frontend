import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const SearchBox = () => {
  return (
    <Container>
      <Col md="auto">
        <Row className="justify-content-md-center mx-5 my-5" fluid>
          <Form inline>
            <FormControl type="text" placeholder="Search" />
            <Button variant="info" className="my-1 mx-1">
              Search
            </Button>
            <DropdownButton
              id="dropdown-basic-button"
              title="Filters"
              variant="info"
              className="my-1 mx-1"
            >
              <Dropdown.Item href="#/action-1">Most Popular</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Top Rated</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Top 10</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header as="h1">Categories</Dropdown.Header>
              <Dropdown.Item href="#/action-1">Review</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Analysis</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Summary</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Poem</Dropdown.Item>
              <Dropdown.Item href="#/action-5">Story</Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              id="dropdown-basic-button"
              title="Genres"
              variant="info"
              className="my-1 mx-1"
            >
              <Dropdown.Item href="#/action-1">Non Fiction</Dropdown.Item>
              <Dropdown.Item href="#/action-2">History</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Science</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Horror</Dropdown.Item>
              <Dropdown.Item href="#/action-5">Politics</Dropdown.Item>
              <Dropdown.Item href="#/action-6">Fiction</Dropdown.Item>
              <Dropdown.Item href="#/action-7">Self Help</Dropdown.Item>
              <Dropdown.Item href="#/action-8">Psychology</Dropdown.Item>
              <Dropdown.Item href="#/action-9">Philosophy</Dropdown.Item>
              <Dropdown.Item href="#/action-10">Astronomy</Dropdown.Item>
              <Dropdown.Item href="#/action-11">Physics</Dropdown.Item>
            </DropdownButton>
          </Form>
        </Row>
      </Col>
    </Container>
  );
};

export default SearchBox;
