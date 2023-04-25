
import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from "firebase/auth";   //this is for authentication purpose
import {getFirestore} from "firebase/firestore"   //this is for firestore initialization that it is in use
import {getStorage} from "firebase/storage"  //this is for storage functionality

const firebaseConfig = {
    apiKey: "AIzaSyD-e9661EPSBLXMMoedg25zJ7poKYr8o_k",
    authDomain: "react-project-4e442.firebaseapp.com",
    projectId: "react-project-4e442",
    storageBucket: "react-project-4e442.appspot.com",
    messagingSenderId: "475826761230",
    appId: "1:475826761230:web:ab8e8fdd71ab2ef6cf565f",
    measurementId: "G-D39HV1YJ18"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);
