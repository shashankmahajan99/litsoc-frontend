import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const SponsoredPost = () => {
  return (
    <div className="card bg-dark">
      <h5 className="card-header border-secondary text-light">
        Sponsored Post
      </h5>
      <div className="card-body">
        <Link
          to={`/viewpost/606d3ac0a15d0d0017506753`}
          className="text-decoration-none"
        >
          <h4 className="font-weight-bold card-headline font-xs-130">
            The Devil and the Dark Water by Stuart Turton
          </h4>
        </Link>
        <h6 className="text-info card-paragraph">Summary</h6>
        <div className="font-weight-normal font-small text-secondary font-xs-100">
          <p>
            Description - A murder on the high seas. A detective duo. A demon
            who may or may not exist. It's 1634 and Samuel Pipps, the world's
            greatest detective, is being transported to Amsterdam to be executed
            for a crime he may, or may not, have committed. Travelling with him
            is his loyal bodyguard, Arent Hayes, who is determined to prove his
            friend innocent. But no sooner are they out to sea than devilry
            begins to bli...
            <strong>
              <Link
                to={`/viewpost/5fec947946cf1d27dc1a3c13`}
                className="text-light"
              >
                Read More
              </Link>
            </strong>
          </p>
        </div>
        <h6>
          <Badge pill className="mx-2 mt-1 p-1" variant="info">
            Mystery
          </Badge>
          <Badge pill className="mx-2 mt-1 p-1" variant="info">
            Thriller
          </Badge>
        </h6>
        <div className="row">
          <div className="col-5">
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/litsoc-a8678.appspot.com/o/utkarsh?alt=media"
              }
              roundedCircle
              height="120"
              className="my-2 postProfilePic"
              width="120"
            />
          </div>
          <div className="col-7 my-auto">
            <Link
              to={`/secondUser/5fec90f346cf1d27dc1a3bdf`}
              className="text-decoration-none"
            >
              <h5 className="font-weight-bold text-light">Utkarsh Bhardwaj</h5>
            </Link>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default SponsoredPost;
