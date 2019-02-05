import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import OfferTrade from '../offerTrade/offerTrade';
import './listingDetails.scss';

class listingDetails extends React.Component {
  plantsBuilder = () => {
    const plantsRender = [];
    if (this.props.plants !== null) {
      this.props.plants.forEach((plantType) => {
        plantsRender.push(<div key={plantType.plant} className='listingDPlantDiv'>
          <p className='listingDPlantPar'>{plantType.plant}</p>
          <p className='listingDPlantPar'>{plantType.surplus}</p>
          <p className='listingDPlantPar'>{plantType.dateHarvest}</p>
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
          <ModalHeader toggle={this.toggle}>
            {userName}
            <button type='button' className='close closeThis' onClick={this.props.toggle}>x</button>
          </ModalHeader>
          <ModalBody>
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
          <div className='listingPlantInfo'>
            <p className='listingPlantTitle'>Plant</p>
            <p className='listingPlantTitle'>Surplus</p>
            <p className='listingPlantTitle'>Harvest Date</p>
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
