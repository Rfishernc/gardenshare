import React from 'react';
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
    if (this.state.messagesArray !== '') {
      this.state.messagesArray.forEach((message) => {
        messagesRender.push(<div className='singleMessage'>
          <p>{message.user}</p>
          <p>{message.message}</p>
          <p>{message.date}</p>
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
      date: new Date(),
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
        {this.messagesBuilder()}
        <div>
          <input type='text' id='messagesInput'/>
          <button type='button' onClick={this.addMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default messages;
