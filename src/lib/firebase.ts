
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence, initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "guardian-mobile-d1jiu",
  "appId": "1:715540375134:web:48f791b5d3e686e2c136cf",
  "storageBucket": "guardian-mobile-d1jiu.firebasestorage.app",
  "apiKey": "AIzaSyDDcpItAKd-t1-PVJR9imPDsL8UK_TSoOk",
  "authDomain": "guardian-mobile-d1jiu.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "715540375134"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = initializeFirestore(app, {
  localCache: { kind: 'persistent' }
});


// Enable offline persistence
try {
    enableIndexedDbPersistence(db)
} catch (error: any) {
    if (error.code == 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
    } else if (error.code == 'unimplemented') {
        console.warn('The current browser does not support all of the features required to enable persistence.');
    }
}


export { app, db };
