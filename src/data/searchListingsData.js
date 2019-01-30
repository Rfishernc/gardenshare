import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const getListings = userZip => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="location"&equalTo="${userZip}"`)
    .then((data) => {
      const usersObject = data.data;
      const usersArray = [];
      if (usersObject !== null) {
        Object.keys(usersObject).forEach((key) => {
          usersObject[key].id = key;
          usersArray.push(usersObject[key]);
        });
      }
      resolve(usersArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getListingsByZipcodes = zipcodes => new Promise((resolve, reject) => {
  const promiseArray = [];
  zipcodes.forEach((zipcode) => {
    promiseArray.push(getListings(zipcode));
  });
  Promise.all(promiseArray)
    .then((usersArrayArray) => {
      resolve(usersArrayArray);
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

const getAllFilteredUsersPlants = usersArray => new Promise((resolve, reject) => {
  const promiseArray = [];
  usersArray.forEach((user) => {
    promiseArray.push(getPlantsByUser(user.userName));
  });
  Promise.all(promiseArray)
    .then((plantsArrayArray) => {
      resolve(plantsArrayArray);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getListings,
  getUser,
  getPlantsByUser,
  getAllFilteredUsersPlants,
  getListingsByZipcodes,
};
