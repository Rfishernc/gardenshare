import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const addPhotoDatabaseRef = (fileName, userName, plantId) => new Promise((resolve, reject) => {
  const newRef = {
    fileName,
    userName,
    plantId,
  };
  axios.post(`${URL}/pictureRef.json`, newRef)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const uploadPhoto = (userName, plantId) => new Promise((resolve, reject) => {
  const newPicture = document.getElementById('photoInput').files[0];
  const storage = firebase.storage();
  const mainRef = storage.ref();
  const newPictureRef = mainRef.child(newPicture.name);
  newPictureRef.put(newPicture)
    .then(() => {
      addPhotoDatabaseRef(newPicture.name, userName, plantId)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

const getPhotoDatabaseRef = plantId => new Promise((resolve, reject) => {
  axios.get(`${URL}/pictureRef.json?orderBy="plantId"&equalTo="${plantId}"`)
    .then((data) => {
      const refObject = data.data;
      const refArray = [];
      if (refObject !== null) {
        Object.keys(refObject).forEach((key) => {
          refObject[key].id = key;
          refArray.push(refObject[key]);
        });
      }
      resolve(refArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getPhoto = ref => new Promise((resolve, reject) => {
  const storage = firebase.storage();
  const mainRef = storage.ref();
  mainRef.child(ref.fileName).getDownloadURL()
    .then((path) => {
      const refObject = {
        path,
        id: ref.id,
      };
      resolve(refObject);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllPhotosForPlant = plantId => new Promise((resolve, reject) => {
  const promiseArray = [];
  getPhotoDatabaseRef(plantId)
    .then((refArray) => {
      if (refArray.length > 0) {
        refArray.forEach((ref) => {
          promiseArray.push(getPhoto(ref));
        });
      }
      Promise.all(promiseArray)
        .then((photoArray) => {
          resolve(photoArray);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

const removePhotoRef = refId => new Promise((resolve, reject) => {
  axios.delete(`${URL}/pictureRef/${refId}.json`)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const getRefById = refId => new Promise((resolve, reject) => {
  axios.get(`${URL}/pictureRef/${refId}.json`)
    .then((data) => {
      const refObject = data.data;
      let refPath;
      if (refObject !== null) {
        refPath = refObject.fileName;
      }
      resolve(refPath);
    })
    .catch((err) => {
      reject(err);
    });
});

const removePhoto = refId => new Promise((resolve, reject) => {
  const storage = firebase.storage();
  const mainRef = storage.ref();
  getRefById(refId)
    .then((refPath) => {
      removePhotoRef(refId)
        .then(() => {
          mainRef.child(refPath).delete()
            .then(() => {
              resolve();
            });
        });
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  uploadPhoto,
  getPhoto,
  removePhotoRef,
  getAllPhotosForPlant,
  removePhoto,
};
