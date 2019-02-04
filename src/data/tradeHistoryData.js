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

const getTradesUser1 = userName => new Promise((resolve, reject) => {
  axios.get(`${URL}/tradeRequests.json?orderBy="user1"&equalTo="${userName}"`)
    .then((data) => {
      const tradesObject = data.data;
      const tradesArray = [];
      if (tradesObject !== null) {
        Object.keys(tradesObject).forEach((key) => {
          tradesArray.push(tradesObject[key]);
        });
      }
      resolve(tradesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getTradesUser2 = userName => new Promise((resolve, reject) => {
  axios.get(`${URL}/tradeRequests.json?orderBy="user2"&equalTo="${userName}"`)
    .then((data) => {
      const tradesObject = data.data;
      const tradesArray = [];
      if (tradesObject !== null) {
        Object.keys(tradesObject).forEach((key) => {
          tradesArray.push(tradesObject[key]);
        });
      }
      resolve(tradesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getTradeHistory = userName => new Promise((resolve, reject) => {
  getTradesUser1(userName)
    .then((tradesArray1) => {
      getTradesUser2(userName)
        .then((tradesArray2) => {
          const tradesArray = tradesArray1.concat(tradesArray2);
          const filteredTrades = tradesArray.filter(trade => trade.qualityRating !== false);
          resolve(filteredTrades);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getUser,
  getTradeHistory,
  getTradesUser1,
  getTradesUser2,
};
