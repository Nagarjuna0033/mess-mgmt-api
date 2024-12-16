const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyB69ELzb7fP0CslaSf4mVnAydC_2pITQuc",
  authDomain: "mess-management-250df.firebaseapp.com",
  projectId: "mess-management-250df",
  storageBucket: "mess-management-250df.firebasestorage.app",
  messagingSenderId: "1036113362614",
  appId: "1:1036113362614:web:f841bd6b1102769d83b017",
  measurementId: "G-DX0HVW1JP2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { app, db };
