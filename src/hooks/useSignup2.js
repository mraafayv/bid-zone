import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged, updateProfile  } from "firebase/auth";

import { useAuth } from "./useAuth";
import { useFireStore } from "./useFireStore";
export const useSignup2 = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("user", user);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  var { setLocalUser, localUser } = useAuth();
  const { addDocument } = useFireStore("userInformation");

  const signup = async (data, url, setData, setUrl) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (!response) {
        throw new Error("could not complete signup");
      }
    //   user.photoURL = url;
    //   user.displayName = data.username;
    
      
       updateProfile(auth.currentUser,{ displayName:data.username, photoURL:url }).then(() => {
        console.log("updated")
        }).catch((error) => {
        console.log("updatednot", error)
          
        });
    
   
      
      let uid = response.user.uid;

      addDocument({
        uid,
        email: data.email,
        password: data.password,
        displayName: data.username,
        userType: data.userType,
        userDetail:data.userDetail,
        url,
      });

      setIsPending(false);
      setError(null);
      setData({
        username: "",
        email: "",
        password: "",
        userDetail:"",
        userType: "Seller",
      });
      setUrl("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
