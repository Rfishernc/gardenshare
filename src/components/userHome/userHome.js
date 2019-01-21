import React from 'react';
import Navbar from '../navbar/navbar';
import './userHome.scss';

class userHome extends React.Component {
  render() {
    return (
      <div className="userHome">
        <Navbar></Navbar>
      </div>
    );
  }
}

export default userHome;
