import React from 'react';
import userPlantsData from '../../data/userPlantsData';
import './userPlants.scss';

class userPlants extends React.Component {
  removePlant = (event) => {
    event.preventDefault();
    userPlantsData.deletePlant(this.props.id)
      .then(() => {
        this.props.refreshPlants();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      qty, surplus, datePlanted, dateHarvest, plant,
    } = this.props;

    return (
      <div className="userPlants col">
        <div>
          <ul className="plantInfo">
            <li className="list-group-item plantLi">{plant}</li>
            <li className="list-group-item plantLi">{qty}</li>
            <li className="list-group-item plantLi">{surplus}</li>
            <li className="list-group-item plantLi">{datePlanted}</li>
            <li className="list-group-item plantLi">{dateHarvest}</li>
            <li className="list-group-item plantLi butts"><button type='button' className='removePlant' onClick={this.removePlant}>Remove</button></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default userPlants;
