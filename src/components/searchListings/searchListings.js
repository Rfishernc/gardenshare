import React from 'react';
import firebase from 'firebase/app';
import moment from 'moment';
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

  componentDidMount() {
    this.search();
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
    if (this.state.usersWithPlants !== [] && this.state.usersWithPlants !== undefined) {
      let counter = 0;
      this.state.usersWithPlants.forEach((user) => {
        counter += 1;
        listingsRender.push(<UserListing key={user.id} location={user.location}
        locationName={user.locationName} picture={user.picture} numRating={user.numRating}
        qualityRating={user.qualityRating} reliabilityRating={user.reliabilityRating}
        userName={user.userName} plants={user.plants}
        oddEven={counter / 2 > Math.floor(counter / 2) ? 'odd' : 'even'}/>);
      });
    }
    return listingsRender;
  }

  search = () => {
    zipcodeData.zipcodeRadius(this.state.userZip, this.state.zipcodeRadius)
      .then((zipcodesArray) => {
        searchListingsData.getListingsByZipcodes([zipcodesArray])
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
        filteredArray = baseArray.filter(user => user.plants.filter(plantType => plantType.plant.includes(filter.info)).length > 0);
      } if (filter.type === 'Quality') {
        filteredArray = baseArray.filter(user => user.qualityRating >= filter.info);
      } if (filter.type === 'Reliability') {
        filteredArray = baseArray.filter(user => user.reliabilityRating >= filter.info);
      } if (filter.type === 'Harvest') {
        filteredArray = baseArray.filter(user => user.plants.filter(plant => moment(plant.dateHarvest).unix() <= moment(filter.info).unix()).length > 0);
      }
      baseArray = filteredArray;
    });
    this.setState({ usersWithPlants: baseArray });
  }

  render() {
    return (
      <div className="searchListings">
        <Navbar/>
        <div className='container-fluid'>
          <div className='row'>
            <div className='filterDiv col-3'>
              {this.filtersBuilder()}
              <div className='zipcodeRadiusDiv'>
                <p className='radiusPar'>Search Radius</p>
                <ZipcodeSelector zipcodeRadius={this.zipcodeRadius}/>
              </div>
              <button type='button' onClick={this.search} className='searchButton'>Search</button>
            </div>
            <div className='listingsDiv col-9'>
              {this.listingsBuilder()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default searchListings;
