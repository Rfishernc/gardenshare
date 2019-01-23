import React from 'react';
import firebase from 'firebase/app';
import userInfoData from '../../data/userInfoData';
import Navbar from '../navbar/navbar';
import './userInfo.scss';

class userInfo extends React.Component {
  state = {
    userName: '',
    picture: '',
    location: '',
    locationName: '',
    qualityRating: '',
    reliabilityRating: '',
    numRating: '',
    email: '',
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    userInfoData.getUser(user.uid)
      .then((userData) => {
        const {
          userName, picture, location, locationName, qualityRating, reliabilityRating, numRating,
        } = userData;
        this.setState({
          userName, picture, location, locationName, qualityRating, reliabilityRating, numRating,
        });
        userInfoData.getEmailByUsername(this.state.userName)
          .then((userEmail) => {
            const { email } = userEmail;
            this.setState({ email });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clickedEdit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="userInfo">
        <Navbar/>
        <div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Username:</p>
            <p className='userInfoUnitData'>{this.state.userName}</p>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Email:</p>
            <p className='userInfoUnitData'>{this.state.email}</p>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Location:</p>
            <p className='userInfoUnitData'>{this.state.locationName}</p>
            <button type='button' className='editLink' onClick={this.clickedEdit}>Edit</button>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Zip Code:</p>
            <p className='userInfoUnitData'>{this.state.location}</p>
            <button type='button' className='editLink' onClick={this.clickedEdit}>Edit</button>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Reliability Rating:</p>
            <p className='userInfoUnitData'>{this.state.reliabilityRating} on {this.state.numRating} Ratings</p>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Quality Rating:</p>
            <p className='userInfoUnitData'>{this.state.qualityRating} on {this.state.numRating} Ratings</p>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Profile Picture:</p>
            <p className='userInfoUnitData'>{this.state.picture}</p>
            <button type='button' className='editLink' onClick={this.clickedEdit}>Edit</button>
            <img src={this.state.picture} className='userInfoUnitPicture' alt='profilePic'/>
          </div>
        </div>
      </div>
    );
  }
}

export default userInfo;
