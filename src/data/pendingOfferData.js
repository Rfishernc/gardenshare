import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const acceptOffer = offerId => new Promise((resolve, reject) => {
  const patchObj = {
    accepted: true,
  };
  axios.patch(`${URL}/tradeRequests/${offerId}.json`, patchObj)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const removeOffer = offerId => new Promise((resolve, reject) => {
  axios.delete(`${URL}/tradeRequests/${offerId}.json`)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  acceptOffer,
  removeOffer,
};
