// NavbarComponent.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarComponent = ({ handleNavClick, expanded, setExpanded }) => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Navbar.Brand as={NavLink} to="/">
        Client App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" exact onClick={handleNavClick}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about" onClick={handleNavClick}>
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/data" onClick={handleNavClick}>
            Data
          </Nav.Link>
          <Nav.Link as={NavLink} to="/maps" onClick={handleNavClick}>
            Map
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin" onClick={handleNavClick}>
            <i>Edit-Locations</i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
