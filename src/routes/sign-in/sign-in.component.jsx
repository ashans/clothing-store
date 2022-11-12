import React from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const { userDocRef } = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h2>SignIn Page</h2>
      <button onClick={logGoogleUser}>SignIn with Google</button>
    </div>
  );
};

export default SignIn;
