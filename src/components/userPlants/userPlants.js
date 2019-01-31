import React from 'react';
import './userPlants.scss';

class userPlants extends React.Component {
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
          </ul>
        </div>
      </div>
    );
  }
}

export default userPlants;
