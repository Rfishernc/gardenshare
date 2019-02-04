import React from 'react';
import firebase from 'firebase/app';
import giveAwaysData from '../../data/giveAwaysData';
import Navbar from '../navbar/navbar';
import GiveAwayListing from '../giveAwayListing/giveAwayListing';
import GiveAwayPlants from '../giveAwayPlants/giveAwayPlants';
import './giveAways.scss';

class giveAways extends React.Component {
  state = {
    giveAwaysArray: [],
    userName: '',
    userPlants: [],
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    giveAwaysData.getUser(user.uid)
      .then((userData) => {
        this.setState({ userName: userData.userName });
        giveAwaysData.getPlantsByUser(userData.userName)
          .then((userPlants) => {
            this.setState({ userPlants });
          });
      })
      .catch((err) => {
        console.log(err);
      });
    giveAwaysData.getUsersForGiveAways()
      .then((giveAwaysArray) => {
        this.setState({ giveAwaysArray });
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

  submitGiveAway = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className='giveAways'>
        <Navbar/>
        <div className='container-fluid'>
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
            <div className='timeDiv'>
              <div>
                <p>Pick-up Hours</p>
                <p>To </p>
              </div>
            </div>
            <div className='addressDiv'>
              <p>Giveaway Location: </p>
              <input type='text' id='addressInput'/>
            </div>
            <GiveAwayPlants plants={this.state.userPlants} userName={this.state.userName}/>
            <button type='button' onClick={this.submitGiveAway}>Post Giveaway</button>
          </div>
          <div className='col-9'>
            {this.giveAwaysBuilder()}
          </div>
        </div>
      </div>
    );
  }
}

export default giveAways;
