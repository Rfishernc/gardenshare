import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const closeTrade = (closedTrade, dbKey) => new Promise((resolve, reject) => {
  axios.put(`${URL}/tradeRequests/${dbKey}.json`, closedTrade)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserByUserName = userName => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="userName"&equalTo="${userName}"`)
    .then((data) => {
      let userData;
      Object.keys(data.data).forEach((key) => {
        userData = data.data[key];
        userData.id = key;
      });
      resolve(userData);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateRating = (updatedUser, dbKey) => new Promise((resolve, reject) => {
  axios.put(`${URL}/users/${dbKey}.json`, updatedUser)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  closeTrade,
  getUserByUserName,
  updateRating,
};
