
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import apiKeys from './apiKeys';

const loginUser = (email, password) => new Promise((resolve, reject) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const logoutUser = () => {
  firebase.auth().signOut();
};

const getCurrentUsername = () => firebase.auth().currentUser.username;

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

export default {
  loginUser,
  logoutUser,
  getCurrentUsername,
  getEmailByUsername,
};
