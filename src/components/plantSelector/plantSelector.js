import React from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import plantList from '../../data/plantList';
import './plantSelector.scss';

class plantSelector extends React.Component {
  selectorBuilder = () => {
    const plantRender = [];
    const plantTextSplit = this.props.plantText.split('');
    plantList.forEach((plant) => {
      const plantSplit = plant.split('');
      let counter = 0;
      for (let i = 0; i < plantTextSplit.length; i += 1) {
        if (plantTextSplit[i] === plantSplit[i]) {
          counter += 1;
        }
      }
      if (counter === plantTextSplit.length && plantRender.length < 10) {
        plantRender.push(<DropdownItem value={plant}
          onClick={this.selection}>{plant}</DropdownItem>);
      }
    });
    return plantRender;
  }

  selection = (event) => {
    event.preventDefault();
    this.props.selection(event.target.value);
  }

  render() {
    return (
      <div className='plantSelector'>
      <Dropdown isOpen={true}>
          <DropdownToggle caret className='dropdownBeGone'>
          </DropdownToggle>
          <DropdownMenu className='plantSelectorMenu'>
            {this.selectorBuilder()}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default plantSelector;
