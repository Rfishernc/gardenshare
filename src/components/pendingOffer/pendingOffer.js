import React from 'react';
import pendingOfferData from '../../data/pendingOfferData';
import messagesData from '../../data/messagesData';
import plantList from '../../data/plantList';
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
      let img = '';
      plantList.forEach((plantType) => {
        if (key === plantType.name) {
          // eslint-disable-next-line prefer-destructuring
          img = plantType.img;
        }
      });
      plantsRender.push(<div key={key} className='tradePlants'>
        <p><img alt='Img' className='plantIcon' src={img}/>{key}</p>
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
      return <button className='btn btn-sml btn-danger offersButton' onClick={this.removeThisOffer}>Rescind Offer</button>;
    }
    return <div className='offerButtons'>
      <button className='btn btn-sml btn-success offersButton' onClick={this.acceptThisOffer}>Accept Offer</button>
      <button className='btn btn-sml btn-danger offersButton' onClick={this.removeThisOffer}>Decline Offer</button>
    </div>;
  }

  messageBuilder = () => {
    if (this.state.message !== '') {
      return <div className='offerMessage'>
      <p className='message'>{this.state.message.message}</p>
      <div>
        <p className='messageUser'>{this.state.message.user}</p>
        <p className='messageDate'>{this.state.message.date}</p>
      </div>
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
        <div className='buttonDiv'>
          {this.buttonBuilder()}
        </div>
      </div>
    );
  }
}

export default pendingOffer;
