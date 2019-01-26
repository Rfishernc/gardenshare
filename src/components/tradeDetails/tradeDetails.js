import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import RatingScreen from '../ratingScreen/ratingScreen';
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
          <RatingScreen/>
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
        </Modal>
      </div>
    );
  }
}

export default tradeDetails;
