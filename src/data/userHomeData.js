import axios from 'axios';
import apiKeys from './apiKeys';

const getUser = uid => new Promise((resolve, reject) => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`)
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
  getUser,
};
