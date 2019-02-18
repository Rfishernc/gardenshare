import React from 'react';
import './login.scss';
import loginData from '../../data/loginData';
import gnome from '../../images/misc-npc-garden-gnome.png';

class login extends React.Component {
  state = {
    error: false,
  }

  loginUser = (event) => {
    this.setState({ error: false });
    event.preventDefault();
    this.validate()
      .then(() => {
        if (this.state.error === false) {
          const username = document.getElementById('usernameInput').value;
          const pw = document.getElementById('pwInput').value;
          loginData.getEmailByUsername(username)
            .then((user) => {
              const { email } = user;
              loginData.loginUser(email, pw)
                .then((data) => {
                  this.props.history.push('/home');
                })
                .catch((error) => {
                  if (error.code === 'auth/wrong-password') {
                    this.setState({ error: 'Incorrect password entered' });
                  }
                });
            })
            .catch(() => {
              this.setState({ error: 'No matching username found' });
            });
        }
      });
  }

  clickedCreate = (event) => {
    event.preventDefault();
    this.props.history.push('/createAccount');
  }

  validate = () => new Promise((resolve) => {
    const username = document.getElementById('usernameInput').value;
    const pw = document.getElementById('pwInput').value;
    if (username === '') {
      this.setState({ error: 'No username entered' });
    } else if (pw === '') {
      this.setState({ error: 'No password entered' });
    }
    resolve();
  })

  render() {
    return (
      <div className="login">
        <div className='titleBlock'>
          <img src={gnome} alt='gnome' className='gnomeTitle'/>
          <p className='loginTitle'>Gardeners' Bazaar</p>
          <img src={gnome} alt='gnome' className='gnomeTitle'/>
        </div>
        <div className="jumbotron loginScreen">
          <h1 className="display-4">Login to your account</h1>
          <form>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input type="email" className="form-control" id="usernameInput" placeholder="Enter username"/>
            </div>
            <div className="form-group">
              <label htmlFor="pwInput">Password</label>
              <input type="password" className="form-control" id="pwInput" placeholder="Password"/>
            </div>
            <button type="submit" className="inactiveButton signInBut" onClick={this.loginUser}>Sign In</button>
          </form>
          <p className='errorMsg'>{this.state.error ? this.state.error : null}</p>
          <button type='button' className='createAccountLink' onClick={this.clickedCreate}>Create a new Account</button>
        </div>
      </div>
    );
  }
}

export default login;
