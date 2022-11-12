import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy97gluvmufAeVqo7To_Dtk4WMikGHVyQ",
  authDomain: "crwn-clothing-db-6038f.firebaseapp.com",
  projectId: "crwn-clothing-db-6038f",
  storageBucket: "crwn-clothing-db-6038f.appspot.com",
  messagingSenderId: "422037680200",
  appId: "1:422037680200:web:5b953e178c64a91038a87d",
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (authUser, additional = {}) => {
  if (!authUser) {
    return;
  }
  const userDocRef = doc(db, "users", authUser.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = authUser;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additional
      });
    } catch (error) {
      console.log("error creating new user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUser = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};
