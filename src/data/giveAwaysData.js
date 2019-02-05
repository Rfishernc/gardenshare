import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const getGiveAways = () => new Promise((resolve, reject) => {
  axios.get(`${URL}/giveAways.json?orderBy="completed"&equalTo="false"`)
    .then((data) => {
      const giveAwaysObject = data.data;
      const giveAwaysArray = [];
      if (giveAwaysObject !== null) {
        Object.keys(giveAwaysObject).forEach((key) => {
          giveAwaysObject[key].id = key;
          giveAwaysArray.push(giveAwaysObject[key]);
        });
      }
      resolve(giveAwaysArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserByUserName = userName => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="userName"&equalTo="${userName}"`)
    .then((data) => {
      const userObject = data.data;
      let user = '';
      if (userObject !== null) {
        // eslint-disable-next-line prefer-destructuring
        user = userObject[0];
      }
      resolve(user);
    })
    .catch((err) => {
      reject(err);
    });
});

const getUsersForGiveAways = () => new Promise((resolve, reject) => {
  getGiveAways()
    .then((giveAwaysArray) => {
      const promiseArray = [];
      if (giveAwaysArray !== []) {
        giveAwaysArray.forEach((giveAway) => {
          promiseArray.push(getUserByUserName(giveAway.userName));
        });
      }
      Promise.all(promiseArray)
        .then((usersArray) => {
          giveAwaysArray.forEach((giveAway) => {
            usersArray.forEach((userOb) => {
              if (giveAway.userName === userOb.userName) {
                // eslint-disable-next-line no-param-reassign
                giveAway.user = userOb;
              }
            });
          });
          resolve(giveAwaysArray);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

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

const postGiveAway = giveAway => new Promise((resolve, reject) => {
  axios.post(`${URL}/giveAways.json`, giveAway)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getGiveAways,
  getUsersForGiveAways,
  getUser,
  getPlantsByUser,
  postGiveAway,
};
