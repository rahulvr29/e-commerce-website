
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore }from 'firebase/firestore'
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyApPh3oLHiVoxJjF67_LVJVtUCqUOpiG74",
  authDomain: "e-commerce-web-9a74a.firebaseapp.com",
  projectId: "e-commerce-web-9a74a",
  storageBucket: "e-commerce-web-9a74a.appspot.com",
  messagingSenderId: "164608362870",
  appId: "1:164608362870:web:37845856f4554acb631257"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)



export default app;