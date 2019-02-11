import React from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import plantList from '../../data/plantList';
import './plantSelector.scss';

class plantSelector extends React.Component {
  state = {
    dropdownOpen: false,
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  selectorBuilder = () => {
    const plantRender = [];
    const plantTextSplit = this.props.plantText.split('');
    plantList.forEach((plant) => {
      const plantSplit = plant.name.split('');
      let counter = 0;
      for (let i = 0; i < plantTextSplit.length; i += 1) {
        if (plantTextSplit[i] === plantSplit[i]) {
          counter += 1;
        }
      }
      if (counter === plantTextSplit.length && plantRender.length < 10) {
        plantRender.push(<DropdownItem value={plant.name} key={plant.name}
          onClick={this.selection}><img alt='plant' src={plant.img} className='plantIcon'/>{plant.name}</DropdownItem>);
      }
    });
    return plantRender;
  }

  selection = (event) => {
    event.preventDefault();
    this.props.selection(event.target.value);
  }

  classMaker = () => {
    if (this.props.classMaker === 'plantSelectorMenu') {
      return 'plantSelectorMenu';
    }
    return 'plantSelectorListings';
  }

  render() {
    return (
      <div className='plantSelector'>
      <Dropdown isOpen={true} toggle={this.toggle}>
          <DropdownToggle caret className='dropdownBeGone'>
          </DropdownToggle>
          <DropdownMenu className={this.classMaker()}>
            {this.selectorBuilder()}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default plantSelector;
