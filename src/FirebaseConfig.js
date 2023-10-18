import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-eUe_wPJSKEoEL6zyYpIPiUVhbftHcW8",
  authDomain: "bluebox-buster.firebaseapp.com",
  projectId: "bluebox-buster",
  storageBucket: "bluebox-buster.appspot.com",
  messagingSenderId: "158687527716",
  appId: "1:158687527716:web:714cb06045bcd6437ea9b1",
  measurementId: "G-YNLCTK8C5Y"
};

const app = initializeApp(firebaseConfig);

const gitAuth = getAuth(app);
const provider = new GithubAuthProvider();

export { gitAuth, provider }