// //import firebase from 'firebase/app'
// import * as firebase from "firebase/app";
// import 'firebase/auth'
// //import { REACT_APP_FIREBASE_API_KEY } from '@env';
// //import { REACT_APP_FIREBASE_AUTH_DOMAIN } from '@env';
// //import { REACT_APP_FIREBASE_PROJECT_ID } from '@env';
// //import { REACT_APP_FIREBASE_STORAGE_BUCKET } from '@env';
// //import { REACT_APP_FIREBASE_MESSAGING_SENDER_ID } from '@env';
// //import { REACT_APP_FIREBASE_APP_ID } from '@env';

// const app = firebase.initializeApp({
//     apiKey: "AIzaSyB9ptqrvc282rSxoc-3BJLFKmRKOfVCLIc",//REACT_APP_FIREBASE_API_KEY,
//     authDomain: "hauler-inc.firebaseapp.com",//REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: "hauler-inc",//REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: "hauler-inc.appspot.com",//REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: "640367074138",//REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: "1:640367074138:web:598ca5070695836753f163"//REACT_APP_FIREBASE_APP_ID,
// });

// export const auth = app.auth();
// export default app

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);

export default firebase;
