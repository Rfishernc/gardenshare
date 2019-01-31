import React from 'react';
import pendingOfferData from '../../data/pendingOfferData';
import messagesData from '../../data/messagesData';
import './pendingOffer.scss';

class pendingOffer extends React.Component {
  state = {
    message: '',
  }

  componentWillMount() {
    messagesData.getMessages(this.props.id)
      .then((messagesArray) => {
        this.setState({ message: messagesArray[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  plantsListBuilder = (plants) => {
    const plantsRender = [];
    const listingKeys = Object.keys(plants);
    listingKeys.forEach((key) => {
      plantsRender.push(<div className='tradePlants'>
        <p>{key}</p>
        <p>{plants[key]}</p>
      </div>);
    });
    return plantsRender;
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
    if (this.props.user1 === this.props.user) {
      return <button className='btn btn-sml btn-danger' onClick={this.removeThisOffer}>Rescind Offer</button>;
    }
    return <div className='offerButtons'>
      <button className='btn btn-sml btn-success' onClick={this.acceptThisOffer}>Accept Offer</button>
      <button className='btn btn-sml btn-danger' onClick={this.removeThisOffer}>Decline Offer</button>
    </div>;
  }

  messageBuilder = () => {
    if (this.state.message !== '') {
      return <div className='offerMessage'>
      <p className='messageUser'>{this.state.message.user}</p>
      <p className='message'>{this.state.message.message}</p>
      <p className='messageDate'>{this.state.message.date}</p>
    </div>;
    }
    return '';
  }

  render() {
    const {
      dateSent, dateTrade, user1, user2, plantsUser1, plantsUser2, user,
    } = this.props;

    const otherUser = () => {
      if (user1 === user) {
        return user2;
      }
      return user1;
    };

    return (
      <div className="pendingOffer">
        <div>
          <ul className="offerInfo">
            <li className="list-group-item offerLi">{otherUser()}</li>
            <li className="list-group-item offerLi">{dateSent}</li>
            <li className="list-group-item offerLi">{dateTrade}</li>
            <li className="list-group-item offerLi">{this.plantsListBuilder(plantsUser1)}</li>
            <li className="list-group-item offerLi">{this.plantsListBuilder(plantsUser2)}</li>
          </ul>
        </div>
        {this.messageBuilder()}
        {this.buttonBuilder()}
      </div>
    );
  }
}

export default pendingOffer;
