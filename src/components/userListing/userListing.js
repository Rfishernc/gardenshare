import React from 'react';
import './userListing.scss';

class userListing extends React.Component {
  plantsBuilder = () => {
    const plantsRender = [];
    if (this.props.plants !== null) {
      this.props.plants.forEach((plantType) => {
        plantsRender.push(<div>
          <p>{plantType.plant}</p>
          <p>{plantType.surplus}</p>
          <p>{plantType.dateHarvest}</p>
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
      <div className="userListing">
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
      </div>
    );
  }
}

export default userListing;
