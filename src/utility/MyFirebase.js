import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBgyVLvV7moJQR7fKxMpGZ8IaYDz5l8h-U",
    authDomain: "react-cataloger3.firebaseapp.com",
    databaseURL: "https://react-cataloger3.firebaseio.com",
    projectId: "react-cataloger3",
    storageBucket: "react-cataloger3.appspot.com",
    messagingSenderId: "387075224871"
};

firebase.initializeApp(config);

function getFirebaseRef(refPath) {
  return firebase.database().ref(refPath);
}

export default {
  getFirebaseRef: getFirebaseRef,
};