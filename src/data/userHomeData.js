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

const getTradeRequests = user => new Promise((resolve, reject) => {
  axios.get(`${URL}/tradeRequests.json?orderBy="user1"&equalTo="${user}"`)
    .then((data) => {
      const tradesObject = data.data;
      const tradesArray = [];
      if (tradesObject !== null) {
        Object.keys(tradesObject).forEach((key) => {
          tradesObject[key].id = key;
          tradesArray.push(tradesObject[key]);
        });
      }
      axios.get(`${URL}/tradeRequests.json?orderBy="user2"&equalTo="${user}"`)
        .then((data2) => {
          const tradesObject2 = data2.data;
          if (tradesObject2 !== null) {
            Object.keys(tradesObject2).forEach((key) => {
              tradesObject2[key].id = key;
              tradesArray.push(tradesObject2[key]);
            });
          }
          resolve(tradesArray);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

const getPendingOffers = user => new Promise((resolve, reject) => {
  getTradeRequests(user)
    .then((tradesArray) => {
      const filteredTrades = tradesArray.filter(trade => trade.accepted === false);
      const openTrades = filteredTrades.filter(trade => trade.qualityRating === false);
      resolve(openTrades);
    })
    .catch((err) => {
      reject(err);
    });
});

const getActiveTrades = user => new Promise((resolve, reject) => {
  getTradeRequests(user)
    .then((tradesArray) => {
      const filteredTrades = tradesArray.filter(trade => trade.accepted === true);
      const openTrades = filteredTrades.filter((trade) => {
        if (user === trade.user1) {
          return trade.qualityRating2 === false;
        }
        return trade.qualityRating1 === false;
      });
      resolve(openTrades);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getUser,
  getPlantsByUser,
  getPendingOffers,
  getTradeRequests,
  getActiveTrades,
};
