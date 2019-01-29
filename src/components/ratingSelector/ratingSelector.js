import React from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import './ratingSelector.scss';

class ratingSelector extends React.Component {
  state = {
    dropdownOpen: false,
    selection: 1,
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
        this.props.selection(this.props.rating, this.state.selection);
      });
  }

  render() {
    return (
      <div className='ratingSelector'>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.selection}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.selection} value='1'>1</DropdownItem>
          <DropdownItem onClick={this.selection} value='2'>2</DropdownItem>
          <DropdownItem onClick={this.selection} value='3'>3</DropdownItem>
          <DropdownItem onClick={this.selection} value='4'>4</DropdownItem>
          <DropdownItem onClick={this.selection} value='5'>5</DropdownItem>
          <DropdownItem onClick={this.selection} value='6'>6</DropdownItem>
          <DropdownItem onClick={this.selection} value='7'>7</DropdownItem>
          <DropdownItem onClick={this.selection} value='8'>8</DropdownItem>
          <DropdownItem onClick={this.selection} value='9'>9</DropdownItem>
          <DropdownItem onClick={this.selection} value='10'>10</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
    );
  }
}

export default ratingSelector;
