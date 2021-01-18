import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB9hULCSj73Wc7sJqONfTTzGfkoCZYO3OI",
  authDomain: "snapchat-clone-7c0da.firebaseapp.com",
  projectId: "snapchat-clone-7c0da",
  storageBucket: "snapchat-clone-7c0da.appspot.com",
  messagingSenderId: "71491390109",
  appId: "1:71491390109:web:dd2a442c6e64b85ee4e274"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };