import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// import { useSignup2 } from "../../hooks/useSignup2";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
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
  const {localUser} = useAuth();

  useEffect(() => {
    if(localUser)
    {
     navigate("/")
    }
    
   }, [localUser])
  const { addDocument } = useFireStore("userInformation");
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    userDetail: "",
  });
  const [userType, setUserType] = useState("Seller");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const storage = getStorage();
  const listRef = ref(storage, "images");

  const handleEvent = (e) => {
  
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    // let inputs = { [e.target.name]: e.target.value };
    // setData({ ...data, });
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
        userDetail: data.userDetail,
        userType: userType,
        url,
        notification: [],
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
        userDetail: "",
      });
      setUserType("");
      setUrl("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.box}>
        <div className={styles.form}>
          <form>
            <h2>Sign Up</h2>
            <div className={styles.blockInput}>
              <div className={styles.inputbox}>
                <span>Your Role</span>
                <select
                  name="usertype"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="Seller">I am Seller</option>
                  <option value="Bidder">I am Bidder</option>
                </select>
              </div>
              <div className={styles.fileBox}>
                <span>upload picture</span>
                <div>
                <input
                className={styles.fileInput}
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  name="file"
                  accept="image/png, image/jpg, image/jpeg"
                />
                <button onClick={uploadImage}>upload</button> 
                </div>
                <p>{percent !== null ? `${percent}% done` : ""} </p>
              </div>
            </div>
            <div className={styles.blockInput}>
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
                <span>Your Details</span>
                <input
                  type="text"
                  onChange={handleEvent}
                  value={data.userDetail}
                  name="userDetail"
                />
              </div>
            </div>
            <div className={styles.blockInput}>
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
            </div>
            <p className={styles.detail}>
              Already have an account?
              <Link to="/login">
                <span className={styles.link}>login</span>
              </Link>
            </p>
            {percent === 100 && <button onClick={handleSignup} className={styles.login_btn}>Sign Up</button>}
            {percent !== 100 && (
              <button onClick={handleSignup} disabled className={styles.login_btn}>
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
