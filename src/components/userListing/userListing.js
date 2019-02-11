import React from 'react';
import ListingDetails from '../listingDetails/listingDetails';
import plantList from '../../data/plantList';
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
        let img = '';
        plantList.forEach((plant) => {
          if (this.props.plants[i].plant === plant.name) {
            // eslint-disable-next-line prefer-destructuring
            img = plant.img;
          }
        });
        plantsRender.push(<div key={this.props.plants[i].plant} className='listingPlantInfo'>
          <p className='listingPlantItem'><img alt='Img' className='plantIcon' src={img}/>{this.props.plants[i].plant}</p>
          <p className='listingPlantItem'>{this.props.plants[i].surplus}</p>
          <p className='listingPlantItem'>{this.props.plants[i].dateHarvest}</p>
        </div>);
      }
    }
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
      picture, location, locationName, reliabilityRating, qualityRating, numRating, userName,
    } = this.props;
    return (
      <div className={this.props.oddEven === 'odd' ? 'listingOdd' : 'listingEven'} onClick={this.toggle}>
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
            <p className='listingItem'>{this.ratingStarBuilder(reliabilityRating)} on {numRating} Ratings</p>
          </div>
          <div className='listingUnit'>
            <p className='listingItem'>Quality Rating: </p>
            <p className='listingItem'>{this.ratingStarBuilder(qualityRating)} on {numRating} Ratings</p>
          </div>
        </div>
        <div className='listingPlantDiv'>
          <div className='listingPlantTitle'>
            <p className='listingPlantItem itemTitle'>Plant</p>
            <p className='listingPlantItem itemTitle'>Surplus</p>
            <p className='listingPlantItem itemTitle'>Harvest Date</p>
          </div>
          {this.plantsBuilder()}
        </div>
        <ListingDetails userName={userName} picture={picture}
        location={location} modal={this.state.modal} toggle={this.toggle}
        locationName={locationName} reliabilityRating={reliabilityRating} plants={this.props.plants}
        qualityRating={qualityRating} numRating={numRating} key={userName}/>
      </div>
    );
  }
}

export default userListing;
