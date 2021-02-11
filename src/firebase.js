import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const config = {
	apiKey: 'AIzaSyAsm2AajbLjNnGdo4cb7pVXXfaxVkt-GKs',
	authDomain: 'budget-world-reactjs.firebaseapp.com',
	databaseURL: 'https://budget-world-reactjs.firebaseio.com',
	projectId: 'budget-world-reactjs',
	storageBucket: 'budget-world-reactjs.appspot.com',
	messagingSenderId: '861888022462',
	appId: '1:861888022462:web:14dcf8a9f3cf6803439bef',
};

firebase.initializeApp(config);
export default firebase;
