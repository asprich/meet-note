import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

//Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBecGuUMyxZhtvAjIDjM1OKbS0A7BrhfDg",
    authDomain: "meet-note.firebaseapp.com",
    databaseURL: "https://meet-note.firebaseio.com",
    projectId: "meet-note",
    storageBucket: "meet-note.appspot.com",
    messagingSenderId: "992398538437",
    appId: "1:992398538437:web:d1defbb4033096ba18e2ac",
    measurementId: "G-R97PL0WERT"
});

firebase.analytics();
const firestore = firebase.firestore();

export default global._fb = {
    firebase,
    firebaseui,
    firestore,
    now() {
        return firebase.firestore.Timestamp.fromDate(new Date());
    }
}

