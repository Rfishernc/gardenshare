import React from 'react';
import PlantSelector from '../plantSelector/plantSelector';
import './searchFilter.scss';

class searchFilter extends React.Component {
  state = {
    input: '',
    info: '',
    plantText: '',
    plantSelection: '',
    checkedPlant: false,
    checkedReliability: false,
    checkedQuality: false,
    checkedHarvest: false,
    currentFilter: true,
    active: true,
  }

  componentDidMount() {
    const filterObj = {
      type: 'Plant',
      info: '',
      id: this.props.id,
    };
    this.props.addFilterObj(filterObj);
  }

  selectorBuilder = () => {
    if (this.state.plantText !== '') {
      return <PlantSelector plantText={this.state.plantText} selection={this.selection}/>;
    }
    return '';
  }

  plantText = (event) => {
    event.preventDefault();
    this.setState({ plantText: event.target.value });
  }

  selection = (plant) => {
    this.setState({ plantSelection: plant, plantText: plant }, () => {
      document.getElementById('plantInput').value = this.state.plantSelection;
    });
  }

  filterBuilder = () => {
    if (this.state.input === 'Plant') {
      return <div>
          <input type='text' onChange={this.updateInfo} className='filterInput' id='plantInput'/>
          {this.selectorBuilder()}
        </div>;
    } if (this.state.input === 'Reliability' || this.state.input === 'Quality') {
      return <input type='number' min="0" max="10" onChange={this.updateInfo} className='filterInput'/>;
    } if (this.state.input === 'Harvest') {
      return <input type='date' onChange={this.updateInfo} className='filterInput'/>;
    }
    return <input type='text' onChange={this.updateInfo} className='filterInput'/>;
  }

  checkChanged = (event) => {
    const newInput = event.target.id.replace('checked', '');
    const eventId = event.target.id;
    this.setState({
      checkedPlant: false, checkedReliability: false, checkedQuality: false, checkedHarvest: false,
    }, () => {
      this.setState({ [eventId]: true, input: newInput });
    });
  }

  filterStatus = () => {
    if (this.state.currentFilter) {
      return <div className='filterNew'>
        <p className='filterNewPar'>Add a new filter</p>
        <button type='button' className='filterNewButton' onClick={this.addFilter}>+</button>
        </div>;
    }
    return <div className='filterNew'>
    <p className='filterNewPar'>Remove filter</p>
    <button type='button' className='filterRemoveButton' onClick={this.removeFilter}>x</button>
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

  updateInfo = (event) => {
    event.preventDefault();
    this.plantText(event);
    this.setState({ info: event.target.value }, () => {
      const filterData = {
        type: this.state.input,
        info: this.state.info,
        id: this.props.id,
      };
      this.props.filterInfo(filterData);
    });
  }

  render() {
    if (this.state.active) {
      return (
        <div className="searchFilter">
          {this.filterBuilder()}
          <div className='filterCheckDiv'>
            <div className='filterCheck'>
              <p className='filterCheckTitle'>Plant</p>
              <input type='checkbox' className='checkBox' checked={this.state.checkedPlant} onChange={this.checkChanged} id='checkedPlant'/>
            </div>
            <div className='filterCheck'>
              <p className='filterCheckTitle'>Reliability</p>
              <input type='checkbox' className='checkBox' checked={this.state.checkedReliability} onChange={this.checkChanged} id='checkedReliability'/>
            </div>
            <div className='filterCheck'>
              <p className='filterCheckTitle'>Quality</p>
              <input type='checkbox' className='checkBox' checked={this.state.checkedQuality} onChange={this.checkChanged} id='checkedQuality'/>
            </div>
            <div className='filterCheck'>
              <p className='filterCheckTitle'>Harvest Date</p>
              <input type='checkbox' className='checkBox' checked={this.state.checkedHarvest} onChange={this.checkChanged} id='checkedHarvest'/>
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
