import React from 'react';
import ListingDetails from '../listingDetails/listingDetails';
import './userListing.scss';

class userListing extends React.Component {
  plantsBuilder = () => {
    const plantsRender = [];
    if (this.props.plants !== null) {
      for (let i = 0; i < 1; i += 1) {
        plantsRender.push(<div>
          <p>{this.props.plants[i].plant}</p>
          <p>{this.props.plants[i].surplus}</p>
          <p>{this.props.plants[i].dateHarvest}</p>
        </div>);
      }
    }
    return plantsRender;
  }

  viewDetails = () => {

  }

  render() {
    const {
      picture, location, locationName, reliabilityRating, qualityRating, numRating, userName,
    } = this.props;
    return (
      <div className="userListing" onClick={this.viewDetails}>
        <div>
          <img src={picture} alt='profilePic'/>
          <p>{userName}</p>
        </div>
        <div>
          <div>
            <p>Location: </p>
            <p>{locationName} {location}</p>
          </div>
          <div>
            <p>Reliability Rating: </p>
            <p>{reliabilityRating} on {numRating} Ratings</p>
          </div>
          <div>
            <p>Quality Rating: </p>
            <p>{qualityRating} on {numRating} Ratings</p>
          </div>
        </div>
        <div>
          <p>Plant</p>
          <p>Surplus</p>
          <p>Harvest Date</p>
          {this.plantsBuilder()}
        </div>
        <ListingDetails userName={userName} picture={picture} location={location}
        locationName={locationName} reliabilityRating={reliabilityRating} plants={this.props.plants}
        qualityRating={qualityRating} numRating={numRating} key={userName}/>
      </div>
    );
  }
}

export default userListing;
