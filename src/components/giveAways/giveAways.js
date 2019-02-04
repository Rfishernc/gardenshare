import React from 'react';
import giveAwaysData from '../../data/giveAwaysData';
import Navbar from '../navbar/navbar';
import GiveAwayListing from '../giveAwayListing/giveAwayListing';
import './giveAways.scss';

class giveAways extends React.Component {
  state = {
    giveAwaysArray: [],
  }

  componentWillMount() {
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

  render() {
    return (
      <div className='giveAways'>
        <Navbar/>
        <div className='container-fluid'>
          {this.giveAwaysBuilder()}
        </div>
      </div>
    );
  }
}

export default giveAways;
