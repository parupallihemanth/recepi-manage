import React from "react";
import "../Styles/landingPage.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import HeaderIcon from "../Images/headerIcon2.png";
import { isAutheticated } from "../apiCalls/login";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const { data } = isAutheticated();

console.log(data);

const Header = ({ history }) => {
  return (
    <Navbar bg='dark' expand='lg'>
      <Navbar.Brand href='/'>
        <img
          alt=''
          src={HeaderIcon}
          width='90'
          height='90'
          // className='d-inline-block align-top'
          style={{ marginLeft: "3em" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse>
        <Nav className='nav-items'>
          <Link
            className='nav-link'
            to='/'
            // style={{ color: "white", fontSize: "1.3rem" }}
            style={currentTab(history, "/")}
          >
            Home
          </Link>
          {isAutheticated() && (
            <Link
              className='nav-link'
              to='/allRecipes'
              style={{ color: "white", fontSize: "1.3rem" }}
            >
              All recipes
            </Link>
          )}

          {isAutheticated() && (
            <Link
              to='profile'
              className='nav-link'
              style={currentTab(history, "/profile")}
            >
              Profile
            </Link>
          )}

          {!isAutheticated() && (
            <Link
              to='/login'
              className='nav-link'
              style={currentTab(history, "/login")}
            >
              Login
            </Link>
          )}

          {isAutheticated() && (
            <Link
              to='/login'
              className='nav-link'
              style={{ color: "white", fontSize: "1.3rem" }}
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("jwt");
                history.push("/login");
                window.location.reload();
              }}
            >
              Logout
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Header);
