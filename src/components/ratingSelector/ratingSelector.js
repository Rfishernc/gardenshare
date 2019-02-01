import React from 'react';
import './ratingSelector.scss';

class ratingSelector extends React.Component {
  state = {
    selection: 1,
  }

  ratingStarBuilder = () => {
    const renderArray = [];
    let starCounter = 0;
    for (let i = 1; i <= this.state.selection / 2; i += 1) {
      renderArray.push(<i class="fas fa-star fa-2x" id={i} onClick={this.starClicked}></i>);
      starCounter += 1;
    }
    if ((this.state.selection / 2) > Math.floor(this.state.selection / 2)) {
      starCounter += 1;
      renderArray.push(<i class="fas fa-star-half-alt fa-2x" id={starCounter} onClick={this.starClicked}></i>);
    }
    for (let i = 1; i <= (5 - starCounter); i += 1) {
      renderArray.push(<i class="far fa-star fa-2x" id={i + starCounter} onClick={this.starClicked}></i>);
    }
    return renderArray;
  }

  starClicked = (event) => {
    event.preventDefault();
    const baseLeft = event.target.parentElement.parentElement.parentElement
      .parentElement.parentElement.parentElement.parentElement.offsetLeft;
    const starLeft = baseLeft + event.target.offsetLeft;
    const starWidth = event.target.offsetWidth;
    const starCenter = starLeft + (starWidth / 2);
    const clickX = event.pageX;
    if (clickX >= starCenter) {
      this.setState({ selection: parseInt(event.target.id, 10) * 2 }, () => {
        this.props.selection(this.props.rating, this.state.selection);
      });
    } else {
      this.setState({ selection: (parseInt(event.target.id, 10) * 2) - 1 }, () => {
        this.props.selection(this.props.rating, this.state.selection);
      });
    }
  }

  render() {
    return (
      <div className='ratingSelector'>
        {this.ratingStarBuilder()}
      </div>
    );
  }
}

export default ratingSelector;
