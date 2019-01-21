
import firebase from 'firebase/app';
import 'firebase/auth';

const loginUser = (email, password) => new Promise((resolve, reject) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

const logoutUser = () => {
  firebase.auth().signOut();
};

const getCurrentUsername = () => firebase.auth().currentUser.username;

export default {
  loginUser,
  logoutUser,
  getCurrentUsername,
};
