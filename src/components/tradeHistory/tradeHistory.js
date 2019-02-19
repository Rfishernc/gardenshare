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
    collapse: false,
    currentHistory: '',
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
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

  setHistory = (event) => {
    this.setState({ currentHistory: event.target.id });
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
        historyRender.push(<div key={trade.id} className='THDiv' onClick={this.toggle}>
          <div className='THHeading' id={trade.id} onClick={this.setHistory}>
            <p className='THHeadingPar'>{otherUser()}</p>
            <p className='THHeadingPar'>{trade.dateTrade}</p>
          </div>
          <TradeHistoryCollapse key={trade.id} plants1={trade.plantsUser1}
          plants2={trade.plantsUser2} quality1={trade.qualityRating1} collapse={this.state.collapse}
          quality2={trade.qualityRating2} reliability1={trade.reliabilityRating1}
          reliability2={trade.reliabilityRating2} dateSent={trade.dateSent} id={trade.id}
          user={this.state.user} user1={trade.user1} user2={trade.user2}
          currentHistory={this.state.currentHistory} setHistory={this.setHistory}/>
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
          <div className='THContainer'>
            {this.tradeHistoryBuilder()}
          </div>
        </div>
      </div>
    );
  }
}

export default tradeHistory;
