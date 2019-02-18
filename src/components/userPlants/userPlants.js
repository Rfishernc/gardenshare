import React from 'react';
import userPlantsData from '../../data/userPlantsData';
import plantList from '../../data/plantList';
import PlantPhotos from '../plantPhotos/plantPhotos';
import './userPlants.scss';

class userPlants extends React.Component {
  state = {
    img: '',
    modal: false,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
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

  mousedIn =(event) => {
    const tar = event.currentTarget;
    if (tar.className.includes('hovering') === false) {
      tar.className += ' hovering';
    }
  }

  mousedOut = (event) => {
    const tar = event.currentTarget;
    if (tar.className.includes('hovering')) {
      tar.className = tar.className.replace(' hovering', '');
    }
  }

  render() {
    const {
      qty, surplus, datePlanted, dateHarvest, plant,
    } = this.props;

    return (
      <div className="userPlants col" onClick={this.toggle} onMouseEnter={this.mousedIn} onMouseLeave={this.mousedOut}>
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
        <PlantPhotos modal={this.state.modal} toggle={this.toggle} canAdd={true}
        user={this.props.user} id={this.props.id} currentPlant={this.props.id}/>
      </div>
    );
  }
}

export default userPlants;
