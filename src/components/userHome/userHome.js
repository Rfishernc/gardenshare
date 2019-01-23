import React from 'react';
import firebase from 'firebase/app';
import userHomeData from '../../data/userHomeData';
import Navbar from '../navbar/navbar';
import UserPlants from '../userPlants/userPlants';
import PendingOffer from '../pendingOffer/pendingOffer';
import UserTrades from '../userTrades/userTrades';
import AddPlant from '../addPlant/addPlant';

import './userHome.scss';

class userHome extends React.Component {
  state = {
    picture: '',
    userName: '',
    userPlants: '',
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    userHomeData.getUser(user.uid)
      .then((userData) => {
        this.setState({ picture: userData.picture, userName: userData.userName });
        userHomeData.getPlantsByUser(this.state.userName)
          .then((plantsArray) => {
            this.setState({ userPlants: plantsArray });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshPlants = () => {
    userHomeData.getPlantsByUser(this.state.userName)
      .then((plantsArray) => {
        this.setState({ userPlants: plantsArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  userPlantsBuilder = () => {
    const plantsRender = [];
    if (this.state.userPlants !== '') {
      this.state.userPlants.forEach((plantO) => {
        plantsRender.push(<UserPlants dateHarvest={plantO.dateHarvest}
        datePlanted={plantO.datePlanted} num={plantO.num}
        plant={plantO.plant} surplus={plantO.surplus} key={plantO.id}/>);
      });
    }
    return plantsRender;
  }

  userTradesBuilder = () => {
    userHomeData.getActiveTrades(this.state.userName)
      .then((tradesArray) => {
        const tradesRender = [];
        tradesArray.forEach((trade) => {
          tradesRender.push(<UserTrades dateSent={trade.dateSent} dateTrade={trade.dateTrade}
          user1={trade.user1} user2={trade.user2}
          plantsUser1={trade.plantsUser1} plantsUser2={trade.plantsUser2}/>);
        });
        return tradesRender;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pendingOfferBuilder = () => {
    userHomeData.getPendingOffers(this.state.userName)
      .then((sentOffers, receivedOffers) => {
        const sentRender = [];
        const receivedRender = [];
        sentOffers.forEach((offer) => {
          sentRender.push(<PendingOffer dateSent={offer.dateSent} dateTrade={offer.dateTrade}
          user1={offer.user1} user2={offer.user2}
          plantsUser1={offer.plantsUser1} plantsUser2={offer.plantsUser2}/>);
        });
        receivedOffers.forEach((offer) => {
          receivedRender.push(<PendingOffer dateSent={offer.dateSent} dateTrade={offer.dateTrade}
            user1={offer.user1} user2={offer.user2}
            plantsUser1={offer.plantsUser1} plantsUser2={offer.plantsUser2}/>);
        });
        return <div>
                  <div className='sentOffers'>{sentRender}</div>
                  <div className='receivedOffers'>{receivedRender}</div>
              </div>;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="userHome">
        <Navbar/>
        <div>
          <img src={this.state.picture} className='userPicture' alt='profilepic'/>
          <p className='userTitle'>{this.state.userName}</p>
        </div>
        <div className='userPlantsList'>
          {this.userPlantsBuilder()}
          <AddPlant refreshPlants={this.refreshPlants} user={this.state.userName}/>
        </div>
        <div className='userTradesList'>{this.userTradesBuilder()}</div>
        <div className='pendingOfferList'>{this.pendingOfferBuilder()}</div>
      </div>
    );
  }
}

export default userHome;
