import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";

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

export default firebase;
