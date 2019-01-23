import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import './tradeDetails.scss';

class tradeDetails extends React.Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div className="tradeDetails">
        <Button color="success" onClick={this.toggle}>Trade Details</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Trade Details</ModalHeader>
          <ModalBody>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default tradeDetails;
