import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  dbRef,
  addDoc,
} from "../firebase/config";
import { useGetUploadImage } from "./useGetUploadImage";
import {  useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";
import { useFireStore } from "./useFireStore";
export const useSignup = () => {
 const navigate = useNavigate()

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { singleImage } = useGetUploadImage();
  var { setLocalUser, localUser } = useAuth();
  const { addDocument } = useFireStore("userInformation");

  // console.log("singleImage" , singleImage.length)

  const signup = async (
    email,
    password,
    displayName,
    userType,
    url2,
    setUsername,
    setEmail,
    setPassword,
    setUserType
  ) => {
    console.log("url2: ", url2);
    setError(null);
    setIsPending(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!response) {
        throw new Error("could not complete signup");
      }
      response.user.photoURL = url2;
      response.user.displayName = displayName;

      console.log("response", response);

      setLocalUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      let uid = response.user.uid;

      addDocument({
        uid,
        email,
        password,
        displayName,
        userType,
        url2,
      });
      // const addDoc2 = await addDoc(dbRef, {
      //   email,
      //   password,
      //   displayName,
      //   userType,
      // });

      setIsPending(false);
      setError(null);
      setUsername("");
      setEmail("");
      setPassword("");
      setUserType("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
      navigate("/")

    }
  };

  return { error, isPending, signup  };
};
