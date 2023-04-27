import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB9ptqrvc282rSxoc-3BJLFKmRKOfVCLIc",//REACT_APP_FIREBASE_API_KEY,
    authDomain: "hauler-inc.firebaseapp.com",//REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "hauler-inc",//REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "hauler-inc.appspot.com",//REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "640367074138",//REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: "1:640367074138:web:598ca5070695836753f163"//REACT_APP_FIREBASE_APP_ID,
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
