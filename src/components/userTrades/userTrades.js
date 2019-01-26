import React from 'react';
import TradeDetails from '../tradeDetails/tradeDetails';
import './userTrades.scss';

class userTrades extends React.Component {
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
      <div className="userTrades">
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
            <TradeDetails props={this.props}/>
          </div>
      </div>
    );
  }
}

export default userTrades;
