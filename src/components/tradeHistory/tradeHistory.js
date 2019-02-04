import React from 'react';
import firebase from 'firebase/app';
import Navbar from '../navbar/navbar';
import tradeHistoryData from '../../data/tradeHistoryData';
import './tradeHistory.scss';

class tradeHistory extends React.Component {
  state = {
    tradesArray: '',
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    tradeHistoryData.getUser(user.uid)
      .then((userData) => {
        tradeHistoryData.getTradeHistory(userData.userName)
          .then((tradesArray) => {
            this.setState({ tradesArray });
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
        historyRender.push(<div>
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
