import React from 'react';
import ListingDetails from '../listingDetails/listingDetails';
import './userListing.scss';

class userListing extends React.Component {
  state = {
    modal: false,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  plantsBuilder = () => {
    const plantsRender = [];
    if (this.props.plants !== null) {
      for (let i = 0; i < 2; i += 1) {
        plantsRender.push(<div className='listingPlantInfo'>
          <p className='listingPlantItem'>{this.props.plants[i].plant}</p>
          <p className='listingPlantItem'>{this.props.plants[i].surplus}</p>
          <p className='listingPlantItem'>{this.props.plants[i].dateHarvest}</p>
        </div>);
      }
    }
    return plantsRender;
  }

  render() {
    const {
      picture, location, locationName, reliabilityRating, qualityRating, numRating, userName,
    } = this.props;
    return (
      <div className="userListing" onClick={this.toggle}>
        <div>
          <img src={picture} alt='profilePic' class='listingPic'/>
          <p>{userName}</p>
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
            <p className='listingPlantItem'>Plant</p>
            <p className='listingPlantItem'>Surplus</p>
            <p className='listingPlantItem'>Harvest Date</p>
          </div>
          {this.plantsBuilder()}
        </div>
        <ListingDetails userName={userName} picture={picture}
        location={location} modal={this.state.modal}
        locationName={locationName} reliabilityRating={reliabilityRating} plants={this.props.plants}
        qualityRating={qualityRating} numRating={numRating} key={userName}/>
      </div>
    );
  }
}

export default userListing;
