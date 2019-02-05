import axios from 'axios';
import apiKeys from './apiKeys';

const URL = apiKeys.firebaseKeys.databaseURL;

const closeTrade = (closedTrade, dbKey) => new Promise((resolve, reject) => {
  axios.put(`${URL}/tradeRequests/${dbKey}.json`, closedTrade)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserByUserName = userName => new Promise((resolve, reject) => {
  axios.get(`${URL}/users.json?orderBy="userName"&equalTo="${userName}"`)
    .then((data) => {
      let userData;
      Object.keys(data.data).forEach((key) => {
        userData = data.data[key];
        userData.id = key;
      });
      resolve(userData);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateRating = (updatedUser, dbKey) => new Promise((resolve, reject) => {
  axios.put(`${URL}/users/${dbKey}.json`, updatedUser)
    .then(() => {
      resolve();
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

const makeTradedPlantsArray = (tradedPlants) => {
  const tradedPlantsArray = [];
  Object.keys(tradedPlants).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    tradedPlants[key].plant = key;
    tradedPlantsArray.push(tradedPlants[key]);
  });
  return tradedPlantsArray;
};

const updatePlantsQty = (user, tradedPlants) => new Promise((resolve, reject) => {
  const tradedPlantsArray = makeTradedPlantsArray(tradedPlants);
  getPlantsByUser(user)
    .then((plantsArray) => {
      tradedPlantsArray.forEach((tradedPlant) => {
        plantsArray.forEach((plantOb) => {
          if (plantOb.plant === tradedPlant.plant) {
            // eslint-disable-next-line no-param-reassign
            plantOb.surplus -= tradedPlant.qty;
            // eslint-disable-next-line no-param-reassign
            plantOb.qty -= tradedPlant.qty;
          }
        });
      });
      resolve(plantsArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateOnePlantInDB = plant => new Promise((resolve, reject) => {
  axios.put(`${URL}/plants/${plant.id}.json`, plant)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const updatePlantsInDB = plantsArray => new Promise((resolve, reject) => {
  const promiseArray = [];
  plantsArray.forEach((plant) => {
    promiseArray.push(updateOnePlantInDB(plant));
  });
  Promise.all(promiseArray)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  closeTrade,
  getUserByUserName,
  updateRating,
  getPlantsByUser,
  updatePlantsQty,
  updatePlantsInDB,
};
