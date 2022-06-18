import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBwDIwWPr4clMaFOfFZ5Xh3Yw6RbjLFHQQ",
    authDomain: "nirmanclasses-7e6d9.firebaseapp.com",
    projectId: "nirmanclasses-7e6d9",
    storageBucket: "nirmanclasses-7e6d9.appspot.com",
    messagingSenderId: "774067676933",
    appId: "1:774067676933:web:a12b288f13d16d986b796c",
    measurementId: "G-DY97FVE104"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;