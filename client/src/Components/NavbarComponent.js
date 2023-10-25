// NavbarComponent.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from '../images/beehive-logo.png'

const NavbarComponent = ({ handleNavClick, expanded, setExpanded }) => {
  return (
    <Navbar
      bg="dark"
      expand="lg"
      expanded={expanded}
      variant="dark"
      onToggle={() => setExpanded(!expanded)}
    >
      <Navbar.Brand as={NavLink} to="/" >
        <span style={{}}>
          <img src={logo} alt="Logo for beehive project" className="logo"/>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="mx-1"
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
          <Nav.Link
            className="mx-1"
            as={NavLink}
            to="/admin"
            onClick={handleNavClick}
          >
            <i>Edit-Locations</i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
