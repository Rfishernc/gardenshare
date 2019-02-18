import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import plantPhotosData from '../../data/plantPhotosData';
import './plantPhotos.scss';

class plantPhotos extends React.Component {
  state = {
    photoArray: [],
  }

  componentDidMount() {
    this.refreshPhotos();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  uploadPhoto = (event) => {
    event.preventDefault();
    if (document.getElementById('photoInput').value !== '') {
      plantPhotosData.uploadPhoto(this.props.user, this.props.id)
        .then(() => {
          this.refreshPhotos();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  photoBuilder = () => {
    const photoRender = [];
    if (this.state.photoArray.length > 0) {
      this.state.photoArray.forEach((photo) => {
        photoRender.push(<div key={photo.id} className='photoDiv'>
          <img alt='plantPhoto' src={photo.path} className='plantPhoto'/>
          <button type='button' id={photo.id} className='xButton' onClick={this.removePhoto}>x</button>
        </div>);
      });
    }
    return photoRender;
  }

  removePhoto = (event) => {
    event.preventDefault();
    const refId = event.target.id;
    plantPhotosData.removePhoto(refId)
      .then(() => {
        this.refreshPhotos();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshPhotos = () => {
    plantPhotosData.getAllPhotosForPlant(this.props.id)
      .then((photoArray) => {
        this.setState({ photoArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  shouldIBeOpen = () => {
    if (this.props.currentPlant === this.props.id) {
      return this.props.modal;
    }
    return false;
  }

  buttonBuilder = () => {
    if (this.props.canAdd) {
      return <div>
      <button type='button' onClick={this.uploadPhoto}>Upload Photo</button>
      <input type='file' id='photoInput'/>
    </div>;
    }
    return null;
  }

  render() {
    return (
      <div className='plantPhotos'>
        <Modal isOpen={this.shouldIBeOpen()} toggle={this.toggle} className='photoModal'>
          <ModalHeader className='modalH'>Photos
            <button type='button' className='close closeThis' onClick={this.props.toggle}>x</button>
          </ModalHeader>
          <ModalBody className='modalB'>
            {this.buttonBuilder()}
            <div className='photoContainer'>
              {this.photoBuilder()}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default plantPhotos;
