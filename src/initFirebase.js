import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {
  getAuth
} from "firebase/auth";

import MY_KEYS from "./apikey.js";

const firebaseConfig = MY_KEYS;

// init Firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth()

export { db, auth }