import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy97gluvmufAeVqo7To_Dtk4WMikGHVyQ",
  authDomain: "crwn-clothing-db-6038f.firebaseapp.com",
  projectId: "crwn-clothing-db-6038f",
  storageBucket: "crwn-clothing-db-6038f.appspot.com",
  messagingSenderId: "422037680200",
  appId: "1:422037680200:web:5b953e178c64a91038a87d",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (authUser) => {
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
      });
    } catch (error) {
      console.log("error creating new user", error.message);
    }
  }
  return userDocRef;
};
