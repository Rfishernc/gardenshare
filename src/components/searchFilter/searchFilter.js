import React from 'react';
import './searchFilter.scss';

class searchFilter extends React.Component {
  state = {
    input: '',
    checkedPlant: false,
    checkedReliability: false,
    checkedQuality: false,
    checkedHarvest: false,
    currentFilter: true,
    active: true,
  }

  filterBuilder = () => {
    if (this.state.input === 'Plant') {
      return <input type='text'/>;
    } if (this.state.input === 'Reliability' || this.state.input === 'Quality') {
      return <input type='number' min="0" max="10"/>;
    } if (this.state.input === 'Harvest') {
      return <input type='date'/>;
    }
    return <input type='text'/>;
  }

  checkChanged = (event) => {
    event.preventDefault();
    const newInput = event.target.id.replace('checked', '');
    this.setState({
      checkedPlant: false, checkedReliability: false, checkedQuality: false, checkedHarvest: false,
    });
    this.setState({ [event.target.id]: true, input: newInput });
  }

  filterStatus = () => {
    if (this.state.currentFilter) {
      return <div>
        <p>Add a new filter</p>
        <button type='button' onClick={this.addFilter}>+</button>
        </div>;
    }
    return <div>
    <p>Remove filter</p>
    <button type='button' onClick={this.removeFilter}>x</button>
    </div>;
  }

  addFilter = (event) => {
    event.preventDefault();
    this.props.newFilter();
    this.setState({ currentFilter: false });
  }

  removeFilter = (event) => {
    event.preventDefault();
    this.setState({ active: false });
  }

  render() {
    if (this.state.active) {
      return (
        <div className="searchFilter">
          {this.filterBuilder()}
          <div>
            <div>
              <p>Plant</p>
              <input type='checkbox' checked={this.state.checkedPlant} onChange={this.checkChanged} id='checkedPlant'/>
            </div>
            <div>
              <p>Reliability</p>
              <input type='checkbox' checked={this.state.checkedReliability} onChange={this.checkChanged} id='checkedReliability'/>
            </div>
            <div>
              <p>Quality</p>
              <input type='checkbox' checked={this.state.checkedQuality} onChange={this.checkChanged} id='checkedQuality'/>
            </div>
            <div>
              <p>Harvest Date</p>
              <input type='checkbox' checked={this.state.checkedHarvest} onChange={this.checkChanged} id='checkedHarvest'/>
            </div>
          </div>
          {this.filterStatus()}
        </div>
      );
    }
    return (
      <div></div>
    );
  }
}

export default searchFilter;
