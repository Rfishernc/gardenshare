import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import firebase from 'firebase/app';
import './changePassword.scss';

class changePassword extends React.Component {
  state = {
    modal: false,
    updated: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  updatePassword = (event) => {
    const user = firebase.auth().currentUser;
    event.preventDefault();
    const oldPW = document.getElementById('currentPWInput').value;
    const newPW = document.getElementById('newPWInput').value;
    const newPW2 = document.getElementById('newPW2Input').value;
    if (newPW === newPW2) {
      const credential = firebase.auth.EmailAuthProvider.credential(this.props.email, oldPW);
      user.reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => {
          user.updatePassword(newPW)
            .then(() => {
              this.setState({ updated: true });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  modalBuilder = () => {
    if (this.state.updated) {
      return <div>
        <p>Password Successfully Updated</p>
        <button type='button' onClick={this.ok}>Ok</button>
      </div>;
    }
    return <div>
            <div>
              <p>Enter current password: </p>
              <input type='password' id='currentPWInput'/>
            </div>
            <div>
              <p>Enter new password: </p>
              <input type='password' id='newPWInput'/>
            </div>
            <div>
              <p>Re-enter new password: </p>
              <input type='password' id='newPW2Input'/>
            </div>
            <button type='button' onClick={this.updatePassword}>Update Password</button>
          </div>;
  }

  ok = (event) => {
    event.preventDefault();
    this.setState({ updated: false });
    this.toggle();
  }

  render() {
    return (
      <div>
         <Button color="success" onClick={this.toggle}>Change Password</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Update Password</ModalHeader>
          <ModalBody>
            {this.modalBuilder()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default changePassword;
