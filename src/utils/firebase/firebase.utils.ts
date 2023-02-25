import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    User
} from "firebase/auth";
import {
    collection,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    writeBatch
} from "firebase/firestore";
import {Category} from "../../store/categories/categories.types";

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

export type AdditionalInformation = {
    displayName?: string;
}
export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}
export const createUserDocumentFromAuth = async (authUser: User, additional = {} as AdditionalInformation
): Promise<void | DocumentSnapshot<UserData>> => {
    if (!authUser) {
        return;
    }
    const userDocRef = doc(db, "users", authUser.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const {displayName, email} = authUser;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additional,
            });
        } catch (error) {
            console.log("error creating new user", error);
        }
    }
    return userSnapshot as DocumentSnapshot<UserData>;
};

export const createAuthUser = async (email: string, password: string) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUser = async (email: string, password: string) => {
    if (!email || !password) {
        return;
    }
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const authListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export type ObjectToAdd = {
    title: string;
}
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshots = await getDocs(q);
    return querySnapshots.docs.map(docSnapshot => docSnapshot.data() as Category);
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth)
            },
            reject
        )
    })
}