import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const postNewPlant = newPlant => new Promise((resolve, reject) => {
  axios.post(`${URL}/plants.json`, newPlant)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  postNewPlant,
};
