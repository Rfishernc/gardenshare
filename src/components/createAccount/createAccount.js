import React from 'react';
import createAccountData from '../../data/createAccountData';
import './createAccount.scss';

class createAccount extends React.Component {
  createUser = (event) => {
    event.preventDefault();
    const userName = document.getElementById('usernameInput').value;
    const pw = document.getElementById('pwInput').value;
    const email = document.getElementById('emailInput').value;
    const location = document.getElementById('locationInput').value;
    const locationName = document.getElementById('locationNameInput').value;
    const newUser = {
      userName,
      location,
      locationName,
      reliabilityRating: 0,
      qualityRating: 0,
      numRating: 0,
      picture: 'https://firebasestorage.googleapis.com/v0/b/gardenshare-890ac.appspot.com/o/cartoon-frog.png?alt=media&token=325e15d3-1fea-41ed-9627-4c1cc36882bc',
    };
    createAccountData.createUser(email, pw)
      .then(() => {
        newUser.uid = createAccountData.getNewUser().uid;
        createAccountData.createUserObject(newUser)
          .then(() => {
            this.props.history.push('/home');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="createAccount">
        <div className="jumbotron">
            <h1 className="display-4">Create a new account</h1>
            <form>
              <div className="form-group">
                <label htmlFor="usernameInput">Username</label>
                <input type="email" className="form-control" id="usernameInput" placeholder="Enter username"/>
              </div>
              <div className="form-group">
                <label htmlFor="emailInput">Email</label>
                <input type="email" className="form-control" id="emailInput" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <label htmlFor="locationNameInput">Location</label>
                <input type="email" className="form-control" id="locationNameInput" placeholder="Enter location"/>
              </div>
              <div className="form-group">
                <label htmlFor="locationInput">Zip Code</label>
                <input type="email" className="form-control" id="locationInput" placeholder="Enter zip"/>
              </div>
              <div className="form-group">
                <label htmlFor="pwInput">Password</label>
                <input type="password" className="form-control" id="pwInput" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.createUser}>Create Account</button>
            </form>
          </div>
      </div>
    );
  }
}

export default createAccount;
