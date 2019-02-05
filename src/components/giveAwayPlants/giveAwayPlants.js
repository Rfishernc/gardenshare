import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import './giveAwayPlants.scss';

class giveAwayPlants extends React.Component {
  state = {
    modal: false,
    plantQty: [],
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    const plantQty = [];
    if (this.props.plants !== []) {
      this.props.plants.forEach((plantOb) => {
        const plantInfo = {
          plant: plantOb.plant,
          qty: 0,
        };
        plantQty.push(plantInfo);
      });
    }
    this.setState({ plantQty });
  }

  plantsBuilder = () => {
    const plantsRender = [];
    if (this.props.plants !== []) {
      this.props.plants.forEach((plantOb) => {
        plantsRender.push(<div key={plantOb.plant} className='giveAwayPlantDiv'>
          <div className='plantChooser'>
            <input type='checkBox' id={`${plantOb.plant}Check`} onClick={this.plantChecked}/>
            <p>{plantOb.plant}</p>
          </div>
          <input type='number' max={plantOb.surplus} defaultValue='0'
          id={`${plantOb.plant}Input`} className='plantQtyInput hideMe' onChange={this.updateQty}/>
        </div>);
      });
    }
    return plantsRender;
  }

  plantChecked = (event) => {
    const plantInput = event.target.id.replace('Check', 'Input');
    if (document.getElementById(plantInput).className.includes(' hideMe')) {
      document.getElementById(plantInput).className = document.getElementById(plantInput).className.replace(' hideMe', '');
    } else {
      document.getElementById(plantInput).className += ' hideMe';
      document.getElementById(plantInput).value = 0;
    }
  }

  updateQty = (event) => {
    event.preventDefault();
    const plantName = event.target.id.replace('Input', '');
    const updateIndex = this.state.plantQty.findIndex(x => x.plant === plantName);
    // eslint-disable-next-line prefer-destructuring
    const plantQty = this.state.plantQty;
    plantQty[updateIndex].qty = event.target.value;
    this.setState({ plantQty });
  }

  savePlants = (event) => {
    event.preventDefault();
    const plantArray = this.state.plantQty.filter(plant => plant.qty > 0);
    this.props.selectPlant(plantArray);
    this.toggle();
  }

  render() {
    return (
      <div className='givAwayPlants'>
        <Button className="giveAwayPlantsButton" color="success" onClick={this.toggle}>Select Plants</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Select Plants for Giveaway</ModalHeader>
          <ModalBody>
            {this.plantsBuilder()}
            <button type='button' onClick={this.savePlants}>Save</button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default giveAwayPlants;
