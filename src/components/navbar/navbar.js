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
    if (link.className.includes(' hovered') === false) {
      link.className += ' hovered';
    }
  }

  hoveredOut = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered')) {
      link.className = link.className.replace(' hovered', '');
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
                <NavLink tag={RRNavLink} to='/home' onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink tag={RRNavLink} to='/userInfo' onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fab fa-wpforms"></i> User Info
                </NavLink>
                <NavLink tag={RRNavLink} to='/tradeHistory' onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-history"></i> Trade History
                </NavLink>
                <NavLink tag={RRNavLink} to='/search' onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-search"></i> Search Listings
                </NavLink>
                <NavLink tag={RRNavLink} to='/giveaways' onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-gift"></i> Giveaways
                </NavLink>
                <NavLink onClick={this.logoutClicked}
                  onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default navbar;
