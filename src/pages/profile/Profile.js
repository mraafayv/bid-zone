import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { getDatabase, ref as realtimeRef, child, get } from "firebase/database";
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
  signOut,
} from "firebase/auth";
import Slider from "react-slick";

// import styles from "./Profile.module.css";
import styles from "./Profile.module.css";
import { db, signInWithEmailAndPassword } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [password, setPassword] = useState();
  const [blockOption, setBlockOption] = useState(null);

  const [data, setData] = useState({
    password: "",
  });
  console.log();
  //my work

  //end mywork
  useEffect(() => {
    if (localUser) {
      setId(localUser.uid);
      getProfile(localUser.uid);
      setAuthUser(localUser);
    }
  }, [localUser]);

  const changePasswordBlock = (e) => {
    const id = e.target.getAttribute("id");
    console.log("id", id);
    if (id === "changePassword") {
      setBlockOption("changePassword");
    } else if (id === "auctions") {
      setBlockOption("auctions");
    } else if (id === "profileDetails") {
      setBlockOption("profileDetails");
    }
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

                <div className={styles.card_text}>
                  {getUser.displayName} {getUser.userType}
                </div>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  name="file"
                />
                <p>{percent !== null ? `${percent}% done` : ""} </p>

                <button onClick={uploadImage}>upload</button>
              </div>
              <ul className={styles.profile_menu}>
                <li>
                  <button onClick={changePasswordBlock} id="changePassword">
                    Change Password
                  </button>
                </li>
                <li>
                  <button onClick={changePasswordBlock} id="profileDetails">
                    Details
                  </button>
                </li>
              </ul>
            </div>
            {/* Accounts detail card */}

            {/* change password */}
            {blockOption === null && <h3>this is my head</h3>}
            {blockOption === "changePassword" && (
              <div className={styles.card_form}>
                <div className={styles.card_password}>
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
                      <button
                        className={styles.update_btn}
                        onClick={updateData}
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* auctions */}

            {blockOption === "profileDetails" && (
              <div className={styles.profile_details}>
                <h3>About Me</h3>
                <h6>A Lead UX UI designer based in Canada</h6>
                <p className={styles.para}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Iste, nesciunt. Non perferendis dolore nobis hic sint
                  assumenda, excepturi accusamus voluptates neque inventore quos
                  esse cupiditate ipsum repudiandae nostrum quas doloribus.
                </p>
                <div className={styles.userInfo}>
                  <div className={styles.bioData_head1}>
                    <div className={styles.bioData_content}>
                      <span>Name:</span>
                      <p>{getUser.displayName}</p>
                    </div>
                    <div className={styles.bioData_content}>
                      <span>Your role:</span>
                      <p>{getUser.userType}</p>
                    </div>
                  </div>
                  <div className={styles.bioData_head2}>
                  <div className={styles.bioData_content}>
                      <span>Gender:</span>
                      <p>Male</p>
                    </div>
                   
                    <div className={styles.bioData_content}>
                      <span>Email:</span>
                      <p>{getUser.email}</p>
                    </div>
                   
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {!getUser && <h1>Loading.....</h1>}
    </>
  );
};

export default Profile;
