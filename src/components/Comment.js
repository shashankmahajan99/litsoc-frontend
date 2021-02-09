import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faReply } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
const Comments = () => {
  return (
    <div className="container bg-dark">
      <h4 className="mt-2">Comments</h4>

      <div className="card bg-dark border-0">
        <div className="card-body">
          <hr className="bg-light" />
          <div className="row my-2">
            <div className="col-md-2 col-3">
              <img
                src="https://image.ibb.co/jw55Ex/def_face.jpg"
                className="img rounded img-fluid bg-dark"
              />
              <p className="text-muted text-center">23 Minutes Ago</p>
            </div>
            <div className="col-md-10 col-9">
              <p>
                <NavLink
                  className="float-left text-light text-decoration-none"
                  to="/secondUser"
                >
                  <strong>Utkarsh Bhardwaj</strong>
                </NavLink>
                <span className="float-right">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="float-right">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="float-right">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="float-right">
                  <FontAwesomeIcon icon={faStar} className="text-warning" />
                </span>
                <span className="float-right">
                  <FontAwesomeIcon icon={faStar} className="text-warning" />
                </span>
              </p>
              <div className="clearfix"></div>
              <p>
                Lorem Ipsum is simply dummy text of the pr make but also the
                leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
              <p>
                <a className="float-right btn btn-outline-secondary ml-2 text-light">
                  {" "}
                  <FontAwesomeIcon icon={faReply} /> Reply
                </a>
              </p>
            </div>
          </div>
          <div className="card card-inner mb-2 bg-dark  border-0">
            <div className="card-body">
              <hr className="bg-light" />
              <div className="row mb-2">
                <div className="col-md-2 col-3">
                  <img
                    src="https://image.ibb.co/jw55Ex/def_face.jpg"
                    className="img rounded img-fluid bg-dark"
                  />
                  <p className="text-muted text-center">17 Minutes Ago</p>
                </div>
                <div className="col-md-10 col-9">
                  <p>
                    <NavLink
                      className="float-left text-light text-decoration-none"
                      to="/secondUser"
                    >
                      <strong>Jai Arora</strong>
                    </NavLink>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </span>
                  </p>
                  <div className="clearfix"></div>
                  <p>
                    Lorem Ipsum is simply dummy text of the pr make but also the
                    leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                    <a className="float-right btn btn-outline-secondary ml-2 text-light">
                      {" "}
                      <FontAwesomeIcon icon={faReply} /> Reply
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-inner bg-dark border-0">
            <div className="card-body">
              <hr className="bg-light" />
              <div className="row mb-2">
                <div className="col-md-2 col-3">
                  <img
                    src="https://image.ibb.co/jw55Ex/def_face.jpg"
                    className="img rounded img-fluid bg-dark"
                  />
                  <p className="text-muted text-center">13 Minutes Ago</p>
                </div>
                <div className="col-md-10 col-9">
                  <p>
                    <NavLink
                      className="float-left text-light text-decoration-none"
                      to="/secondUser"
                    >
                      <strong>Shashank Mahajan</strong>
                    </NavLink>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </span>
                    <span className="float-right">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </span>
                  </p>
                  <div className="clearfix"></div>
                  <p>
                    Lorem Ipsum is simply dummy text of the pr make but also the
                    leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                    <a className="float-right btn btn-outline-secondary ml-2 text-light">
                      {" "}
                      <FontAwesomeIcon icon={faReply} /> Reply
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
