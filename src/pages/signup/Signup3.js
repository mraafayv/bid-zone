import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSignup2 } from "../../hooks/useSignup2";
import { useNavigate } from "react-router-dom";
import styles from "../login/Login.module.css";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, createUserWithEmailAndPassword } from "../../firebase/config";
import { useFireStore } from "../../hooks/useFireStore";

import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
const SignUp3 = () => {
  const [percent, setPercent] = useState(null);

  const { addDocument } = useFireStore("userInformation");
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "Seller",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null)
  const [url, setUrl] = useState("");
  const storage = getStorage();
  const listRef = ref(storage, "images");

  const handleEvent = (e) => {
    let inputs = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputs });
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    console.log("assaf");
    // const res = await listAll(listRef);
    const storageRef = ref(storage, `images/profileImages/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((updatedURL) => {
          console.log("url: ", updatedURL);
          setUrl(updatedURL);
        });
      }
    );
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log("in try");

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
      let uid = response.user.uid;

      addDocument({
        uid,
        email: data.email,
        password: data.password,
        displayName: data.username,
        userType: data.userType,
        url,
      });
      updateProfile(auth.currentUser, {
        displayName: data.username,
        photoURL: url,
      })
        .then(() => {
          console.log("updated");
          navigate("/");
        })
        .catch((error) => {
          console.log("updatednot", error);
          
        });

      setData({
        username: "",
        email: "",
        password: "",
        userType: "Seller",
      });
      setUrl("");
    } catch (error) {
      console.log(error.message);
      setError(error.message)
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.box}>
        <div className={styles.form}>
          <form>
            <h2>Sign Up</h2>
            <div className={styles.inputbox}>
              <span>Your Role</span>
              <select
                name="usertype"
                value={data.userType}
                required
                onChange={handleEvent}
              >
                <option value="Seller">I am Seller</option>
                <option value="Bidder">I am Bidder</option>
              </select>
            </div>
            <div className={styles.inputbox}>
              <span>upload picture</span>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                name="file"
              />
              <button onClick={uploadImage}>upload</button> 
              <p>{percent !== null ? `${percent}% done` : ""} </p>
            </div>
            <div className={styles.inputbox}>
              <span>Username</span>
              <input
                type="text"
                onChange={handleEvent}
                value={data.username}
                name="username"
              />
            </div>
            <div className={styles.inputbox}>
              <span>Email</span>
              <input
                type="email"
                onChange={handleEvent}
                value={data.email}
                name="email"
              />
            </div>
            <div className={styles.inputbox}>
              <span>Password</span>
              <input
                type="password"
                onChange={handleEvent}
                value={data.password}
                name="password"
              />
            </div>
            <p className={styles.detail}>
              Already have an account?
              <Link to="/login">
                <span className={styles.link}>login</span>
              </Link>
            </p>
            {percent === 100 && <button onClick={handleSignup}>Sign Up</button>}
            {percent !== 100 && (
              <button onClick={handleSignup} disabled>
                Sign Up
              </button>
            )}
           
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp3;
