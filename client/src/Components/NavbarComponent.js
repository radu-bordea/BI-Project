import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/beehive-logo.png";
import LogoutButton from "./Login/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Link = ({ className, to, onClick, children }) => {
  return (
    <a
      href={to}
      className={`nav-link ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

const NavbarComponent = ({ handleNavClick, expanded, setExpanded }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar
      bg="dark"
      expand="lg"
      expanded={expanded}
      variant="dark"
      onToggle={() => setExpanded(!expanded)}
    >
      <Navbar.Brand href="/">
        <span style={{}}>
          <img src={logo} alt="Logo for beehive project" className="logo" />
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            className="nav-link mx-1"
            to="/"
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            className="nav-link mx-1"
            to="/about"
            onClick={handleNavClick}
          >
            About
          </Link>
          <Link
            className="nav-link mx-1"
            to="/maps"
            onClick={handleNavClick}
          >
            Map
          </Link>
          <Link
            className="nav-link mx-1"
            to="/data"
            onClick={handleNavClick}
          >
            Data
          </Link>
          {isAuthenticated && (
            <>
              <Link
                className="nav-link mx-1"
                to="/locations"
                onClick={handleNavClick}
              >
                <i>Edit-Locations</i>
              </Link>
              <Link
                className="nav-link mx-1"
                to="/keepers"
                onClick={handleNavClick}
              >
                <i>Edit-Keepers</i>
              </Link>
              <Link
                className="nav-link mx-1"
                to="/types"
                onClick={handleNavClick}
              >
                <i>Edit-Types</i>
              </Link>
              <Link
                className="nav-link mx-1"
                to="/devices"
                onClick={handleNavClick}
              >
                <i>Edit-Devices</i>
              </Link>
              <Link
                className="nav-link mx-1"
                to="/behives"
                onClick={handleNavClick}
              >
                <i>Edit-Behives</i>
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Link
              className="nav-link mx-1 btn"
              style={{ backgroundColor: "#007BFF" }}
              to="/login"
              onClick={handleNavClick}
            >
              Login
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
