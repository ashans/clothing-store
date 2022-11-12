import React, { useState } from "react";
import {
  createAuthUser,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords does not match");
      return;
    }
    try {
      const { user } = await createAuthUser(email, password);

      await createUserDocumentFromAuth(user, { displayName: displayName });

      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      }
      console.log("user creating error", error);
    }
  };

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>SignUp with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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

        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Submit </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
