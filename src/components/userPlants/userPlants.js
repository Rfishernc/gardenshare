import React from 'react';
import userPlantsData from '../../data/userPlantsData';
import plantList from '../../data/plantList';
import './userPlants.scss';

class userPlants extends React.Component {
  state = {
    img: '',
  }

  componentDidMount() {
    plantList.forEach((plant) => {
      if (this.props.plant === plant.name) {
        this.setState({ img: plant.img });
      }
    });
  }

  removePlant = (event) => {
    event.preventDefault();
    if (this.props.removing) {
      userPlantsData.deletePlant(this.props.id)
        .then(() => {
          this.props.refreshPlants();
          this.props.endRemoverMode();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  uploadPhoto = (event) => {
    event.preventDefault();
    if (this.props.uploading) {
      
    }
  }

  render() {
    const {
      qty, surplus, datePlanted, dateHarvest, plant,
    } = this.props;

    return (
      <div className="userPlants col" onClick={this.uploadPhoto}>
        <div>
          <ul className={this.props.removing ? 'plantInfo deleteMe' : 'plantInfo'} onClick={this.removePlant}>
            <li className={this.props.removing ? 'list-group-item plantLi deleteMe' : 'list-group-item plantLi'}>
              <img alt='Img' src={this.state.img} className='plantIcon'/>
              {plant}</li>
            <li className={this.props.removing ? 'list-group-item plantLi deleteMeLi' : 'list-group-item plantLi'}>{qty}</li>
            <li className={this.props.removing ? 'list-group-item plantLi deleteMeLi' : 'list-group-item plantLi'}>{surplus}</li>
            <li className={this.props.removing ? 'list-group-item plantLi deleteMeLi' : 'list-group-item plantLi'}>{datePlanted}</li>
            <li className={this.props.removing ? 'list-group-item plantLi deleteMeLi' : 'list-group-item plantLi'}>{dateHarvest}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default userPlants;
