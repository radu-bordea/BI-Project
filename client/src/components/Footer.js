import { AiFillStar } from "react-icons/ai";
import './Content.css'

function Footer() {
  return (
    <footer className="footer">
      <p>email: owner.right@gmail.com</p>
      <p>phone: +358 909 676</p>
      <p>
        Address: Life Street, City of the Moon, Univers, 234 12
      </p>
      <p>
        Trust:{" "}
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
      </p>
    </footer>
  );
}

export default Footer;
