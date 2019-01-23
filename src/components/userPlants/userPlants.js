import React from 'react';
import './userPlants.scss';

class userPlants extends React.Component {
  render() {
    const {
      num, surplus, datePlanted, dateHarvest, plant,
    } = this.props;

    return (
      <div className="userPlants">
        <div className="card" style={{ width: '20rem' } }>
          <div className="card-header">
            {plant}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Quantity: {num}</li>
            <li className="list-group-item">Surplus: {surplus}</li>
            <li className="list-group-item">Date Planted: {datePlanted}</li>
            <li className="list-group-item">Estimated Harvest Date: {dateHarvest}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default userPlants;
