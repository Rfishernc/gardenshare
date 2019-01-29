import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import RatingScreen from '../ratingScreen/ratingScreen';
import Messages from '../messages/messages';
import tradeDetailsData from '../../data/tradeDetailsData';
import './tradeDetails.scss';

class tradeDetails extends React.Component {
  state = {
    modal: false,
    closing: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  plantsListBuilder = (plants) => {
    const plantsRender = [];
    const listingKeys = Object.keys(plants);
    listingKeys.forEach((key) => {
      plantsRender.push(<div>
        <p>{key}</p>
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
              dateSent, dateTrade, plantsUser1, plantsUser2, user1, user2, id,
            } = this.props;
            const closedTrade = {
              dateSent,
              dateTrade,
              plantsUser1,
              plantsUser2,
              user1,
              user2,
              qualityRating: quality,
              reliabilityRating: reliability,
              accepted: true,
            };
            tradeDetailsData.closeTrade(closedTrade, id)
              .then(() => {
                this.props.refreshOffers();
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
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

    if (this.state.closing) {
      return <div>
        <ModalHeader toggle={this.toggle}>Trade Details</ModalHeader>
        <ModalBody>
          <RatingScreen updateRating={this.updateRating}/>
        </ModalBody>
      </div>;
    }
    return <div>
      <ModalHeader toggle={this.toggle}>Trade Details</ModalHeader>
      <ModalBody>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{otherUser()}</li>
          <li className="list-group-item">{dateSent}</li>
          <li className="list-group-item">{dateTrade}</li>
          <li className="list-group-item">{this.plantsListBuilder(plantsUser1)}</li>
          <li className="list-group-item">{this.plantsListBuilder(plantsUser2)}</li>
        </ul>
        <button type='button' onClick={this.closeTrade}>Close Trade</button>
      </ModalBody>
    </div>;
  }

  render() {
    return (
      <div className="tradeDetails">
        <Button color="success" onClick={this.toggle}>Trade Details</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          {this.modalBuilder()}
          <Messages user={this.props.user} tradeId={this.props.id}/>
        </Modal>
      </div>
    );
  }
}

export default tradeDetails;
