import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxODziNClpKfOolTXt_mBGgnrVsROS-XQ",
  authDomain: "chat-92421.firebaseapp.com",
  projectId: "chat-92421",
  storageBucket: "chat-92421.appspot.com",
  messagingSenderId: "850066988941",
  appId: "1:850066988941:web:bccc22224e02e3c20be7c4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore();
