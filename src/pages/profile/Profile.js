import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getAuth,
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut
} from "firebase/auth";
// import styles from "./Profile.module.css";
import styles from "./Profile.module.css";
import { db, signInWithEmailAndPassword } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const storage = getStorage();
  const navigate = useNavigate();
  const listRef = ref(storage, "images");
  const [getUser, setGetUser] = useState("");
  const [percent, setPercent] = useState(null);
  const [url, setUrl] = useState();
  const [id, setId] = useState("");
  var { localUser } = useAuth();
  const [authUser, setAuthUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState();
  const [data, setData] = useState({
    password: "",
  });
  console.log();
  useEffect(() => {
    if (localUser) {
      setId(localUser.uid);
      getProfile(localUser.uid);
      setAuthUser(localUser);
    }
  }, [localUser]);
  const handleEvent = (e) => {
    let inputs = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputs });
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    console.log("assaf");
    const res = await listAll(listRef);
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
        getDownloadURL(uploadTask.snapshot.ref).then((updatedUrl) => {
          console.log("url: ", updatedUrl);
          setUrl(updatedUrl);
          updateProfile(auth.currentUser, {
            photoURL: updatedUrl,
          })
            .then(() => {
              console.log("updated");
            })
            .catch((error) => {
              console.log("updatednot", error);
            });
          const res = getDocs(collection(db, "userInformation")).then(
            (querySnapshot) => {
              querySnapshot.forEach(async (userDoc) => {
                if (userDoc.data().uid === id) {
                  const washingtonRef = doc(
                    db,
                    "userInformation",
                    userDoc._key.path.segments[6]
                  );
                  const imageRes = await updateDoc(washingtonRef, {
                    url: updatedUrl,
                  });
                  console.log("imageRes", imageRes);
                }
              });
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
    );
  };
  const updateData = async (e) => {
    e.preventDefault();
    if (authUser) {
      console.log(getUser.password);
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        getUser.password
      );
      console.log(credential);
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          // User re-authenticated.
          alert("User re-authenticated");
          updatePassword(auth.currentUser, password)
            .then(() => {
              alert("password updated successfully");
              const res = getDocs(collection(db, "userInformation")).then(
                (querySnapshot) => {
                  querySnapshot.forEach(async (userDoc) => {
                    if (userDoc.data().uid === id) {
                      const washingtonRef = doc(
                        db,
                        "userInformation",
                        userDoc._key.path.segments[6]
                      );
                      const imageRes = await updateDoc(washingtonRef, {
                        password: password,
                      });
                      console.log("imageRes", imageRes);
                    }
                  });
                },
               
                (error) => {
                  console.log(error);
                }
              );
              signOut(auth)
                .then(() => {
                  console.log("successfully logout");
                  navigate("/login");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }

   
  };
  const getProfile = async (id) => {
    const querySnapshot = await getDocs(collection(db, "userInformation"));
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === id) {
        setGetUser(doc.data());
        // data.username = doc.data().displayName;
        // data.email = doc.data().email;
        setData(doc.data().password);
        setUrl(doc.data().url);
      }
    });
  };
  const handleChange = () => {};

  return (
    <>
      {getUser && (
        <>
         {/* --- header start --- */}
        
          <div className={styles.card_container}>
            <div className={styles.card}>
              <div className={styles.card_header}>Profile Picture</div>
              <div className={styles.card_body}>
                <img className={styles.img_account_profile} src={url} alt="" />

                <div className={styles.card_text}>{getUser.displayName}</div>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  name="file"
                />
                <p>{percent !== null ? `${percent}% done` : ""} </p>

                <button onClick={uploadImage}>upload</button>
              </div>
              <ul>
                <li>Change Password</li>
                <li>My Auctions</li>
                <li>Details</li>
            </ul>
            </div>
            {/* Accounts detail card */}
            <div className={styles.card_form}>
              <div className={styles.card}>
                <div class={styles.card_header}>Account Details</div>
                <div className={styles.card_body}>
                  <form>
                    <div className={styles.inputbox}>
                      <span>Password</span>
                      <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        defaultValue={getUser.password}
                        name="password"
                      />
                    </div>
                    <button className={styles.update_btn} onClick={updateData}>Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!getUser && <h1>Loading.....</h1>}
    </>
  );
};

export default Profile;
