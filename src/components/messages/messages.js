import React from 'react';
import moment from 'moment';
import messagesData from '../../data/messagesData';
import './messages.scss';

class messages extends React.Component {
  state = {
    messagesArray: '',
  }

  componentWillMount() {
    messagesData.getMessages(this.props.tradeId)
      .then((messagesArray) => {
        this.setState({ messagesArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  messagesBuilder = () => {
    const messagesRender = [];
    const whichUser = (user) => {
      if (user === this.props.user) {
        return 'sentMsg';
      }
      return 'receivedMsg';
    };
    if (this.state.messagesArray !== '') {
      this.state.messagesArray.forEach((message) => {
        messagesRender.push(<div className={whichUser(message.user)}>
          <div className='msgInfo'>
            <p className='msgPar msgUser'>{message.user}</p>
            <p className='msgPar msgDate'>{message.date}</p>
          </div>
          <p className='msgPar msgMsg'>{message.message}</p>
        </div>);
      });
    }
    return messagesRender;
  }

  addMessage = (event) => {
    event.preventDefault();
    const newMessage = document.getElementById('messagesInput').value;
    const newMessageObj = {
      tradeId: this.props.tradeId,
      user: this.props.user,
      message: newMessage,
      date: moment().format('MM DD YYYY, hA'),
    };
    messagesData.postMessage(newMessageObj)
      .then(() => {
        this.refreshMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshMessages = () => {
    messagesData.getMessages(this.props.tradeId)
      .then((messagesArray) => {
        this.setState({ messagesArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='messages'>
        <div className='messagesDiv'>
          {this.messagesBuilder()}
        </div>
        <div className='messageNew'>
          <input type='text' id='messagesInput'/>
          <button type='button' onClick={this.addMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default messages;
