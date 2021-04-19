import firebase from "firebase";
import "firebase/storage";

const app = firebase.initializeApp({
  projectId: "litsoc-a8678",
  appId: "1:753786281560:web:2a73b4de31164b6fb9342d",
  storageBucket: "litsoc-a8678.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyDa7yeI5kgaimKs7JjPpGOTcWZn0Y1YLVw",
  authDomain: "litsoc-a8678.firebaseapp.com",
  messagingSenderId: "753786281560",
  measurementId: "G-7YQVPR7EN5",
});
export default app;
