import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import apiKeys from './apiKeys';

const createUser = (email, password) => new Promise((resolve, reject) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const createUserObject = newUser => new Promise((resolve, reject) => {
  axios.post(`${apiKeys.firebaseKeys.databaseURL}/users.json`, newUser)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const createEmailObject = newUserEmail => new Promise((resolve, reject) => {
  axios.post(`${apiKeys.firebaseKeys.databaseURL}/emails.json`, newUserEmail)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const getNewUser = () => firebase.auth().currentUser;

export default {
  createUser,
  createUserObject,
  getNewUser,
  createEmailObject,
};
