import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const getUser = uid => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="uid"&equalTo="${uid}"`)
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

const getPlantsByUser = user => new Promise((resolve, reject) => {
  axios.get(`${URL}/plants.json?orderBy="user"&equalTo="${user}"`)
    .then((data) => {
      const plantsObject = data.data;
      const plantsArray = [];
      if (plantsObject !== null) {
        Object.keys(plantsObject).forEach((plant) => {
          plantsObject[plant].id = plant;
          plantsArray.push(plantsObject[plant]);
        });
      }
      resolve(plantsArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const postOffer = newOffer => new Promise((resolve, reject) => {
  axios.post(`${URL}/tradeRequests.json`, newOffer)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getUser,
  getPlantsByUser,
  postOffer,
};
