import axios from 'axios';
import apiKeys from './apiKeys';

const zipcodeRadius = (userZip, radius) => new Promise((resolve, reject) => {
  axios.get(`https://www.zipcodeapi.com/rest/${apiKeys.zipcodeKey}/radius.json/${userZip}/${radius}/mile`)
    .then((data) => {
      const locations = data.data.zip_codes;
      const zipcodesArray = [];
      if (locations !== null) {
        locations.forEach((location) => {
          zipcodesArray.push(location.zip_code);
        });
      }
      resolve(zipcodesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  zipcodeRadius,
};
