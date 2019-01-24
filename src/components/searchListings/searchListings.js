import React from 'react';
import Navbar from '../navbar/navbar';
import SearchFilter from '../searchFilter/searchFilter';
import searchListingsData from '../../data/searchListingsData';
import './searchListings.scss';

class searchListings extends React.Component {
  newFilter = () => {

  }

  render() {
    return (
      <div className="searchListings">
      <Navbar/>
      <SearchFilter newFilter={this.newFilter}/>
      </div>
    );
  }
}

export default searchListings;
