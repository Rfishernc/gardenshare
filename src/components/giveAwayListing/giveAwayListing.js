import React from 'react';
import './giveAwayListing.scss';

class giveAwayListing extends React.Component {
  render() {
    const {
      picture, userName, locationName, location, reliabilityRating, qualityRating, numRating,
    } = this.props;

    return (
      <div className='giveAwayListing'>
        <div>
          <img src={picture} alt='profilePic' className='listingPic'/>
          <p className='listingName'>{userName}</p>
        </div>
        <div>
          <div className='listingUnit'>
            <p className='listingItem'>Location: </p>
            <p className='listingItem'>{locationName}     {location}</p>
          </div>
          <div className='listingUnit'>
            <p className='listingItem'>Reliability Rating: </p>
            <p className='listingItem'>{reliabilityRating} on {numRating} Ratings</p>
          </div>
          <div className='listingUnit'>
            <p className='listingItem'>Quality Rating: </p>
            <p className='listingItem'>{qualityRating} on {numRating} Ratings</p>
          </div>
        </div>
        <div className='listingPlantDiv'>
          <div className='listingPlantTitle'>
            <p className='listingPlantItem itemTitle'>Plant</p>
            <p className='listingPlantItem itemTitle'>Surplus</p>
            <p className='listingPlantItem itemTitle'>Harvest Date</p>
          </div>
        </div>
      </div>
    );
  }
}

export default giveAwayListing;
