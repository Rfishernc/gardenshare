import React from 'react';
import Navbar from '../navbar/navbar';
import SearchFilter from '../searchFilter/searchFilter';
import searchListingsData from '../../data/searchListingsData';
import './searchListings.scss';

class searchListings extends React.Component {
  state = {
    filtersNum: 1,
  }

  newFilter = () => {
    this.setState({ filtersNum: this.state.filtersNum + 1 });
  }

  filtersBuilder = () => {
    const renderArray = [];
    for (let i = 0; i < this.state.filtersNum; i += 1) {
      renderArray.push(<SearchFilter newFilter={this.newFilter} key={i}/>);
    }
    return renderArray;
  }

  render() {
    return (
      <div className="searchListings">
      <Navbar/>
      {this.filtersBuilder()}
      </div>
    );
  }
}

export default searchListings;
