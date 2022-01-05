import { React, useState, useEffect } from 'react'
//import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
import './Navbar.css'

function NavBar() {
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem('userInfo') ? "log" : null);

  const renderLoginText = () => {
    if (loginStatus) {
      return (
        <Nav.Link onClick={handleLogout} className="ml-auto">
          Logout
        </Nav.Link>
      )
    } else {
      return (
        <Nav.Link href="/Login" className="ml-auto">
          Login/Register
        </Nav.Link>
      )
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    alert('Logout successfull!')
    setLoginStatus(null);
    window.location.reload(false);
  }

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
            <Nav.Link href="/About">About</Nav.Link>
            <Nav.Link href="/Galary">Our Listeners</Nav.Link>
            <Nav.Link href="/UserInfo">Online Booking</Nav.Link>
          </Nav>
          <Nav>{renderLoginText()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
