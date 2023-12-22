// NavbarComponent.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../images/beehive-logo.png";
import LogoutButton from "./Login/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <Navbar.Brand as={NavLink} to="/">
        <span style={{}}>
          <img src={logo} alt="Logo for beehive project" className="logo" />
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ">
          <Nav.Link
            className=" mx-1"
            as={NavLink}
            to="/"
            exact
            onClick={handleNavClick}
          >
            Home
          </Nav.Link>
          <Nav.Link
            className="mx-1"
            as={NavLink}
            to="/about"
            onClick={handleNavClick}
          >
            About
          </Nav.Link>

          <Nav.Link
            className="mx-1"
            as={NavLink}
            to="/maps"
            onClick={handleNavClick}
          >
            Map
          </Nav.Link>
          <Nav.Link
            className="mx-1"
            as={NavLink}
            to="/data"
            onClick={handleNavClick}
          >
            Data
          </Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link
                className="mx-1"
                as={NavLink}
                to="/locations"
                onClick={handleNavClick}
              >
                <i>Edit-Locations</i>
              </Nav.Link>
              <Nav.Link
                className="mx-1"
                as={NavLink}
                to="/keepers"
                onClick={handleNavClick}
              >
                <i>Edit-Keepers</i>
              </Nav.Link>
              <Nav.Link
                className="mx-1"
                as={NavLink}
                to="/types"
                onClick={handleNavClick}
              >
                <i>Edit-Types</i>
              </Nav.Link>
            </>
          )}
          {isAuthenticated && <LogoutButton />}
          {!isAuthenticated && (
            <Nav.Link
              className="mx-1 btn"
              style={{ backgroundColor: "#007BFF" }}
              as={NavLink}
              to="/login"
              onClick={handleNavClick}
            >
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
