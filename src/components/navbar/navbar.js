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
import gnomePic from '../../images/misc-npc-garden-gnome.png';
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
          <NavbarBrand className='navTitle' href="/">
            <img src={gnomePic} alt='logo' className='gnome'/>
            Gardenshare
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem className='navLinks'>
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
