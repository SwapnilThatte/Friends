// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {FIREBASE} from "../FIREBASE_SECRETS"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE.apiKey,
    authDomain: FIREBASE.authDomain,
    projectId: FIREBASE.projectId,
    storageBucket: FIREBASE.storageBucket,
    messagingSenderId: FIREBASE.messagingSenderId,
    appId: FIREBASE.appId,
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
