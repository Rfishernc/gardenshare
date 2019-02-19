import React from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase/app';
import userHomeData from '../../data/userHomeData';
import Navbar from '../navbar/navbar';
import UserPlants from '../userPlants/userPlants';
import PendingOffer from '../pendingOffer/pendingOffer';
import UserTrades from '../userTrades/userTrades';
import AddPlant from '../addPlant/addPlant';
import farmerPic from '../../images/farmer-garden-fork.png';
import './userHome.scss';

class userHome extends React.Component {
  state = {
    picture: farmerPic,
    userName: '',
    userPlants: '',
    trades: '',
    sentOffers: '',
    receivedOffers: '',
    removing: false,
    uploading: false,
  }

  componentDidMount() {
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
        datePlanted={plantO.datePlanted} qty={plantO.qty} user={this.state.userName}
        id={plantO.id} refreshPlants={this.refreshPlants}
        plant={plantO.plant} surplus={plantO.surplus} key={plantO.id}
        removing={this.state.removing} endRemoverMode={this.endRemoverMode}/>);
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
        refreshOffers={this.refreshOffers} key={trade.id} refreshPlants={this.refreshPlants}
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
        refreshOffers={this.refreshOffers} key={offer.id} refreshPlants={this.refreshPlants}
        qualityRating1={offer.qualityRating1} reliabilityRating1={offer.reliabilityRating1}
        qualityRating2={offer.qualityRating2} reliabilityRating2={offer.reliabilityRating2}/>);
      });
    }
    if (this.state.receivedOffers !== '') {
      this.state.receivedOffers.forEach((offer) => {
        receivedRender.push(<PendingOffer dateSent={offer.dateSent} dateTrade={offer.dateTrade}
          user1={offer.user1} user2={offer.user2} id={offer.id}
          refreshOffers={this.refreshOffers} refreshPlants={this.refreshPlants}
          plantsUser1={offer.plantsUser1} plantsUser2={offer.plantsUser2} key={offer.id}
          qualityRating1={offer.qualityRating1} reliabilityRating1={offer.reliabilityRating1}
          qualityRating2={offer.qualityRating2} reliabilityRating2={offer.reliabilityRating2}/>);
      });
    }
    return <div>
              <div className='sentOffers'>{sentRender}</div>
              <div className='receivedOffers'>{receivedRender}</div>
          </div>;
  }

  showOffers = (event) => {
    event.preventDefault();
    document.getElementById('userTradesList').style.display = 'none';
    document.getElementById('pendingOfferList').style.display = 'flex';
    if (document.getElementById('offerBut').className.includes(' buttonsGeneric') === false) {
      document.getElementById('offerBut').className += ' buttonsGeneric';
      document.getElementById('tradeBut').className = document.getElementById('tradeBut').className.replace(' buttonsGeneric', '');
    }
  }

  showTrades = (event) => {
    event.preventDefault();
    document.getElementById('pendingOfferList').style.display = 'none';
    document.getElementById('userTradesList').style.display = 'flex';
    if (document.getElementById('tradeBut').className.includes(' buttonsGeneric') === false) {
      document.getElementById('tradeBut').className += ' buttonsGeneric';
      document.getElementById('offerBut').className = document.getElementById('offerBut').className.replace(' buttonsGeneric', '');
    }
  }

  removerMode = (event) => {
    event.preventDefault();
    this.setState({ removing: true });
  }

  endRemoverMode = () => {
    this.setState({ removing: false });
  }

  clickedOff = (event) => {
    event.preventDefault();
    if (this.state.removing && event.target.className.includes('deleteMeLi') === false) {
      this.setState({ removing: false });
    }
  }

  uploadPhoto = (event) => {
    event.preventDefault();
    this.setState({ uploading: true });
  }

  render() {
    return (
      <div className="userHome" onClick={this.clickedOff}>
        <Navbar/>
        <div className='container-fluid'>
          <div className='row userHomeUpperDiv'>
            <div className='userProfile'>
              <img src={this.state.picture} className='userPicture' alt='profilepic'/>
              <p className='userTitle'>{this.state.userName}</p>
            </div>
            <div className='col-2'></div>
            <div className='userPlantsList col-7'>
              <div className='fYouFlex'>
                <p className='plantsTitle'>My Plants</p>
              </div>
              <div className='plantButtsDiv'>
                <AddPlant refreshPlants={this.refreshPlants} user={this.state.userName}/>
                <Button className='plantButton inactiveButton' id='removeBut' onClick={this.removerMode}>Remove</Button>
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
          <div className='row'>
          <div className='offersInfo col-4'>
            <p className='tradesTitle'>My Trades</p>
            <div className='buttonsOffers'>
              <button type='button' onClick={this.showOffers} className='inactiveButton buttonsGeneric' id='offerBut'>Pending Offers</button>
              <button type='button' onClick={this.showTrades} className='inactiveButton' id='tradeBut'>Active Trades</button>
            </div>
            <div className='pendingOfferList' id='pendingOfferList'>
              <div>
                <ul className="userTradesInfo">
                    <li className="list-group-item tradeLi">User</li>
                    <li className="list-group-item tradeLi">Offer Date</li>
                    <li className="list-group-item tradeLi">Transaction Date</li>
                  </ul>
              </div>
              {this.pendingOfferBuilder()}
            </div>
            <div className='pendingOfferList' id='userTradesList'>
              <ul className="userTradesInfo">
                  <li className="list-group-item tradeLi">User</li>
                  <li className="list-group-item tradeLi">Offer Date</li>
                  <li className="list-group-item tradeLi">Transaction Date</li>
                </ul>
              {this.userTradesBuilder()}
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default userHome;
