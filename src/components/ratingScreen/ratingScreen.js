import React from 'react';
import RatingSelector from '../ratingSelector/ratingSelector';
import './ratingScreen.scss';

class ratingScreen extends React.Component {
  state = {
    quality: 1,
    reliability: 1,
  }

  selection = (type, rating) => {
    this.setState({ [type]: rating });
  }

  submitRating = (event) => {
    event.preventDefault();
    this.props.updateRating(this.state.quality, this.state.reliability);
  }

  render() {
    return (
      <div className='ratingScreen'>
        <p>Rate This User</p>
        <div>
          <p>Quality</p>
          <RatingSelector key='quality' rating='quality' selection={this.selection}/>
        </div>
        <div>
          <p>Reliability</p>
          <RatingSelector key='reliability' rating='reliability' selection={this.selection}/>
        </div>
        <button type='button' onClick={this.submitRating}>Submit</button>
      </div>
    );
  }
}

export default ratingScreen;
