import { useState } from "react";
import {  auth ,signInWithEmailAndPassword } from "../firebase/config";


export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const signin = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      if (!response) {
        throw new Error("could not complete signin");
      }
      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };
  return { error, isPending, signin };
};
