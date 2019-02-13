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
        photoRender.push(<img alt='plantPhoto' src={photo} key={photo} className='plantPhoto'/>);
      });
    }
    return photoRender;
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

  render() {
    return (
      <div className='plantPhotos'>
        <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className='modalH'>Photos
            <button type='button' className='close closeThis' onClick={this.props.toggle}>x</button>
          </ModalHeader>
          <ModalBody className='modalB'>
            <button type='button' onClick={this.uploadPhoto}>Upload Photo</button>
            <input type='file' id='photoInput'/>
            {this.photoBuilder()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default plantPhotos;
