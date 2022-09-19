import { React, useState, useEffect } from 'react'
import { Link, NavLink, HashRouter } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
import './Navbar.css'

function NavBar() {
  const [loginStatus, setLoginStatus] = useState(window.sessionStorage.getItem('userInfo') ? "log" : null);

  const handleLogout = async () => {
    window.sessionStorage.clear()
    // alert('Logout successfull!')
    setLoginStatus(null)
    if (window.location.href.search("/Calendar")===-1 && 
        window.location.href.search("/Disclaimer")===-1 &&
        window.location.href.search("/UserInfo")===-1) {
      window.location.href = "/"
    } else {
      window.location.href = "/UserInfo"
    }
  }

  const renderLoginText = () => {
    if (loginStatus) {
      return (
        <Nav.Link as={Link} onClick={handleLogout} className="ml-auto">
          Logout
        </Nav.Link>
      )
    } else {
      return (
        <Nav.Link as={Link} to="/Login" className="ml-auto">
          Login/Register
        </Nav.Link>
      )
    }
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
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/About">About</Nav.Link>
              <Nav.Link as={Link} to="/Service">Bilingual Services</Nav.Link>
              <Nav.Link as={Link} to="/Galary">Our Listeners</Nav.Link>
              <Nav.Link as={Link} to="/UserInfo">Online Booking</Nav.Link>
              <Nav.Link as={Link} to="/Sponsorship">Sponsorship</Nav.Link>
            </Nav>
            <Nav>{renderLoginText()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  )
}

export default NavBar
