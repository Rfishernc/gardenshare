import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import RatingScreen from '../ratingScreen/ratingScreen';
import Messages from '../messages/messages';
import tradeDetailsData from '../../data/tradeDetailsData';
import plantList from '../../data/plantList';
import pendingOfferData from '../../data/pendingOfferData';
import './tradeDetails.scss';

class tradeDetails extends React.Component {
  state = {
    closing: false,
  };

  plantsListBuilder = (plants) => {
    const plantsRender = [];
    const listingKeys = Object.keys(plants);
    listingKeys.forEach((key) => {
      let img = '';
      plantList.forEach((plant) => {
        if (key === plant.name) {
          // eslint-disable-next-line prefer-destructuring
          img = plant.img;
        }
      });
      plantsRender.push(<div key={key}>
        <p><img alt='Img' className='plantIcon' src={img}/>{key}</p>
        <p>{plants[key]}</p>
      </div>);
    });
    return plantsRender;
  }

  closeTrade = (event) => {
    event.preventDefault();
    this.setState({ closing: true });
  }

  updateRating = (quality, reliability) => {
    const otherUser = () => {
      if (this.props.user1 === this.props.user) {
        return this.props.user2;
      }
      return this.props.user1;
    };

    const sameUserPlants = () => {
      if (this.props.user1 === this.props.user) {
        return this.props.plantsUser1;
      }
      return this.props.plantsUser2;
    };
    tradeDetailsData.getUserByUserName(otherUser())
      .then((userData) => {
        const oldQuality = parseInt(userData.qualityRating, 10);
        const oldReliability = parseInt(userData.reliabilityRating, 10);
        const numRating = parseInt(userData.numRating, 10);
        const newQuality = (((oldQuality * numRating) + parseInt(quality, 10)) / (numRating + 1));
        const newReliability = (((oldReliability * numRating)
        + parseInt(reliability, 10)) / (numRating + 1));
        const updatedUser = {
          location: userData.location,
          locationName: userData.locationName,
          numRating: numRating + 1,
          qualityRating: newQuality,
          reliabilityRating: newReliability,
          picture: userData.picture,
          uid: userData.uid,
          userName: userData.userName,
        };
        tradeDetailsData.updateRating(updatedUser, userData.id)
          .then(() => {
            const {
              dateSent,
              dateTrade,
              plantsUser1,
              plantsUser2,
              user1,
              user2,
              id,
              qualityRating1,
              qualityRating2,
              reliabilityRating1,
              reliabilityRating2,
            } = this.props;
            let closedTrade;
            if (otherUser() === user1) {
              closedTrade = {
                dateSent,
                dateTrade,
                plantsUser1,
                plantsUser2,
                user1,
                user2,
                qualityRating1: quality,
                reliabilityRating1: reliability,
                qualityRating2,
                reliabilityRating2,
                accepted: true,
              };
            } else {
              closedTrade = {
                dateSent,
                dateTrade,
                plantsUser1,
                plantsUser2,
                user1,
                user2,
                qualityRating1,
                reliabilityRating1,
                qualityRating2: quality,
                reliabilityRating2: reliability,
                accepted: true,
              };
            }
            tradeDetailsData.closeTrade(closedTrade, id)
              .then(() => {
                tradeDetailsData.updatePlantsQty(this.props.user, sameUserPlants())
                  .then((updatedPlantsArray) => {
                    tradeDetailsData.updatePlantsInDB(updatedPlantsArray)
                      .then(() => {
                        this.props.refreshOffers();
                        this.props.refreshPlants();
                      });
                  });
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  acceptThisOffer = () => {
    pendingOfferData.acceptOffer(this.props.id)
      .then(() => {
        this.props.refreshOffers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeThisOffer = () => {
    pendingOfferData.removeOffer(this.props.id)
      .then(() => {
        this.props.refreshOffers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  buttonBuilder = () => {
    if (this.props.pending) {
      if (this.props.user1 === this.props.user) {
        return <button className='btn btn-sml btn-danger offersButton' onClick={this.removeThisOffer}>Rescind Offer</button>;
      }
      return <div className='offerButtons'>
        <button className='btn btn-sml btn-success offersButton' onClick={this.acceptThisOffer}>Accept Offer</button>
        <button className='btn btn-sml btn-danger offersButton' onClick={this.removeThisOffer}>Decline Offer</button>
      </div>;
    }
    return <button type='button' onClick={this.closeTrade} className='closeTradeButton buttonsGeneric'>Close Trade</button>;
  }

  modalBuilder = () => {
    const {
      dateSent, dateTrade, plantsUser1, plantsUser2, user1, user2, user,
    } = this.props;

    const otherUser = () => {
      if (user1 === user) {
        return user2;
      }
      return user1;
    };

    const otherUserPlants = () => {
      if (user2 === user) {
        return plantsUser1;
      }
      return plantsUser2;
    };

    const sameUserPlants = () => {
      if (user1 === user) {
        return plantsUser1;
      }
      return plantsUser2;
    };

    if (this.state.closing) {
      return <div>
        <ModalHeader className='modalH'>Trade Details
          <button type='button' className='close closeThis' onClick={this.props.toggle}>x</button>
        </ModalHeader>
        <ModalBody className='modalB'>
          <RatingScreen updateRating={this.updateRating}/>
        </ModalBody>
      </div>;
    }
    return <div>
      <ModalHeader className='modalH'>
        Trade Details
        <button type='button' className='close closeThis' onClick={this.props.toggle}>x</button>
      </ModalHeader>
      <ModalBody className='modalB'>
        <div className='row'>
          <ul className="detailsInfo">
            <li className="list-group-item detailsTitleLi">User</li>
            <li className="list-group-item detailsTitleLi">Offer Date</li>
            <li className="list-group-item detailsTitleLi">Transaction Date</li>
            <li className="list-group-item detailsTitleLi">My Contribution</li>
            <li className="list-group-item detailsTitleLi">Their Contribution</li>
          </ul>
          <ul className="detailsInfo">
            <li className="list-group-item detailsLi">{otherUser()}</li>
            <li className="list-group-item detailsLi">{dateSent}</li>
            <li className="list-group-item detailsLi">{dateTrade}</li>
            <li className="list-group-item detailsLi">{this.plantsListBuilder(sameUserPlants())}</li>
            <li className="list-group-item detailsLi">{this.plantsListBuilder(otherUserPlants())}</li>
          </ul>
        </div>
        {this.buttonBuilder()}
        <Messages user={this.props.user} tradeId={this.props.id}/>
      </ModalBody>
    </div>;
  }

  render() {
    return (
      <div className="tradeDetails">
        <Modal isOpen={this.props.modal} toggle={this.toggle} className='tradeModal'>
          {this.modalBuilder()}
        </Modal>
      </div>
    );
  }
}

export default tradeDetails;
