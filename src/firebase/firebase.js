import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCxywH6JR0riN2ZLRFHwz2YpCHRUHJ_IBI',
  authDomain: 'eqshop-7e026.firebaseapp.com',
  projectId: 'eqshop-7e026',
  storageBucket: 'eqshop-7e026.appspot.com',
  messagingSenderId: '435757603382',
  appId: '1:435757603382:web:8e92818fc4cc5628ad1697',
};

export const app = initializeApp(firebaseConfig);
export const authantication = getAuth();
export const db = getFirestore();
const storage = getStorage();
