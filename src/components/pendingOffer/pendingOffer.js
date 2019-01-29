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
      plantsRender.push(<div>
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
      return <div>
      <p>{this.state.message.user}</p>
      <p>{this.state.message.message}</p>
      <p>{this.state.message.date}</p>
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
        <div className="card" style={{ width: '20rem' } }>
            <div className="card-header">
              {}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{otherUser()}</li>
              <li className="list-group-item">{dateSent}</li>
              <li className="list-group-item">{dateTrade}</li>
              <li className="list-group-item">{this.plantsListBuilder(plantsUser1)}</li>
              <li className="list-group-item">{this.plantsListBuilder(plantsUser2)}</li>
            </ul>
            {this.messageBuilder()}
            {this.buttonBuilder()}
          </div>
      </div>
    );
  }
}

export default pendingOffer;
