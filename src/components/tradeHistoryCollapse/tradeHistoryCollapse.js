import React from 'react';
import {
  Collapse, CardBody, Card,
} from 'reactstrap';
import plantList from '../../data/plantList';
import './tradeHistoryCollapse.scss';

class tradeHistoryCollapse extends React.Component {
  state = {
    collapse: false,
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  samePlantsBuilder = () => {
    const plantsRender = [];
    const samePlants = () => {
      if (this.props.user === this.props.user2) {
        return this.props.plants2;
      }
      return this.props.plants1;
    };
    Object.keys(samePlants()).forEach((plant) => {
      let img = '';
      plantList.forEach((plantType) => {
        if (plant === plantType.name) {
          // eslint-disable-next-line prefer-destructuring
          img = plantType.img;
        }
      });
      plantsRender.push(<div key={plant}>
        <p className='THInfo'><img alt='Img' className='plantIcon' src={img}/>{plant}</p>
        <p className='THInfo'>{samePlants()[plant]}</p>
      </div>);
    });
    return plantsRender;
  }

  otherPlantsBuilder = () => {
    const plantsRender = [];
    const otherPlants = () => {
      if (this.props.user === this.props.user1) {
        return this.props.plants2;
      }
      return this.props.plants1;
    };
    Object.keys(otherPlants()).forEach((plant) => {
      let img = '';
      plantList.forEach((plantType) => {
        if (plant === plantType.name) {
          // eslint-disable-next-line prefer-destructuring
          img = plantType.img;
        }
      });
      plantsRender.push(<div key={plant}>
        <p className='THInfo'><img alt='Img' className='plantIcon' src={img}/>{plant}</p>
        <p className='THInfo'>{otherPlants()[plant]}</p>
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

  shouldIBeOpen = () => {
    if (this.props.currentHistory === this.props.id) {
      return this.props.collapse;
    }
    return false;
  }

  render() {
    const {
      user,
      user1,
      user2,
      quality1,
      quality2,
      reliability1,
      reliability2,
      dateSent,
    } = this.props;

    const otherUser = () => {
      if (user === user1) {
        return user2;
      }
      return user1;
    };

    const otherQuality = () => {
      if (user === user1) {
        return quality2;
      }
      return quality1;
    };

    const otherReliability = () => {
      if (user === user1) {
        return reliability2;
      }
      return reliability1;
    };

    const sameQuality = () => {
      if (user === user2) {
        return quality2;
      }
      return quality1;
    };

    const sameReliability = () => {
      if (user === user2) {
        return reliability2;
      }
      return reliability1;
    };

    return (
      <div className='tradeHistoryCollapse'>
        <Collapse isOpen={this.shouldIBeOpen()}>
          <Card className='THDetails'>
            <CardBody>
              <p className='THInfoHeader'>Offer Sent on {dateSent}</p>
              <div>
                <p className='THInfoHeader'>{otherUser()}'s Plants</p>
                <div className='THInfoDiv THPlantDiv'>
                  {this.otherPlantsBuilder()}
                </div>
              </div>
              <div>
                <p className='THInfoHeader'>My Plants</p>
                <div className='THInfoDiv THPlantDiv'>
                  {this.samePlantsBuilder()}
                </div>
              </div>
              <div>
                <p className='THInfoHeader'>{otherUser()}'s Ratings</p>
                <div className='THInfoDiv'>
                  <p className='THInfo quality'>Quality: {this.ratingStarBuilder(otherQuality())}</p>
                  <p className='THInfo reliability'>Reliability: {this.ratingStarBuilder(otherReliability())}</p>
                </div>
              </div>
              <div>
                <p className='THInfoHeader'>My Ratings</p>
                <div className='THInfoDiv'>
                  <p className='THInfo quality'>Quality: {this.ratingStarBuilder(sameQuality())}</p>
                  <p className='THInfo reliability'>Reliability: {this.ratingStarBuilder(sameReliability())}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default tradeHistoryCollapse;
