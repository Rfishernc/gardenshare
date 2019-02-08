import React from 'react';
import './giveAwayListing.scss';

class giveAwayListing extends React.Component {
  plantsBuilder = () => {
    const plantsRender = [];
    Object.keys(this.props.plants).forEach((plantKey) => {
      plantsRender.push(<div key={plantKey}>
        <p>{plantKey}</p>
        <p>{this.props.plants[plantKey]}</p>
      </div>);
    });
    return plantsRender;
  }

  render() {
    const {
      picture,
      userName,
      locationName,
      location,
      reliabilityRating,
      qualityRating,
      numRating,
      startDate,
      endDate,
      startTime,
      endTime,
      address,
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
        <div>
          <p>Giveaway Details</p>
          <div>
            <p>{address}</p>
            <p>{startDate} through {endDate}</p>
            <p>From {startTime} to {endTime}</p>
          </div>
        </div>
        <div className='listingPlantDiv'>
          <div className='listingPlantTitle'>
            <p className='listingPlantItem itemTitle'>Plant</p>
            <p className='listingPlantItem itemTitle'>Quantity</p>
          </div>
          {this.plantsBuilder()}
        </div>
      </div>
    );
  }
}

export default giveAwayListing;
