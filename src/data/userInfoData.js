import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const getUser = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((data) => {
      let userData;
      Object.keys(data.data).forEach((key) => {
        userData = data.data[key];
        userData.dbKey = key;
      });
      resolve(userData);
    })
    .catch((err) => {
      reject(err);
    });
});

const getEmailByUsername = userName => new Promise((resolve, reject) => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/emails.json?orderBy="userName"&equalTo="${userName}"`)
    .then((data) => {
      let userData;
      Object.keys(data.data).forEach((key) => {
        userData = data.data[key];
      });
      resolve(userData);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateUserInfo = (dbKey, newInfo) => new Promise((resolve, reject) => {
  axios.patch(`${URL}/users/${dbKey}.json`, newInfo)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const addPictureDatabaseRef = (fileName, userName) => new Promise((resolve, reject) => {
  const newRef = {
    fileName,
    userName,
  };
  axios.post(`${URL}/pictureRef.json`, newRef)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const addPicture = userName => new Promise((resolve, reject) => {
  const newPicture = document.getElementById('pictureInput').files[0];
  const storage = firebase.storage();
  const mainRef = storage.ref();
  const newPictureRef = mainRef.child(newPicture.name);
  newPictureRef.put(newPicture)
    .then(() => {
      addPictureDatabaseRef(newPicture.name, userName)
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

const getPictureDatabaseRef = userName => new Promise((resolve, reject) => {
  axios.get(`${URL}/pictureRef.json?orderBy="userName"&equalTo="${userName}"`)
    .then((data) => {
      let ref;
      Object.keys(data.data).forEach((key) => {
        ref = data.data[key];
        ref.dbKey = key;
      });
      resolve(ref);
    })
    .catch((err) => {
      reject(err);
    });
});

const getPicture = userName => new Promise((resolve, reject) => {
  const storage = firebase.storage();
  const mainRef = storage.ref();
  getPictureDatabaseRef(userName)
    .then((ref) => {
      mainRef.child(ref.fileName).getDownloadURL()
        .then((path) => {
          resolve(path);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

const removePictureRef = userName => new Promise((resolve, reject) => {
  getPictureDatabaseRef(userName)
    .then((ref) => {
      axios.delete(`${URL}/pictureRef/${ref.dbKey}.json?`)
        .then(() => {
          resolve();
        });
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getUser,
  getEmailByUsername,
  updateUserInfo,
  addPictureDatabaseRef,
  addPicture,
  getPicture,
  removePictureRef,
};
