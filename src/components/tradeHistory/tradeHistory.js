import React from 'react';
import firebase from 'firebase/app';
import Navbar from '../navbar/navbar';
import TradeHistoryCollapse from '../tradeHistoryCollapse/tradeHistoryCollapse';
import tradeHistoryData from '../../data/tradeHistoryData';
import './tradeHistory.scss';

class tradeHistory extends React.Component {
  state = {
    tradesArray: '',
    user: '',
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    tradeHistoryData.getUser(user.uid)
      .then((userData) => {
        tradeHistoryData.getTradeHistory(userData.userName)
          .then((tradesArray) => {
            this.setState({ tradesArray, user: userData.userName });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  tradeHistoryBuilder = () => {
    const historyRender = [];
    if (this.state.tradesArray !== '') {
      this.state.tradesArray.forEach((trade) => {
        const otherUser = () => {
          if (this.state.user === trade.user1) {
            return trade.user2;
          }
          return trade.user1;
        };
        historyRender.push(<div key={trade.id}>
          <p>{otherUser()}</p>
          <p>{trade.dateTrade}</p>
          <TradeHistoryCollapse key={trade.id} plants1={trade.plantsUser1}
          plants2={trade.plantsUser2} quality1={trade.qualityRating1}
          quality2={trade.qualityRating2} reliability1={trade.reliabilityRating1}
          reliability2={trade.reliabilityRating2} dateSent={trade.dateSent}
          user={this.state.user} user1={trade.user1} user2={trade.user2}/>
        </div>);
      });
    }
    return historyRender;
  }

  render() {
    return (
      <div className='tradeHistory'>
        <Navbar/>
        <div className='container-fluid'>
          {this.tradeHistoryBuilder()}
        </div>
      </div>
    );
  }
}

export default tradeHistory;
