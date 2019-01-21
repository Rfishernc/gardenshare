import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import loginData from '../../data/loginData';
import './navbar.scss';

class navbar extends React.Component {
  logoutClicked = (event) => {
    event.preventDefault();
    loginData.logoutUser();
  }

  render() {
    return (
      <div className="navbar">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Developer Plus</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
                <NavLink tag={RRNavLink} to='/userInfo'>User Info</NavLink>
                <NavLink tag={RRNavLink} to='/search'>Search Listings</NavLink>
                <NavLink onClick={this.logoutClicked}>Logout</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default navbar;
