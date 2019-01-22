import React from 'react';
import firebase from 'firebase/app';
import userHomeData from '../../data/userHomeData';
import Navbar from '../navbar/navbar';

import './userHome.scss';

class userHome extends React.Component {
  state = {
    picture: '',
    userName: '',
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    userHomeData.getUser(user.uid)
      .then((userData) => {
        this.setState({ picture: userData.picture, userName: userData.userName });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="userHome">
        <Navbar/>
        <div>
          <img src={this.state.picture} className='userPicture' alt='profilepic'/>
          <p className='userTitle'>{this.state.userName}</p>
        </div>
      </div>
    );
  }
}

export default userHome;
