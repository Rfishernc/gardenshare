import React from 'react';
import firebase from 'firebase/app';
import userInfoData from '../../data/userInfoData';
import Navbar from '../navbar/navbar';
import ChangePassword from '../changePassword/changePassword';
import './userInfo.scss';

class userInfo extends React.Component {
  state = {
    userName: '',
    dbKey: '',
    picture: '',
    location: '',
    locationName: '',
    qualityRating: '',
    reliabilityRating: '',
    numRating: '',
    email: '',
    editingLocationName: false,
    editingLocation: false,
    editingPicture: false,
    editingEmail: false,
    currentPicture: '',
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    userInfoData.getUser(user.uid)
      .then((userData) => {
        const {
          userName, dbKey, picture, location,
          locationName, qualityRating, reliabilityRating, numRating,
        } = userData;
        this.setState({
          userName,
          dbKey,
          picture,
          location,
          locationName,
          qualityRating,
          reliabilityRating,
          numRating,
          currentPicture: picture,
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

  refreshInfo = () => {
    const user = firebase.auth().currentUser;
    userInfoData.getUser(user.uid)
      .then((userData) => {
        const {
          userName, dbKey, picture, location,
          locationName, qualityRating, reliabilityRating, numRating,
        } = userData;
        this.setState({
          userName,
          dbKey,
          picture,
          location,
          locationName,
          qualityRating,
          reliabilityRating,
          numRating,
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
    if (event.target.id === 'editLocationName') {
      this.setState({ editingLocationName: true });
    } else if (event.target.id === 'editLocation') {
      this.setState({ editingLocation: true });
    } else if (event.target.id === 'editEmail') {
      this.setState({ editingEmail: true });
    } else {
      this.setState({ editingPicture: true });
    }
  }

  clickedSave = (event) => {
    event.preventDefault();
    if (event.target.id === 'saveLocationName') {
      this.setState({ editingLocationName: false });
      userInfoData.updateUserInfo(this.state.dbKey, { locationName: document.getElementById('locationNameInput').value })
        .then(() => {
          this.refreshInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (event.target.id === 'saveLocation') {
      this.setState({ editingLocation: false });
      userInfoData.updateUserInfo(this.state.dbKey, { location: document.getElementById('locationInput').value })
        .then(() => {
          this.refreshInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (event.target.id === 'saveEmail') {
      this.setState({ editingEmail: false });
      userInfoData.updateEmail(this.state.userName, { email: document.getElementById('emailInput').value })
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updateEmail(document.getElementById('emailInput').value)
            .then(() => {
              this.refreshInfo();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ editingPicture: false });
      userInfoData.getPicture(this.state.userName)
        .then((path) => {
          userInfoData.updateUserInfo(this.state.dbKey, { picture: path })
            .then(() => {
              this.refreshInfo();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  clickedCancel = (event) => {
    event.preventDefault();
    if (event.target.id === 'cancelLocationName') {
      this.setState({ editingLocationName: false });
    } else if (event.target.id === 'cancelLocation') {
      this.setState({ editingLocation: false });
    } else if (event.target.id === 'cancelEmail') {
      this.setState({ editingEmail: false });
    } else {
      this.setState({ editingPicture: false, currentPicture: this.state.picture });
    }
  }

  upLoadPicture = (event) => {
    event.preventDefault();
    userInfoData.addPicture(this.state.userName)
      .then(() => {
        userInfoData.getPicture(this.state.userName)
          .then((path) => {
            this.setState({ currentPicture: path });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  locationNameInfoBuilder = () => {
    if (this.state.editingLocationName) {
      return <div>
        <input type='text' className='userInfoUnitInput' id='locationNameInput'/>
        <button type='button' className='saveLink' onClick={this.clickedSave} id='saveLocationName'>Save</button>
        <button type='button' className='cancelLink' onClick={this.clickedCancel} id='cancelLocationName'>Cancel</button>
        </div>;
    }
    return <div className='dataDiv'>
      <p className='userInfoUnitData'>{this.state.locationName}</p>
      <button type='button' className='editLink' onClick={this.clickedEdit} id='editLocationName'>Edit</button>
      </div>;
  }

  locationInfoBuilder = () => {
    if (this.state.editingLocation) {
      return <div>
        <input type='text' className='userInfoUnitInput' id='locationInput'/>
        <button type='button' className='saveLink' onClick={this.clickedSave} id='saveLocation'>Save</button>
        <button type='button' className='cancelLink' onClick={this.clickedCancel} id='cancelLocation'>Cancel</button>
        </div>;
    }
    return <div className='dataDiv'>
      <p className='userInfoUnitData'>{this.state.location}</p>
      <button type='button' className='editLink' onClick={this.clickedEdit} id='editLocation'>Edit</button>
      </div>;
  }

  pictureInfoBuilder = () => {
    if (this.state.editingPicture) {
      return <div className='dataPicDiv'>
        <input type='file' className='uploadInput' id='pictureInput'/>
        <div className='dataPicUpload'>
          <button type='button' onClick={this.upLoadPicture} id='uploadPicture'>Upload</button>
          <button type='button' className='saveLink' onClick={this.clickedSave} id='savePicture'>Save</button>
          <button type='button' className='cancelLink' onClick={this.clickedCancel} id='cancelPicture'>Cancel</button>
        </div>
        <img src={this.state.currentPicture} className='userInfoUnitPicture' alt='profilePic'/>
      </div>;
    }
    return <div className='dataPicDiv'>
          <img src={this.state.picture} className='userInfoUnitPicture' alt='profilePic'/>
          <button type='button' className='editLink' onClick={this.clickedEdit}>Edit</button>
          </div>;
  }

  emailInfoBuilder = () => {
    if (this.state.editingEmail) {
      return <div>
      <input type='email' className='userInfoUnitInput' id='emailInput'/>
      <button type='button' className='saveLink' onClick={this.clickedSave} id='saveEmail'>Save</button>
      <button type='button' className='cancelLink' onClick={this.clickedCancel} id='cancelEmail'>Cancel</button>
      </div>;
    }
    return <div className='dataDiv'>
    <p className='userInfoUnitData'>{this.state.email}</p>
    <button type='button' className='editLink' onClick={this.clickedEdit} id='editEmail'>Edit</button>
    </div>;
  }

  render() {
    return (
      <div className="userInfo">
        <Navbar/>
        <div className='userInfoContainer'>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Username:</p>
            <p className='userInfoUnitData'>{this.state.userName}</p>
            <ChangePassword email={this.state.email}/>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Email:</p>
            {this.emailInfoBuilder()}
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Location:</p>
            {this.locationNameInfoBuilder()}
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Zip Code:</p>
            {this.locationInfoBuilder()}
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Reliability Rating:</p>
            <p className='userInfoUnitData'>{this.state.reliabilityRating} on {this.state.numRating} Ratings</p>
          </div>
          <div className='userInfoUnit'>
            <p className='userInfoUnitTitle'>Quality Rating:</p>
            <p className='userInfoUnitData'>{this.state.qualityRating} on {this.state.numRating} Ratings</p>
          </div>
          <div className='userPicUnit'>
            <p className='userPicUnitTitle'>Profile Picture:</p>
            {this.pictureInfoBuilder()}
          </div>
        </div>
      </div>
    );
  }
}

export default userInfo;
