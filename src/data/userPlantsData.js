import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const deletePlant = dbKey => new Promise((resolve, reject) => {
  axios.delete(`${URL}/plants/${dbKey}.json`)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  deletePlant,
};
