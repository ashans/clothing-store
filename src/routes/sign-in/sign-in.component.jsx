import React from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // Use this when sign in with redirect to get auth data
  //   useEffect(() => {
  //     const fetchRedirectResult = async () => {
  //         const response = await getRedirectResult(auth);
  //         if (response) {
  //             const {docRef} = await createUserDocumentFromAuth(response.user);
  //         }
  //     }
  //     fetchRedirectResult();
  //   }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  // Use this when sign in with redirect to get auth data
  //   const logGoogleUserRedirect = async () => {
  //     await signInWithGoogleRedirect();
  //   };
  return (
    <div>
      <h2>SignIn Page</h2>
      <button onClick={logGoogleUser}>SignIn with Google (Popup)</button>
      {/* <button onClick={logGoogleUserRedirect}>
        SignIn with Google (Redirect)
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
