import React from 'react';
import createAccountData from '../../data/createAccountData';
import './createAccount.scss';

class createAccount extends React.Component {
  createUser = (event) => {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value;
    const pw = document.getElementById('pwInput').value;
    const email = document.getElementById('emailInput').value;
    createAccountData.createUser(email, pw)
      .then((data) => {
        this.props.history.push('/home');
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
