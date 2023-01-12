import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { useSetUploadImage } from "../../hooks/useSetUploadImage";
import { useGetUploadImage } from "../../hooks/useGetUploadImage";
import {  useNavigate } from "react-router-dom";

import styles from "../login/Login.module.css";
import {
  auth,
  createUserWithEmailAndPassword,
  dbRef,
  setDoc,
  storage,
  db,
} from "../../firebase/config";
import { useFireStore } from "../../hooks/useFireStore";
import { useAuth } from "../../hooks/useAuth";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
const SignUp = () => {
 const navigate = useNavigate()

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });
  var { localUser, setLocalUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Seller");
  const [imageFile, setImageFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");

  const storage = getStorage();
  const listRef = ref(storage, "images");
  const { signup, error, isPending, response } = useSignup();

  useEffect(() => {
    if (url) {
      console.log("url" , url)
      signup(
        email,
        password,
        username,
        userType,
        url,
        setUsername,
        setEmail,
        setPassword,
        setUserType
      );
      
    }
  }, [url]);
  const { imageIsPending, imageError, uploadImage, singleImage } =
    useSetUploadImage();

  const handleFiles = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleImage = (e) => {
    e.preventDefault();

    uploadImage(imageFile);
  };
  var url2;
  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await listAll(listRef);
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
        });
      }
    );
   
    
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
                value={userType}
                required
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Seller">I am Seller</option>
                <option value="Bidder">I am Bidder</option>
              </select>
            </div>
            <div className={styles.inputbox}>
              <span>upload picture</span>
              <input type="file" onChange={handleFiles} />
              {/* <button onClick={handleImage}>upload image</button> */}
            </div>
            <div className={styles.inputbox}>
              <span>Username</span>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                name="username"
              />
            </div>
            <div className={styles.inputbox}>
              <span>Email</span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
              />
            </div>
            <div className={styles.inputbox}>
              <span>Password</span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
              />
            </div>
            <p className={styles.detail}>
              Already have an account?
              <Link to="/login">
                <span className={styles.link}>login</span>
              </Link>
            </p>

            {!isPending && <button className="signup-button" onClick={handleSignup}>Sign Up</button>}
            {isPending && <button>loading......</button>}
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
