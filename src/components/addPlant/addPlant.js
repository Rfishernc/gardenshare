import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import PlantSelector from '../plantSelector/plantSelector';
import addPlantData from '../../data/addPlantData';
import './addPlant.scss';

class addPlant extends React.Component {
  state = {
    modal: false,
    plantText: '',
    plantSelection: '',
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  addNewPlant = (event) => {
    event.preventDefault();
    const plant = document.getElementById('plantInput').value;
    const qty = document.getElementById('qtyInput').value;
    const surplus = document.getElementById('surplusInput').value;
    const datePlanted = document.getElementById('datePlantedInput').value;
    const dateHarvest = document.getElementById('dateHarvestInput').value;
    const newPlant = {
      user: this.props.user,
      plant,
      qty,
      surplus,
      datePlanted,
      dateHarvest,
    };
    addPlantData.postNewPlant(newPlant)
      .then(() => {
        this.props.refreshPlants();
        this.toggle();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  plantText = (event) => {
    event.preventDefault();
    this.setState({ plantText: event.target.value });
  }

  selectorBuilder = () => {
    if (this.state.plantText !== '') {
      return <PlantSelector plantText={this.state.plantText} selection={this.selection} classMaker='plantSelectorMenu'/>;
    }
    return '';
  }

  selection = (plant) => {
    this.setState({ plantSelection: plant, plantText: plant }, () => {
      document.getElementById('plantInput').value = this.state.plantSelection;
    });
  }

  render() {
    return (
      <div className="addPlant">
        <Button className="plantButton buttonsGeneric" onClick={this.toggle}>Add</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} className='modalH'>Add A New Plant To Your Profile</ModalHeader>
          <ModalBody className='modalB'>
          <form>
            <div className="form-group">
              <label htmlFor="plantInput">Plant:</label>
              <input type="email" className="form-control" id="plantInput" placeholder="Enter plant name" onChange={this.plantText}/>
              {this.selectorBuilder()}
            </div>
            <div className="form-group">
              <label htmlFor="qtyInput">Quantity:</label>
              <input type="email" className="form-control" id="qtyInput" placeholder="Quantity"/>
            </div>
            <div className="form-group">
              <label htmlFor="surplusInput">Surplus:</label>
              <input type="email" className="form-control" id="surplusInput" placeholder="Surplus"/>
            </div>
            <div className="form-group">
              <label htmlFor="datePlantedInput">Date Planted:</label>
              <input type="date" className="form-control" id="datePlantedInput" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label htmlFor="dateHarvestInput">Estimated Harvest Date:</label>
              <input type="date" className="form-control" id="dateHarvestInput" placeholder="Password"/>
            </div>
            <button type="submit" className="buttonsGeneric" onClick={this.addNewPlant}>Add</button>
          </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default addPlant;
