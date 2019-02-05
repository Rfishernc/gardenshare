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
    trades: '',
    sentOffers: '',
    receivedOffers: '',
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    userHomeData.getUser(user.uid)
      .then((userData) => {
        this.setState({ picture: userData.picture, userName: userData.userName });
        userHomeData.getPlantsByUser(this.state.userName)
          .then((plantsArray) => {
            this.setState({ userPlants: plantsArray });
          });
        userHomeData.getActiveTrades(this.state.userName)
          .then((tradesArray) => {
            this.setState({ trades: tradesArray });
          });
        userHomeData.getPendingOffers(this.state.userName)
          .then((offers) => {
            const sentOffers = offers.filter(trade => trade.user1 === this.state.userName);
            const receivedOffers = offers.filter(trade => trade.user2 === this.state.userName);
            this.setState({ sentOffers, receivedOffers });
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

  refreshOffers = () => {
    userHomeData.getActiveTrades(this.state.userName)
      .then((tradesArray) => {
        this.setState({ trades: tradesArray });
      });
    userHomeData.getPendingOffers(this.state.userName)
      .then((offers) => {
        const sentOffers = offers.filter(trade => trade.user1 === this.state.userName);
        const receivedOffers = offers.filter(trade => trade.user2 === this.state.userName);
        this.setState({ sentOffers, receivedOffers });
      });
  }

  userPlantsBuilder = () => {
    const plantsRender = [];
    if (this.state.userPlants !== '') {
      this.state.userPlants.forEach((plantO) => {
        plantsRender.push(<UserPlants dateHarvest={plantO.dateHarvest}
        datePlanted={plantO.datePlanted} qty={plantO.qty}
        id={plantO.id} refreshPlants={this.refreshPlants}
        plant={plantO.plant} surplus={plantO.surplus} key={plantO.id}/>);
      });
    }
    return plantsRender;
  }

  userTradesBuilder = () => {
    const tradesRender = [];
    if (this.state.trades !== '') {
      this.state.trades.forEach((trade) => {
        tradesRender.push(<UserTrades dateSent={trade.dateSent} dateTrade={trade.dateTrade}
        user1={trade.user1} user2={trade.user2} user={this.state.userName} id={trade.id}
        plantsUser1={trade.plantsUser1} plantsUser2={trade.plantsUser2}
        refreshOffers={this.refreshOffers} key={trade.id}
        qualityRating1={trade.qualityRating1} reliabilityRating1={trade.reliabilityRating1}
        qualityRating2={trade.qualityRating2} reliabilityRating2={trade.reliabilityRating2}/>);
      });
    }
    return tradesRender;
  }

  pendingOfferBuilder = () => {
    const sentRender = [];
    const receivedRender = [];
    if (this.state.sentOffers !== '') {
      this.state.sentOffers.forEach((offer) => {
        sentRender.push(<PendingOffer dateSent={offer.dateSent} dateTrade={offer.dateTrade}
        user1={offer.user1} user2={offer.user2} user={this.state.userName} id={offer.id}
        plantsUser1={offer.plantsUser1} plantsUser2={offer.plantsUser2}
        refreshOffers={this.refreshOffers} key={offer.id}/>);
      });
    }
    if (this.state.receivedOffers !== '') {
      this.state.receivedOffers.forEach((offer) => {
        receivedRender.push(<PendingOffer dateSent={offer.dateSent} dateTrade={offer.dateTrade}
          user1={offer.user1} user2={offer.user2} id={offer.id}
          refreshOffers={this.refreshOffers}
          plantsUser1={offer.plantsUser1} plantsUser2={offer.plantsUser2} key={offer.id}/>);
      });
    }
    return <div>
              <div className='sentOffers'>{sentRender}</div>
              <div className='receivedOffers'>{receivedRender}</div>
          </div>;
  }

  render() {
    return (
      <div className="userHome">
        <Navbar/>
        <div className='container-fluid'>
          <div className='row userHomeUpperDiv'>
            <div className='userProfile col-3'>
              <img src={this.state.picture} className='userPicture' alt='profilepic'/>
              <p className='userTitle'>{this.state.userName}</p>
            </div>
            <div className='col-1 addPlantButtonDiv'>
              <AddPlant refreshPlants={this.refreshPlants} user={this.state.userName}/>
            </div>
            <div className='userPlantsList col-8'>
              <div className='fYouFlex'>
                <p className='plantsTitle'>My Plants</p>
              </div>
              <div className='col userPlants'>
                <ul className="plantInfo">
                  <li className="list-group-item plantLi plantInfoLi">Plant</li>
                  <li className="list-group-item plantLi plantInfoLi">Quantity</li>
                  <li className="list-group-item plantLi plantInfoLi">Surplus</li>
                  <li className="list-group-item plantLi plantInfoLi">Planting Date</li>
                  <li className="list-group-item plantLi plantInfoLi">Harvest Date</li>
                </ul>
              </div>
              {this.userPlantsBuilder()}
            </div>
          </div>
          <div className='row offersInfo'>
            <div className='userTradesList col'>
              <div className='flexIsMyEnemy'><p className='userTradesTitle'>Active Trades</p></div>
              <ul className="userTradesInfo">
                  <li className="list-group-item tradeLi">User</li>
                  <li className="list-group-item tradeLi">Offer Date</li>
                  <li className="list-group-item tradeLi">Transaction Date</li>
                  <li className="list-group-item tradeLi">My Contribution</li>
                  <li className="list-group-item tradeLi">Their Contribution</li>
                </ul>
              {this.userTradesBuilder()}
            </div>
            <div className='pendingOfferList col'>
              <div className='flexIHateYou'><p className='pendingOfferTitle'>Pending Offers</p></div>
              <div className='stupidFlex'>
                <ul className="userTradesInfo">
                    <li className="list-group-item tradeLi">User</li>
                    <li className="list-group-item tradeLi">Offer Date</li>
                    <li className="list-group-item tradeLi">Transaction Date</li>
                    <li className="list-group-item tradeLi">My Contribution</li>
                    <li className="list-group-item tradeLi">Their Contribution</li>
                  </ul>
                {this.pendingOfferBuilder()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default userHome;
