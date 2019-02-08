import React from 'react';
import firebase from 'firebase/app';
import Navbar from '../navbar/navbar';
import GiveAwayListing from '../giveAwayListing/giveAwayListing';
import GiveAwayPlants from '../giveAwayPlants/giveAwayPlants';
import ZipcodeSelector from '../zipcodeSelector/zipcodeSelector';
import giveAwaysData from '../../data/giveAwaysData';
import zipcodeData from '../../data/zipcodeData';
import './giveAways.scss';

class giveAways extends React.Component {
  state = {
    giveAwaysArray: [],
    userName: '',
    userPlants: [],
    selectedPlants: [],
    zipcodeRadius: 0,
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    giveAwaysData.getUser(user.uid)
      .then((userData) => {
        this.setState({ userName: userData.userName, userZip: userData.location }, () => {
          giveAwaysData.getUsersForGiveAways([this.state.userZip])
            .then((giveAwaysArray) => {
              this.setState({ giveAwaysArray });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        giveAwaysData.getPlantsByUser(userData.userName)
          .then((userPlants) => {
            this.setState({ userPlants });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  giveAwaysBuilder = () => {
    const giveRender = [];
    if (this.state.giveAwaysArray !== []) {
      this.state.giveAwaysArray.forEach((giveAway) => {
        const {
          id, userName, user, startDate, endDate, startTime, endTime, address, plants,
        } = giveAway;
        giveRender.push(<GiveAwayListing key={id} userName={userName}
        loctionName={user.loctionName} location={user.location} plants={plants}
        qualityRating={user.qualityRating} reliabilityRating={user.reliabilityRating}
        numRating={user.numRating} picture={user.picture} startDate={startDate}
        endDate={endDate} startTime={startTime} endTime={endTime} address={address}/>);
      });
    }
    return giveRender;
  }

  selectPlants = (plantArray) => {
    this.setState({ selectedPlants: plantArray });
  }

  submitGiveAway = (event) => {
    event.preventDefault();
    const selectedPLantsObj = {};
    this.state.selectedPlants.forEach((plantOb) => {
      selectedPLantsObj[plantOb.plant] = plantOb.qty;
    });
    const giveAwayOb = {
      userName: this.state.userName,
      startDate: document.getElementById('startDateInput').value,
      endDate: document.getElementById('endDateInput').value,
      address: document.getElementById('addressInput').value,
      startTime: document.getElementById('timeStartInput').value,
      endTime: document.getElementById('timeEndInput').value,
      plants: selectedPLantsObj,
      completed: false,
      zipcode: document.getElementById('zipcodeInput').value,
    };
    giveAwaysData.postGiveAway(giveAwayOb);
  }

  zipcodeRadius = (radius) => {
    this.setState({ zipcodeRadius: radius });
  }

  search = () => {
    // zipcodeData.zipcodeRadius(this.state.userZip, this.state.zipcodeRadius)
    //   .then((zipcodesArray) => {
    giveAwaysData.getGiveAwaysByZips([37090])
      .then((giveAwaysArray) => {
        this.setState({ giveAwaysArray });
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='giveAways'>
        <Navbar/>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-3'>
              <p>Create a Giveaway</p>
              <div className='scheduleDiv'>
                <p>Giveaway Schedule</p>
                <div>
                  <p>Start Date: </p>
                  <input type='date' id='startDateInput'/>
                </div>
                <div>
                  <p>End Date: </p>
                  <input type='date' id='endDateInput'/>
                </div>
              </div>
              <p>Pick-up Hours</p>
              <div className='timeDiv'>
                <input type='time' id='timeStartInput' className='timeInput' defaultValue='12:00'/>
                <p>To </p>
                <input type='time' id='timeEndInput' className='timeInput' defaultValue='12:00'/>
              </div>
              <div className='addressDiv'>
                <p>Giveaway Location: </p>
                <input type='text' id='addressInput'/>
                <p>Zip Code</p>
                <input type='text' id ='zipcodeInput'/>
              </div>
              {this.state.userPlants.length > 0 ? <GiveAwayPlants plants={this.state.userPlants}
              userName={this.state.userName}
              selectPlants={this.selectPlants}/> : null }
              <button type='button' onClick={this.submitGiveAway}>Post Giveaway</button>
              <div className='searchDiv'>
                <p>Expand Search Radius</p>
                <ZipcodeSelector zipcodeRadius={this.zipcodeRadius}/>
                <button type='button' onClick={this.search}>Search</button>
              </div>
            </div>
            <div className='col-9'>
              {this.giveAwaysBuilder()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default giveAways;
