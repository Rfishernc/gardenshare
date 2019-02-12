import React from 'react';
import TradeDetails from '../tradeDetails/tradeDetails';
import './userTrades.scss';

class userTrades extends React.Component {
  state = {
    modal: false,
    pending: false,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      dateSent,
      dateTrade,
      user1,
      user2,
      plantsUser1,
      plantsUser2,
      user,
      id,
      refreshOffers,
      refreshPlants,
      qualityRating1,
      qualityRating2,
      reliabilityRating1,
      reliabilityRating2,
    } = this.props;

    const otherUser = () => {
      if (user1 === user) {
        return user2;
      }
      return user1;
    };

    return (
      <div className="userTrades">
        <div className="offerInfo" onClick={this.toggle}>
            <ul className="offerInfo">
              <li className="list-group-item offerLi">{otherUser()}</li>
              <li className="list-group-item offerLi">{dateSent}</li>
              <li className="list-group-item offerLi">{dateTrade}</li>
            </ul>
            <TradeDetails dateSent={dateSent} dateTrade={dateTrade}
            user1={user1} refreshOffers={refreshOffers} refreshPlants={refreshPlants}
            modal={this.state.modal} toggle={this.toggle} pending={this.state.pending}
            user2={user2} plantsUser1={plantsUser1} plantsUser2={plantsUser2} user={user} id={id}
            qualityRating1={qualityRating1} reliabilityRating1={reliabilityRating1}
            qualityRating2={qualityRating2} reliabilityRating2={reliabilityRating2}/>
          </div>
      </div>
    );
  }
}

export default userTrades;
