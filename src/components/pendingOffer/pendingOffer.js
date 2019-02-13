import React from 'react';
import pendingOfferData from '../../data/pendingOfferData';
import messagesData from '../../data/messagesData';
import TradeDetails from '../tradeDetails/tradeDetails';
import './pendingOffer.scss';

class pendingOffer extends React.Component {
  state = {
    modal: false,
    message: '',
    pending: true,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
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

  mousedIn =(event) => {
    const tar = event.currentTarget;
    if (tar.className.includes('hovering') === false) {
      tar.className += ' hovering';
    }
  }

  mousedOut = (event) => {
    const tar = event.currentTarget;
    if (tar.className.includes('hovering')) {
      tar.className = tar.className.replace(' hovering', '');
    }
  }

  render() {
    const {
      dateSent,
      dateTrade,
      user1,
      user2,
      user,
      plantsUser1,
      plantsUser2,
      qualityRating1,
      qualityRating2,
      reliabilityRating1,
      reliabilityRating2,
      refreshOffers,
      refreshPlants,
      id,
    } = this.props;

    const otherUser = () => {
      if (user1 === user) {
        return user2;
      }
      return user1;
    };

    return (
      <div className="pendingOffer" onClick={this.toggle} onMouseEnter={this.mousedIn} onMouseLeave={this.mousedOut}>
        <div>
          <ul className="offerInfo">
            <li className="list-group-item offerLi">{otherUser()}</li>
            <li className="list-group-item offerLi">{dateSent}</li>
            <li className="list-group-item offerLi">{dateTrade}</li>
          </ul>
        </div>
        <div className='buttonDiv'>
        </div>
        <TradeDetails dateSent={dateSent} dateTrade={dateTrade}
            user1={user1} refreshOffers={refreshOffers} refreshPlants={refreshPlants}
            modal={this.state.modal} toggle={this.toggle} pending={this.state.pending}
            user2={user2} plantsUser1={plantsUser1} plantsUser2={plantsUser2} user={user} id={id}
            qualityRating1={qualityRating1} reliabilityRating1={reliabilityRating1}
            qualityRating2={qualityRating2} reliabilityRating2={reliabilityRating2}/>
      </div>
    );
  }
}

export default pendingOffer;
