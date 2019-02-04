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

  hovered = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered')) {
      link.className = link.className.replace(' hovered', '');
    } else {
      link.className += ' hovered';
    }
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
                <NavLink tag={RRNavLink} to='/home' onMouseEnter={this.hovered} onMouseLeave={this.hovered}>Home</NavLink>
                <NavLink tag={RRNavLink} to='/userInfo' onMouseEnter={this.hovered} onMouseLeave={this.hovered}>User Info</NavLink>
                <NavLink tag={RRNavLink} to='/tradeHistory' onMouseEnter={this.hovered} onMouseLeave={this.hovered}>Trade History</NavLink>
                <NavLink tag={RRNavLink} to='/search' onMouseEnter={this.hovered} onMouseLeave={this.hovered}>Search Listings</NavLink>
                <NavLink tag={RRNavLink} to='/giveaways' onMouseEnter={this.hovered} onMouseLeave={this.hovered}>Give-aways</NavLink>
                <NavLink onClick={this.logoutClicked}
                onMouseEnter={this.hovered} onMouseLeave={this.hovered}>Logout</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default navbar;
