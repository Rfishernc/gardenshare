import React from 'react';
import firebase from 'firebase/app';
import Navbar from '../navbar/navbar';
import SearchFilter from '../searchFilter/searchFilter';
import UserListing from '../userListing/userListing';
import searchListingsData from '../../data/searchListingsData';
import './searchListings.scss';

class searchListings extends React.Component {
  state = {
    filtersNum: 1,
    usersArray: '',
    userZip: '',
    usersWithPlants: '',
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
      renderArray.push(<SearchFilter newFilter={this.newFilter} key={i}/>);
    }
    return renderArray;
  }

  listingsBuilder = () => {
    const listingsRender = [];
    if (this.state.usersWithPlants !== '') {
      this.state.usersArray.forEach((user) => {
        listingsRender.push(<UserListing key={user.id} location={user.location}
        locationName={user.locationName} picture={user.picture} numRating={user.numRating}
        qualityRating={user.qualityRating} reliabilityRating={user.reliabilityRating}
        userName={user.userName} plants={user.plants}/>);
      });
    }
    return listingsRender;
  }

  search = () => {
    searchListingsData.getListings(this.state.userZip)
      .then((usersArray) => {
        this.setState({ usersArray });
        searchListingsData.getAllFilteredUsersPlants(this.state.usersArray)
          .then((plantsArrayArray) => {
            const usersWithPlantsArray = usersArray;
            usersWithPlantsArray.forEach((user) => {
              plantsArrayArray.forEach((plantArray) => {
                if (user.userName === plantArray[0].user) {
                  // eslint-disable-next-line no-param-reassign
                  user.plants = plantArray;
                }
              });
            });
            this.setState({ usersWithPlants: usersWithPlantsArray });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="searchListings">
        <Navbar/>
        <div>
          {this.filtersBuilder()}
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
