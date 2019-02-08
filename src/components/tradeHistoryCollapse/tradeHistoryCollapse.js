import React from 'react';
import {
  Collapse, Button, CardBody, Card,
} from 'reactstrap';
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
      plantsRender.push(<div key={plant}>
        <p>{plant}</p>
        <p>{samePlants()[plant]}</p>
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
      plantsRender.push(<div key={plant}>
        <p>{plant}</p>
        <p>{otherPlants()[plant]}</p>
      </div>);
    });
    return plantsRender;
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
        <Button color="primary" onClick={this.toggle}>Expand</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <div>
                <p>{otherUser()}'s Plants</p>
                {this.otherPlantsBuilder()}
              </div>
              <div>
                <p>My Plants</p>
                {this.samePlantsBuilder()}
              </div>
              <p>Offer Sent on {dateSent}</p>
              <div>
                <p>{otherUser()}'s Ratings</p>
                <p>Quality: {otherQuality()}</p>
                <p>Reliability: {otherReliability()}</p>
              </div>
              <div>
                <p>My Ratings</p>
                <p>Quality: {sameQuality()}</p>
                <p>Reliability: {sameReliability()}</p>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default tradeHistoryCollapse;
