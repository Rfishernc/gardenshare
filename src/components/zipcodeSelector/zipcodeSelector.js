import React from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import './zipcodeSelector.scss';

class zipcodeSelector extends React.Component {
  state = {
    dropdownOpen: false,
    selection: 0,
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  selectionPromise = event => new Promise((resolve, reject) => {
    this.setState({ selection: event.target.value });
    resolve();
  })

  selection = (event) => {
    event.preventDefault();
    this.selectionPromise(event)
      .then(() => {
        this.props.zipcodeRadius(this.state.selection);
      });
  }

  render() {
    return (
      <div className='zipcodeSelector'>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.state.selection}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.selection} value='0'>0</DropdownItem>
            <DropdownItem onClick={this.selection} value='10'>10 miles</DropdownItem>
            <DropdownItem onClick={this.selection} value='20'>20 miles</DropdownItem>
            <DropdownItem onClick={this.selection} value='30'>30 miles</DropdownItem>
            <DropdownItem onClick={this.selection} value='40'>40 miles</DropdownItem>
            <DropdownItem onClick={this.selection} value='50'>50 miles</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default zipcodeSelector;
