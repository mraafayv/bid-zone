import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
// import styles from "./Profile.module.css";
import styles from "../../pages/login/Login.module.css";
import styles2 from "./Profile.module.css";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";

import { collection, getDocs } from "firebase/firestore";

const Profile = () => {
  var { user } = useAuth();
  const [getUser, setGetUser] = useState("");
  useEffect(() => {
    getProfile();
    let users = localStorage.getItem("user");
    var localAuth = JSON.parse(users);
    setGetUser(localAuth);
  }, []);
  console.log("getUser" , getUser)

  const getProfile = async () => {
    const querySnapshot = await getDocs(collection(db, "userInformation"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <>
      {/* { getImages && <img src={getImages} alt="image" width={300} height={300} />}   */}
{
  getUser && 
  <div className={styles2.profile_container}>
        <div className={styles2.box}>
          <h2>{getUser.displayName}</h2>
          <h6>{getUser.email}</h6>
          <div className={styles2.avatar}>
            <img className={styles2.avatar_img} src={getUser.photoURL} />
          </div>
          <button>Upload new Photo</button>
        </div>
        <div className={styles.profile_form}>
          <h2>Edit Profile</h2>
          <div className={styles.login_container}>
            <div className={styles.box}>
              <div className={styles.form}>
                <form>
                  <h2>Sign Up</h2>

                  <div className={styles.inputbox}>
                    <span>Username</span>
                    <input type="text" name="username" />
                  </div>
                  <div className={styles.inputbox}>
                    <span>Email</span>
                    <input type="email" name="email" />
                  </div>
                  <div className={styles.inputbox}>
                    <span>Password</span>
                    <input type="password" name="password" />
                  </div>
                  <button className={styles2.profile_btn}>Update info</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
}
      
    </>
  );
};

export default Profile;
