import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  writeBatch,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4NHdB9LqulCC_CM0aHZ4EAA9mJyd16Mk",
  authDomain: "crwn-clothing-db-a311b.firebaseapp.com",
  projectId: "crwn-clothing-db-a311b",
  storageBucket: "crwn-clothing-db-a311b.appspot.com",
  messagingSenderId: "678963034428",
  appId: "1:678963034428:web:48f810ba207364cc800639",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
const db = getFirestore(app);
export const signInWhithGooglePopup = () => signInWithPopup(auth, provider);

export const createUser = async (userAuth) => {
  const userDocumentRef = doc(db, "users", userAuth.uid);
  const snapshot = await getDoc(userDocumentRef);
  if (!snapshot.exists()) {
    try {
      const { email, displayName } = userAuth;
      const createdAt = new Date();
      setDoc(userDocumentRef, { email, displayName, createdAt });
    } catch (error) {
      console.log(error);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logInWIthEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthChangeListner = (callback) =>
  onAuthStateChanged(auth, callback);

export const addCategory = (catt) => {
  const collectionRef = collection(db, "category");
  const batch = writeBatch(db);
  catt.forEach((element) => {
    const ref = doc(collectionRef, element.title.toLowerCase());
    batch.set(ref, element);
  });
  batch.commit();
};
export const getCategory = async () => {
  const collectionRef = collection(db, "category");
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => doc.data());
};
