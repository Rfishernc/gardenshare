import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import './giveAwayPlants.scss';

class giveAwayPlants extends React.Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  plantsBuilder = () => {
    const plantsRender = [];
    if (this.props.plants !== []) {
      this.props.plants.forEach((plantOb) => {
        plantsRender.push();
      });
    }
    return plantsRender;
  }

  render() {
    return (
      <div className='givAwayPlants'>
        <Button className="giveAwayPlantsButton" color="success" onClick={this.toggle}>Select Plants</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Select Plants for Giveaway</ModalHeader>
          <ModalBody>
            {this.plantsBuilder()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default giveAwayPlants;
