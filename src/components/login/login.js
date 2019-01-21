import React from 'react';
import './login.scss';
import loginData from '../../data/loginData';

class login extends React.Component {
  loginUser = (event) => {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value;
    const pw = document.getElementById('pwInput').value;
    loginData.loginUser(username, pw)
      .then((data) => {
        this.props.history.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clickedCreate = (event) => {
    event.preventDefault();
    this.props.history.push('/createAccount');
  }

  render() {
    return (
      <div className="login">
        <div className="jumbotron">
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
            <button type="submit" className="btn btn-primary" onClick={this.loginUser}>Sign In</button>
          </form>
          <button type='button' className='createAccountLink' onClick={this.clickedCreate}>Create a new Account</button>
        </div>
      </div>
    );
  }
}

export default login;
