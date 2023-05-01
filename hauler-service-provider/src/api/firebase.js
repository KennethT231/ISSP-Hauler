
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClEdxZbnsmTQJJbcRS5qTinwf0njmAC94",
    authDomain: "hauler-44066.firebaseapp.com",
    projectId: "hauler-44066",
    storageBucket: "hauler-44066.appspot.com",
    messagingSenderId: "236642426134",
    appId: "1:236642426134:web:b451c56241619c3af00437"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
