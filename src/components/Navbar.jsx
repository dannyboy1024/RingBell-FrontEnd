import React from "react";
//import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/Navbar.css";

const NavBar = () => {
  return (
    <Navbar className="main-nav" bg="light" expand="lg">
      <Container className="nav-container">
        <Navbar.Brand className="nav-name" href="/">
          <img className="logo-img" src="logo_with_text.PNG" alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Galary">
              Our Listeners
            </Nav.Link>
            <Nav.Link href="/UserInfo">Online Booking</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
