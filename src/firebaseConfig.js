import dotenv from "dotenv";
dotenv.config();
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.api_key,
  authDomain: process.env.auth_domain,
  projectId: process.env.project_id,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
console.log(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
