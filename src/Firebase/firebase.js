import * as firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

//Initialize Firebase

const firebaseConfig = {
    apiKey: 'AIzaSyB713bPSIVPJmyYiW1rPLaG5ldda32xg5w',
    authDomain: 'ssdb-c571a.firebaseapp.com',
    databaseURL: 'https://ssdb-c571a.firebaseio.com',
    projectId: 'ssdb-c571a',
    storageBucket: 'ssdb-c571a.appspot.com',
    messagingSenderId: '1032504194529',
    appId: '1:1032504194529:android:4610309375e8d511614ea0',
    //measurementId: 'G-measurement-id',
  };

  firebase.initializeApp(firebaseConfig);

  export const Auth = firebase.auth();

  export const DB = firebase.firestore();

  export const Storage = firebase.storage();
