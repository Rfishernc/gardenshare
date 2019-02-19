import React from 'react';
import createAccountData from '../../data/createAccountData';
import './createAccount.scss';
import gnome from '../../images/misc-npc-garden-gnome.png';

class createAccount extends React.Component {
  state = {
    error: false,
  }

  createUser = (event) => {
    event.preventDefault();
    this.setState({ error: false });
    this.validate()
      .then(() => {
        if (this.state.error === false) {
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
                  const newUserEmail = {
                    email,
                    userName,
                  };
                  createAccountData.createEmailObject(newUserEmail)
                    .then(() => {
                      this.props.history.push('/home');
                    });
                });
            })
            .catch((err) => {
              if (err.code === 'auth/email-already-in-use') {
                this.setState({ error: 'Email already registered.  Use another email address' });
              }
              if (err.code === 'auth/weak-password') {
                this.setState({ error: 'Password must be at least six characters' });
              }
            });
        }
      });
  }

  validate = () => new Promise((resolve) => {
    const userName = document.getElementById('usernameInput').value;
    const pw = document.getElementById('pwInput').value;
    const email = document.getElementById('emailInput').value;
    const zip = document.getElementById('locationInput').value;
    const locationName = document.getElementById('locationNameInput').value;
    const splitZip = zip.split('');
    createAccountData.getUserList()
      .then((usersArray) => {
        usersArray.forEach((user) => {
          if (user.userName === userName) {
            this.setState({ error: 'Username already taken.  Choose a new username' });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    if (userName === '') {
      this.setState({ error: 'No username entered' });
    } else if (pw === '') {
      this.setState({ error: 'No password entered' });
    } else if (email === '') {
      this.setState({ error: 'No email entered' });
    } else if (locationName === '') {
      this.setState({ error: 'No location entered' });
    } else if (zip === '') {
      this.setState({ error: 'No zip code entered' });
    } else if (splitZip.length !== 5) {
      this.setState({ error: 'Incorrect zip code format.  Use 5 digit code' });
    } else {
      splitZip.forEach((char) => {
        if (char !== '0' && char !== '1' && char !== '2' && char !== '3' && char !== '4' && char !== '5'
        && char !== '6' && char !== '7' && char !== '8' && char !== '9') {
          this.setState({ error: 'Incorrect zip code character input.' });
        }
      });
    }
    resolve();
  })

  render() {
    return (
      <div className="createAccount">
        <div className='titleBlock'>
          <img src={gnome} alt='gnome' className='gnomeTitle'/>
          <p className='loginTitle'>Gardenshare</p>
          <img src={gnome} alt='gnome' className='gnomeTitle'/>
        </div>
        <div className="jumbotron createAccountScreen">
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
              <button type="submit" className="inactiveButton createActBut" onClick={this.createUser}>Create Account</button>
              <p className='errorMsg'>{this.state.error ? this.state.error : null}</p>
            </form>
          </div>
      </div>
    );
  }
}

export default createAccount;
