import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import photo from "../photos/livespace.jpg";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import ReactAudioPlayer from "react-audio-player";
import soundfile from "../media/Chill.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = (props) => {
  const [state, setState] = React.useState({
    items: Array.from({ length: 2 }),
  });
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
    <InfiniteScroll
      dataLength={state.items.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {state.items.map((i, index) => (
        <Container className="my-3 py-md-2 rounded bg-dark shadow-lg" fluid>
          <Row>
            <Col sm={7} md={8} lg={9} xl={10}>
              <a href={props.viewpost} className="text-decoration-none">
                <h3 className="font-weight-bold card-headline">
                  Thinking, Fast and Slow - Daniel Kahneman
                </h3>
              </a>
              <h6 className="text-muted card-paragraph">Summary</h6>
              <h5 className="font-weight-normal font-smaller text-secondary">
                Post Description - "Author takes us on a groundbreaking tour of
                the mind and explains the two systems that drive the way we
                think. What made this unusual is that Kahneman is a
                psychologist. Specifically, he is one-half of a pair of
                psychologists who, beginning in the early 1970s, set out to
                dismantle an entity long dear to economic theorists: that
                arch-rational decision maker known as Homo economicus."
              </h5>
              <h6>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Non Fiction
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Psychology
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Self Help
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Philosphy
                </Badge>
              </h6>
            </Col>
            <Col sm={5} md={4} lg={3} xl={2}>
              <div className="row">
                <div className="col-5">
                  <Image src={photo} roundedCircle height="110" width="120" />
                </div>
                <div className="col-7 my-auto col-md-12">
                  <a
                    href="/secondUserLoggedIn"
                    className="text-decoration-none"
                  >
                    <h5 className="font-weight-bold text-light">Jenny Scott</h5>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-lg-3 mx-lg-2">
              <a href="/" className="mx-2 text-light text-decoration-none">
                <FontAwesomeIcon icon={faHeart} /> 11,420 Likes
              </a>
              <a href="/" className="ml-2 mr-5 text-light text-decoration-none">
                <FontAwesomeIcon icon={faCommentAlt} /> 398 Comments
              </a>
            </Col>
            <Col>
              <ReactAudioPlayer
                src={soundfile}
                controls
                controlsList="nodownload"
                volume={0.5}
                className="ml-auto"
              />
            </Col>
          </Row>
          <div className="dropdown-divider" />
          <Row>
            <Col sm={7} md={8} lg={9} xl={10}>
              <a href={props.viewpost} className="text-decoration-none">
                <h3 className="font-weight-bold card-headline">
                  Sapiens: A Brief History of Humankind - Yuval Noah Harari
                </h3>
              </a>
              <h6 className="text-muted card-paragraph">Review</h6>
              <h5 className="font-weight-normal font-smaller text-secondary">
                Post Description - "Starting from this provocative idea, Sapiens
                goes on to retell the history of our species from a completely
                fresh perspective. It explains that money is the most
                pluralistic system of mutual trust ever devised; that capitalism
                is the most successful religion ever invented; that the
                treatment of animals in modern agriculture is probably the worst
                crime in history; and that even though we are far more powerful
                than our ancient ancestors, we aren’t much happier."
              </h5>
              <h6>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Non Fiction
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  History
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Science
                </Badge>
              </h6>
            </Col>
            <Col sm={5} md={4} lg={3} xl={2}>
              <div className="row">
                <div className="col-5">
                  <Image src={photo} roundedCircle height="110" width="120" />
                </div>
                <div className="col-7 my-auto col-md-12">
                  <a
                    href="/secondUserLoggedIn"
                    className="text-decoration-none"
                  >
                    <h5 className="font-weight-bold text-light">Jenny Scott</h5>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-lg-3 mx-lg-2">
              <a href="/" className="mx-2 text-light text-decoration-none">
                <FontAwesomeIcon icon={faHeart} /> 1,136 Likes
              </a>
              <a href="/" className="ml-2 mr-5 text-light text-decoration-none">
                <FontAwesomeIcon icon={faCommentAlt} /> 32 Comments
              </a>
            </Col>
            <Col>
              <ReactAudioPlayer
                src={soundfile}
                controls
                controlsList="nodownload"
                volume={0.5}
                className="ml-auto"
              />
            </Col>
          </Row>
          <div className="dropdown-divider" />
          <Row>
            <Col md={8} lg={9} xl={10}>
              <a href={props.viewpost} className="text-decoration-none">
                <h3 className="font-weight-bold card-headline">
                  Cosmos - Carl Sagan
                </h3>
              </a>
              <h6 className="text-muted card-paragraph">Review | Analysis</h6>
              <h5 className="font-weight-normal font-smaller text-secondary">
                Post Description - "Cosmos is a 1980 popular science book by
                astronomer and Pulitzer Prize-winning author Carl Sagan. Its 13
                illustrated chapters, corresponding to the 13 episodes of the
                Cosmos TV series, which the book was co-developed with and
                intended to complement, explore the mutual development of
                science and civilization. One of Sagan's main purposes for the
                book and television series was to explain complex scientific
                ideas to anyone interested in learning. "
              </h5>
              <h6>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Non Fiction
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Science
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Space
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Physics
                </Badge>
                <Badge pill className="mx-2 mt-1" variant="info">
                  Astronomy
                </Badge>
              </h6>
            </Col>
            <Col md={4} lg={3} xl={2}>
              <div className="row">
                <div className="col-5">
                  <Image src={photo} roundedCircle height="110" width="120" />
                </div>
                <div className="col-7 my-auto col-md-12">
                  <a
                    href="/secondUserLoggedIn"
                    className="text-decoration-none"
                  >
                    <h5 className="font-weight-bold text-light">Jenny Scott</h5>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-lg-3 mx-lg-2 my-2">
              <a href="/" className="mx-2 text-light text-decoration-none">
                <FontAwesomeIcon icon={faHeart} /> 696 Likes
              </a>
              <a href="/" className="ml-2 mr-5 text-light text-decoration-none">
                <FontAwesomeIcon icon={faCommentAlt} /> 45 Comments
              </a>
            </Col>
            <Col>
              <ReactAudioPlayer
                src={soundfile}
                controls
                controlsList="nodownload"
                volume={0.5}
                className="ml-auto"
              />
            </Col>
          </Row>
        </Container>
      ))}
    </InfiniteScroll>
  );
};

export default Posts;
