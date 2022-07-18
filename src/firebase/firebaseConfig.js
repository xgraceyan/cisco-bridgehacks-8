import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhQaXwnm3Gq7o3e0fdFgNCetl3l3YE4ow",
  authDomain: "cisco-bridgehacks-8.firebaseapp.com",
  projectId: "cisco-bridgehacks-8",
  storageBucket: "cisco-bridgehacks-8.appspot.com",
  messagingSenderId: "77690104866",
  appId: "1:77690104866:web:545c40d3246f11150e6e7b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true, merge: true});

export default firebase;