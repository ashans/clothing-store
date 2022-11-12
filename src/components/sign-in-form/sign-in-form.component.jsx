import React, { useState } from "react";
import {
  signInAuthUser,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
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

  // Use this when sign in with redirect to get auth data
  //   const logGoogleUserRedirect = async () => {
  //     await signInWithGoogleRedirect();
  //   };

  // {/* <button onClick={logGoogleUserRedirect}>
  //       SignIn with Google (Redirect)
  //     </button> */}

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUser(email, password);
      resetForm();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Invalid user");
          break;
        case "auth/wrong-password":
          alert("Invalid password");
          break;
        default:
          alert("Oops.. Something went wrong");
      }
      console.log("user creating error", error);
    }
  };

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>SignIn with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
