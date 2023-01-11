import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup2 } from "../../hooks/useSignup2";
import { useNavigate } from "react-router-dom";
import styles from "../login/Login.module.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
const SignUp2 = () => {
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
  const [url, setUrl] = useState("");
  const storage = getStorage();
  const listRef = ref(storage, "images");
  const { signup, error, isPending } = useSignup2();

  useEffect(() => {
    if (url) {
      signup(data, url, setData, setUrl);
    console.log("user2", user)
    if(user!==null)
    {
     navigate("/");

    }

    

    
    }
  }, [url, user]);
  const handleEvent = (e) => {
    let inputs = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputs });
  };

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

            {!isPending && <button onClick={handleSignup}>Sign Up</button>}
            {isPending && <button>loading......</button>}
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
