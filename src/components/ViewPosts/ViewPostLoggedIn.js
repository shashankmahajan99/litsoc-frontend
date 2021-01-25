import React from "react";
import photo from "../photos/livespace.jpg";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import ReactAudioPlayer from "react-audio-player";
import soundfile from "../media/Chill.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import SwipeDrawerLoggedIn from "../SwipeDrawerLoggedIn";
import bg from "../photos/Endless-Constellation2.svg";
import Comments from "./Comment";

const ViewPost = () => {
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url(${bg})`,
      }}
    >
      <SwipeDrawerLoggedIn isFalse={1} />
      <div className="container bg-primary text-light rounded">
        <div className="row">
          {/* <!-- Post Content Column --> */}
          <div className="col-lg-8">
            {/* <!-- Title --> */}
            <h1 className="mt-4 font-weight-bold">
              Sapiens: A Brief History of Humankind
            </h1>

            {/* <!-- Author --> */}

            <h5 className="text-light text-muted text-decoration-none">
              Review
            </h5>
            <hr className="bg-light" />
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <NavLink
                    to="/secondUserLoggedIn"
                    className="text-decoration-none text-light"
                  >
                    <h5>John Doe</h5>
                  </NavLink>
                </div>
                {/* <!-- Date/Time --> */}
                <div className="col-6 text-right">
                  <p>Posted on December 1, 2020 at 12:00 PM</p>
                </div>
              </div>
              {/* <!-- Post Content --> */}
            </div>
            <hr className="bg-light" />
            <div className="font-weight-normal font-small text-secondary">
              <p>
                Post Description - "Starting from this provocative idea, Sapiens
                goes on to retell the history of our species from a completely
                fresh perspective. It explains that money is the most
                pluralistic system of mutual trust ever devised; that capitalism
                is the most successful religion ever invented; that the
                treatment of animals in modern agriculture is probably the worst
                crime in history; and that even though we are far more powerful
                than our ancient ancestors, we aren’t much happier." Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Explicabo provident
                nam, voluptatibus illum accusamus ipsam iure sequi? Aperiam
                commodi vel eos fuga, suscipit inventore cumque ipsam ducimus
                ratione nulla nostrum magni enim nam praesentium perferendis
                ullam deleniti fugit a aut cupiditate veritatis, totam animi? Et
                assumenda nesciunt molestiae pariatur eligendi velit saepe vero
                optio soluta ab aliquam autem ea rerum molestias iusto eum quis
                reprehenderit rem vel, voluptatem necessitatibus corporis ipsam?
                Ex, numquam ea. Placeat impedit nulla at delectus natus ipsum.
                Libero, consectetur saepe. Beatae ex eos praesentium facilis,
                quidem corporis perferendis dolor quod doloremque rem enim qui
                at doloribus!
              </p>
            </div>
            <hr className="bg-light" />

            {/* <!-- Preview Image --> */}
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-4 w-auto">
                <ReactAudioPlayer
                  src={soundfile}
                  controls
                  controlsList="nodownload"
                  volume={0.5}
                />
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-3 col-12 mt-3 my-lg-auto">
                <a className="btn text-white btn-danger">
                  <FontAwesomeIcon icon={faHeart} /> 1,136 Like
                </a>
              </div>
              <div className="col-lg-2"></div>
            </div>
            <hr className="bg-light" />
            {/* <!-- Comments Form --> */}
            <div className="card my-4">
              <h5 className="card-header bg-dark border-secondary">
                Leave a Comment:
              </h5>
              <div className="card-body bg-dark">
                <form>
                  <div className="form-group">
                    <textarea className="form-control" rows="3"></textarea>
                  </div>
                  <button type="submit" className="btn btn-info">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="media mt-4">
              <div className="media-body">
                <Comments />
              </div>
            </div>
          </div>

          {/* <!-- Sidebar Widgets Column --> */}
          <div className="col-md-4">
            {/* <!-- Search Widget -->
          <div className="card my-4">
            <h5 className="card-header">Search</h5>
            <div className="card-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for..."
                />
                <span className="input-group-append">
                  <button className="btn btn-secondary" type="button">
                    Go!
                  </button>
                </span>
              </div>
            </div>
          </div> */}

            {/* <!-- Categories Widget --> */}
            <div className="card my-4 bg-dark text-light">
              <h5 className="card-header border-secondary">Tags</h5>
              <div className="card-body">
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
              </div>
            </div>
            {/* <!-- Side Widget --> */}
            <div className="card my-4 bg-dark">
              <h5 className="card-header border-secondary text-light">
                Related Post
              </h5>
              <div className="card-body">
                <NavLink to="/viewpost" className="text-decoration-none">
                  <h4 className="font-weight-bold card-headline">
                    Cosmos - Carl Sagan
                  </h4>
                </NavLink>
                <h6 className="text-muted card-paragraph">Review | Analysis</h6>
                <div className="font-weight-normal font-small text-secondary">
                  <p>
                    Post Description - "Cosmos is a 1980 popular science book by
                    astronomer and Pulitzer Prize-winning author Carl Sagan. Its
                    13 illustrated chapters, corresponding to the 13 episodes of
                    the Cosmos TV series, which the book was co-developed with
                    and intended to complement, explore the mutual development
                    of science and civilization. One of Sagan's main purposes
                    for the book and television series was to explain complex
                    scientific ideas to anyone interested in learning. "
                  </p>
                </div>
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
                <div className="row">
                  <div className="col-5">
                    <Image src={photo} roundedCircle height="110" width="120" />
                  </div>
                  <div className="col-7 my-auto">
                    <NavLink
                      to="/secondUserLoggedIn"
                      className="text-decoration-none"
                    >
                      <h5 className="font-weight-bold text-light">
                        Jenny Scott
                      </h5>
                    </NavLink>
                  </div>
                </div>
                <br />
                <a href="/" className="mx-2 text-light text-decoration-none">
                  <FontAwesomeIcon icon={faHeart} /> 696 Likes
                </a>
                <a
                  href="/"
                  className="ml-2 mr-5 text-light text-decoration-none"
                >
                  <FontAwesomeIcon icon={faCommentAlt} /> 45 Comments
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /.row --> */}
      </div>
    </div>
  );
};

export default ViewPost;
