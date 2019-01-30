import React from 'react';
import firebase from 'firebase/app';
import Navbar from '../navbar/navbar';
import SearchFilter from '../searchFilter/searchFilter';
import UserListing from '../userListing/userListing';
import ZipcodeSelector from '../zipcodeSelector/zipcodeSelector';
import zipcodeData from '../../data/zipcodeData';
import searchListingsData from '../../data/searchListingsData';
import './searchListings.scss';

class searchListings extends React.Component {
  state = {
    filtersNum: 1,
    usersArray: '',
    userZip: '',
    usersWithPlants: [],
    zipcodeRadius: 0,
    filterInfo: [],
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    searchListingsData.getUser(user.uid)
      .then((userData) => {
        this.setState({ userZip: userData.location });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  newFilter = () => {
    this.setState({ filtersNum: this.state.filtersNum + 1 });
  }

  filtersBuilder = () => {
    const renderArray = [];
    for (let i = 0; i < this.state.filtersNum; i += 1) {
      renderArray.push(<SearchFilter newFilter={this.newFilter} id={i}
        filterInfo={this.filterInfo} addFilterObj={this.addFilterObj} key={i}/>);
    }
    return renderArray;
  }

  listingsBuilder = () => {
    const listingsRender = [];
    if (this.state.usersWithPlants !== []) {
      this.state.usersWithPlants.forEach((user) => {
        listingsRender.push(<UserListing key={user.id} location={user.location}
        locationName={user.locationName} picture={user.picture} numRating={user.numRating}
        qualityRating={user.qualityRating} reliabilityRating={user.reliabilityRating}
        userName={user.userName} plants={user.plants}/>);
      });
    }
    return listingsRender;
  }

  search = () => {
    zipcodeData.zipcodeRadius(this.state.userZip, this.state.zipcodeRadius)
      .then((zipcodesArray) => {
        searchListingsData.getListingsByZipcodes(zipcodesArray)
          .then((usersArrayArray) => {
            const combinedUsersArray = [];
            usersArrayArray.forEach((array) => {
              array.forEach((user) => {
                combinedUsersArray.push(user);
              });
            });
            this.setState({ usersArray: combinedUsersArray });
            searchListingsData.getAllFilteredUsersPlants(this.state.usersArray)
              .then((plantsArrayArray) => {
                const usersWithPlantsArray = combinedUsersArray;
                usersWithPlantsArray.forEach((user) => {
                  plantsArrayArray.forEach((plantArray) => {
                    if (user.userName === plantArray[0].user) {
                      // eslint-disable-next-line no-param-reassign
                      user.plants = plantArray;
                    }
                  });
                });
                this.applyFilters(usersWithPlantsArray);
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  zipcodeRadius = (radius) => {
    this.setState({ zipcodeRadius: radius });
  }

  filterInfo = (filterData) => {
    const filterIndex = this.state.filterInfo.findIndex(x => x.id === filterData.id);
    const filtersArray = this.state.filterInfo;
    filtersArray[filterIndex] = filterData;
    this.setState({ filterInfo: filtersArray });
  }

  addFilterObj = (filterObj) => {
    const addedFilters = this.state.filterInfo;
    addedFilters.push(filterObj);
    this.setState({ filterInfo: addedFilters });
  }

  applyFilters = (usersWithPlantsArray) => {
    let baseArray = usersWithPlantsArray;
    let filteredArray;
    this.state.filterInfo.forEach((filter) => {
      if (filter.type === 'Plant') {
        filteredArray = baseArray.filter(user => user.plants.filter(plantType => plantType.plant === filter.info).length > 0);
      } if (filter.type === 'Quality') {
        filteredArray = baseArray.filter(user => user.qualityRating >= filter.info);
      } if (filter.type === 'Reliability') {
        filteredArray = baseArray.filter(user => user.reliabilityRating >= filter.info);
      }
      baseArray = filteredArray;
    });
    this.setState({ usersWithPlants: baseArray });     
  }

  render() {
    return (
      <div className="searchListings">
        <Navbar/>
        <div>
          {this.filtersBuilder()}
          <div>
            <p>Search distance from my zipcode</p>
            <ZipcodeSelector zipcodeRadius={this.zipcodeRadius}/>
          </div>
          <button type='button' onClick={this.search}>Search</button>
        </div>
        <div>
          {this.listingsBuilder()}
        </div>
      </div>
    );
  }
}

export default searchListings;
