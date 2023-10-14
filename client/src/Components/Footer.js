import { AiFillStar } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="footer fixed-bottom bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p className="mb-2 mb-md-0">Email: owner.right@gmail.com</p>
            <p className="mb-2 mb-md-0">Phone: +358 909 676</p>
          </div>
          <div className="col-md-4">
            <p className="mb-2 mb-md-0">Address: Life Street, City of the Moon, Univers, 234 12</p>
          </div>
          <div className="col-md-4">
            <p className="mb-2 mb-md-0">Trust: <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
