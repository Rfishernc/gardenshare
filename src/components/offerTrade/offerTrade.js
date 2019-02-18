import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import firebase from 'firebase/app';
import moment from 'moment';
import offerTradeData from '../../data/offerTradeData';
import messagesData from '../../data/messagesData';
import './offerTrade.scss';

class offerTrade extends React.Component {
  state = {
    modal: false,
    userName: '',
    userPlants: '',
    currentPlant: '',
    currentQty: '',
    offerList: [],
    requestList: [],
    tradeId: '',
    tradeError: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    offerTradeData.getUser(user.uid)
      .then((userData) => {
        offerTradeData.getPlantsByUser(userData.userName)
          .then((userPlants) => {
            this.setState({ userPlants, userName: userData.userName });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validateOffer = () => new Promise((resolve, reject) => {
    const plant = document.getElementById('offerPlantInput').value;
    let qty = document.getElementById('offerQtyInput').value;
    qty = parseInt(qty, 10);
    this.state.userPlants.forEach((plantType) => {
      const parsedSurplus = parseInt(plantType.surplus, 10);
      if (plantType.plant === plant && parsedSurplus >= qty) {
        this.setState({ currentPlant: plant, currentQty: qty });
      }
    });
    resolve();
  })

  validateRequest = () => new Promise((resolve, reject) => {
    const plant = document.getElementById('requestPlantInput').value;
    let qty = document.getElementById('requestQtyInput').value;
    qty = parseInt(qty, 10);
    this.props.plants.forEach((plantType) => {
      const parsedSurplus = parseInt(plantType.surplus, 10);
      if (plantType.plant === plant && parsedSurplus >= qty) {
        this.setState({ currentPlant: plant, currentQty: qty });
      }
    });
    resolve();
  })

  addPlantOffer = (event) => {
    event.preventDefault();
    this.validateOffer()
      .then(() => {
        const currentAdd = {
          plant: this.state.currentPlant,
          qty: this.state.currentQty,
        };
        const pushedList = this.state.offerList;
        if (this.state.currentPlant !== '') {
          pushedList.push(currentAdd);
          this.setState({ offerList: pushedList, currentPlant: '', currentQty: '' });
        }
      });
  }

  addPlantRequest = (event) => {
    event.preventDefault();
    this.validateRequest()
      .then(() => {
        const currentAdd = {
          plant: this.state.currentPlant,
          qty: this.state.currentQty,
        };
        const pushedList = this.state.requestList;
        if (this.state.currentPlant !== '') {
          pushedList.push(currentAdd);
          this.setState({ requestList: pushedList, currentPlant: '', currentQty: '' });
        }
      });
  }

  submitOffer = (event) => {
    this.setState({ tradeError: false });
    this.validateTrade()
      .then(() => {
        if (this.state.tradeError === false) {
          const user1Plants = {
          };
          this.state.offerList.forEach((offer) => {
            user1Plants[offer.plant] = offer.qty;
          });
          const user2Plants = {
          };
          this.state.requestList.forEach((request) => {
            user2Plants[request.plant] = request.qty;
          });
          event.preventDefault();
          const marker = `${Math.random()}`;
          const tradeObject = {
            user1: this.state.userName,
            user2: this.props.userName,
            dateSent: moment().format('MM DD YYYY'),
            dateTrade: document.getElementById('dateInput').value,
            accepted: false,
            plantsUser1: user1Plants,
            plantsUser2: user2Plants,
            reliabilityRating1: false,
            reliabilityRating2: false,
            qualityRating1: false,
            qualityRating2: false,
            marker,
          };
          offerTradeData.postOffer(tradeObject)
            .then(() => {
              this.setState({ offerList: [], requestList: [] });
              this.toggle();
              this.props.toggleParent();
              offerTradeData.getTradeIdByMarker(marker)
                .then((tradeId) => {
                  this.addMessage(tradeId);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }

  myOffersBuilder = () => {
    const offersRender = [];
    if (this.state.offerList !== []) {
      this.state.offerList.forEach((offer) => {
        offersRender.push(<div key={offer.plant}>
          <p>{offer.plant}</p>
          <p>{offer.qty}</p>
        </div>);
      });
    }
    return offersRender;
  }

  myRequestsBuilder = () => {
    const requestsRender = [];
    if (this.state.requestList !== []) {
      this.state.requestList.forEach((request) => {
        requestsRender.push(<div key={request.plant}>
          <p>{request.plant}</p>
          <p>{request.qty}</p>
        </div>);
      });
    }
    return requestsRender;
  }

  addMessage = (tradeId) => {
    this.setState({ tradeId }, () => {
      const newMessage = document.getElementById('messagesTradeInput').value;
      const newMessageObj = {
        tradeId: this.state.tradeId,
        user: this.state.userName,
        message: newMessage,
        date: moment().format('MM DD YYYY'),
      };
      messagesData.postMessage(newMessageObj);
    });
  }

  validateTrade = () => new Promise((resolve) => {
    const msg = document.getElementById('messagesTradeInput').value;
    if (msg === '') {
      this.setState({ tradeError: 'No message entered' });
    } else if (this.state.offerList.length === 0) {
      this.setState({ tradeError: 'No plants offered for trade' });
    } else if (this.state.requestList.length === 0) {
      this.setState({ tradeError: 'No plants requested for trade' });
    }
    resolve();
  })

  render() {
    return (
      <div className="offerTrade">
      <Button className='buttonsGeneric' onClick={this.toggle}>Request Trade</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} className='modalH'>Trade Details</ModalHeader>
          <ModalBody className='modalB'>
            <div>
              <p>Offer</p>
              <p>Plant: </p>
              <input type='text' id='offerPlantInput'/>
              <p>Quantity: </p>
              <input type='number' id='offerQtyInput'/>
              <button type='button' className='buttonsGeneric OTButton' onClick={this.addPlantOffer}>Add</button>
            </div>
            <div>
              <p>Request</p>
              <p>Plant: </p>
              <input type='text' id='requestPlantInput'/>
              <p>Quantity: </p>
              <input type='number' id='requestQtyInput'/>
              <button type='button' className='buttonsGeneric OTButton' onClick={this.addPlantRequest}>Add</button>
            </div>
            <div>
              <p>Offer List</p>
              <p>My Offers</p>
              {this.myOffersBuilder()}
              <p>My Requests</p>
              {this.myRequestsBuilder()}
            </div>
              <input type='text' id='messagesTradeInput'/>
            <div>
              <p>Trade Date: </p>
              <input type='date' id='dateInput'/>
              <button type='button' className='buttonsGeneric OTButton' onClick={this.submitOffer}>Send Offer</button>
              <p className='errorMsg'>{this.state.tradeError ? this.state.tradeError : null}</p>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default offerTrade;
