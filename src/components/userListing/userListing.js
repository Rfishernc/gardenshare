import React from 'react';
import './userListing.scss';

class userListing extends React.Component {
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
      </div>
    );
  }
}

export default userListing;
