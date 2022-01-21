import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyA6mkSz2IeB-uT_t4o4WhTTvHdUGkEecCI",
  
    authDomain: "eventhub-authv1.firebaseapp.com",
  
    projectId: "eventhub-authv1",
  
    storageBucket: "eventhub-authv1.appspot.com",
  
    messagingSenderId: "125033143707",
  
    appId: "1:125033143707:web:008ae0399a71c9b3eb553e",
  
    measurementId: "G-M26H783RFK"
  
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
  