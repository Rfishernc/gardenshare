import axios from 'axios';
import apiKeys from './apiKeys';

const zipcodeRadius = (userZip, radius) => {
  axios.get(`https://www.zipcodeapi.com/rest/${apiKeys.zipcodeKey}/radius.json/${userZip}/${radius}/mile`)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default zipcodeRadius;
