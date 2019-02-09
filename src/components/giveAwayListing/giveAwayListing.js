import React from 'react';
import './giveAwayListing.scss';

class giveAwayListing extends React.Component {
  plantsBuilder = () => {
    const plantsRender = [];
    Object.keys(this.props.plants).forEach((plantKey) => {
      plantsRender.push(<div key={plantKey} className='GALPlantDiv col-3'>
        <p className='GALPlantPar'>{plantKey}</p>
        <p className='GALPlantPar'>{this.props.plants[plantKey]}</p>
      </div>);
    });
    return plantsRender;
  }

  ratingStarBuilder = (rating) => {
    const renderArray = [];
    let starCounter = 0;
    for (let i = 1; i <= rating / 2; i += 1) {
      renderArray.push(<i className="fas fa-star" id={i}></i>);
      starCounter += 1;
    }
    if ((rating / 2) > Math.floor(rating / 2)) {
      starCounter += 1;
      renderArray.push(<i className="fas fa-star-half-alt" id={starCounter}></i>);
    }
    for (let i = 1; i <= (5 - starCounter); i += 1) {
      renderArray.push(<i className="far fa-star" id={i + starCounter}></i>);
    }
    return renderArray;
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
        <div className='row'>
          <div className='col-2'>
            <img src={picture} alt='profilePic' className='listingPic'/>
            <p className='GAListingName'>{userName}</p>
          </div>
          <div className='col-8'>
            <p className='GAListingTitle'>User Information</p>
            <div className='GAListingUnit'>
              <p className='GAListingItem'>Location: </p>
              <p className='GAListingItem'>{locationName}     {location}</p>
            </div>
            <div className='GAListingUnit'>
              <p className='GAListingItem'>Reliability Rating: </p>
              <p className='GAListingItem'>{this.ratingStarBuilder(reliabilityRating)} on {numRating} Ratings</p>
            </div>
            <div className='GAListingUnit'>
              <p className='GAListingItem'>Quality Rating: </p>
              <p className='GAListingItem'>{this.ratingStarBuilder(qualityRating)} on {numRating} Ratings</p>
            </div>
            <div>
              <p className='GAListingTitle'>Giveaway Details</p>
              <div className='GALInfoDiv'>
                <p className='GALInfoPar'>Location: {address}</p>
                <p className='GALInfoPar'>{startDate} through {endDate}</p>
                <p className='GALInfoPar'>From {startTime} to {endTime}</p>
              </div>
            </div>
            <div className='GAListingPlantDiv row'>
              {this.plantsBuilder()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default giveAwayListing;
