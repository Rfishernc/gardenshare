import axios from 'axios';
import moment from 'moment';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const getMessages = tradeId => new Promise((resolve, reject) => {
  axios.get(`${URL}/messages.json?orderBy="tradeId"&equalTo="${tradeId}"`)
    .then((data) => {
      const messagesObject = data.data;
      const messagesArray = [];
      if (messagesObject !== null) {
        Object.keys(messagesObject).forEach((key) => {
          messagesObject[key].id = key;
          messagesArray.push(messagesObject[key]);
        });
      }
      resolve(messagesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const postMessage = messageOBj => new Promise((resolve, reject) => {
  axios.post(`${URL}/messages.json`, messageOBj)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const sortMessages = tradeId => new Promise((resolve, reject) => {
  getMessages(tradeId)
    .then((messagesArray) => {
      let sortedArray = [];
      if (messagesArray !== []) {
        sortedArray = messagesArray.sort((a, b) => moment(a).unix() - moment(b).unix());
      }
      resolve(sortedArray);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getMessages,
  postMessage,
  sortMessages,
};
