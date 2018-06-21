import * as firebase from 'firebase';

var config = {
	apiKey: "AIzaSyCpJEMSEih7HF4xtwKYoN7OATb6eXJmqiQ",
	authDomain: "react-cataloger2.firebaseapp.com",
	databaseURL: "https://react-cataloger2.firebaseio.com",
	projectId: "react-cataloger2",
	storageBucket: "react-cataloger2.appspot.com",
	messagingSenderId: "410236694083"
};

firebase.initializeApp(config);
 
function getFirebaseRef(refPath) {
  return firebase.database().ref(refPath);
}

export default {
  getFirebaseRef: getFirebaseRef,
};