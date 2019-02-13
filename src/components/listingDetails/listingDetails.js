import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import OfferTrade from '../offerTrade/offerTrade';
import PlantPhotos from '../plantPhotos/plantPhotos';
import plantList from '../../data/plantList';
import './listingDetails.scss';

class listingDetails extends React.Component {
  state = {
    modal: false,
    currentPlant: false,
  }

  toggle = (event) => {
    event.preventDefault();
    const currentPlant = event.currentTarget.id;
    console.log(currentPlant);
    this.setState({
      modal: !this.state.modal,
      currentPlant,
    });
  }

  plantsBuilder = () => {
    const plantsRender = [];
    if (this.props.plants !== null) {
      this.props.plants.forEach((plantType) => {
        let img = '';
        plantList.forEach((plant) => {
          if (plantType.plant === plant.name) {
            // eslint-disable-next-line prefer-destructuring
            img = plant.img;
          }
        });
        plantsRender.push(<div key={plantType.id} className='listingDPlantDiv' id={plantType.id} onClick={this.toggle}>
          <p className='listingDPlantPar'><img alt='Img' className='plantIcon' src={img}/>{plantType.plant}</p>
          <p className='listingDQtyPar'>{plantType.surplus}</p>
          <p className='listingDQtyPar'>{plantType.dateHarvest}</p>
          <PlantPhotos key={plantType.id} modal={this.state.modal} toggle={this.toggle}
          user={plantType.userName} id={plantType.id} currentPlant={this.state.currentPlant}/>
        </div>);
      });
    }
    return plantsRender;
  }

  render() {
    const {
      picture, location, locationName, reliabilityRating, qualityRating, numRating, userName,
    } = this.props;
    return (
      <div className='listingDetails'>
        <Modal isOpen={this.props.modal} className='listingModal'>
          <ModalHeader className='modalH'>
            {userName}
            <button type='button' className='close closeThis' onClick={this.props.toggle}>x</button>
          </ModalHeader>
          <ModalBody className='modalB'>
          <div className='listingDProfile'>
          <img src={picture} alt='profilePic' className='listingDPic'/>
          <p className='listingDName'>{userName}</p>
        </div>
        <div className='listingDInfo'>
          <div className='listingDUnit'>
            <p className='listingDUnitPar'>Location: </p>
            <p className='listingDUnitPar'>{locationName} {location}</p>
          </div>
          <div className='listingDUnit'>
            <p className='listingDUnitPar'>Reliability Rating: </p>
            <p className='listingDUnitPar'>{reliabilityRating} on {numRating} Ratings</p>
          </div>
          <div className='listingDUnit'>
            <p className='listingDUnitPar'>Quality Rating: </p>
            <p className='listingDUnitPar'>{qualityRating} on {numRating} Ratings</p>
          </div>
        </div>
        <div>
          <div className='listingDPlantInfo'>
          <div className='listingPlantTitle'><p className='LDPar'>Plant</p></div>
          <div className='listingPlantTitle'><p className='LDPar'>Surplus</p></div>
          <div className='listingPlantTitle'><p className='LDPar'>Harvest Date</p></div>
          </div>
          {this.plantsBuilder()}
          <OfferTrade userName={userName} picture={picture} location={location}
          locationName={locationName} reliabilityRating={reliabilityRating}
          qualityRating={qualityRating} numRating={numRating} plants={this.props.plants}
          key={userName} toggleParent={this.props.toggle}/>
        </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default listingDetails;
