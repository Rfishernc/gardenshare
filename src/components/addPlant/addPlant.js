import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import addPlantData from '../../data/addPlantData';
import './addPlant.scss';

class addPlant extends React.Component {
  state = {
    modal: false,
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

  render() {
    return (
      <div className="addPlant">
        <Button color="success" onClick={this.toggle}>Add a new plant</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add A New Plant To Your Profile</ModalHeader>
          <ModalBody>
          <form>
            <div className="form-group">
              <label htmlFor="plantInput">Plant:</label>
              <input type="email" className="form-control" id="plantInput" placeholder="Enter plant name"/>
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
            <button type="submit" className="btn btn-primary" onClick={this.addNewPlant}>Add</button>
          </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default addPlant;
