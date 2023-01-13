import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";

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
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Profile = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
    // beforeChange: function(currentSlide, nextSlide) {
    //   console.log("before change", currentSlide, nextSlide);
    // },
    // afterChange: function(currentSlide) {
    //   console.log("after change", currentSlide);
    // },
    
  };
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
  useEffect(() => {
    if (localUser) {
      setId(localUser.uid);
      getProfile(localUser.uid);
      setAuthUser(localUser);
      showUserProduct(localUser.uid);
    }
  }, [localUser]);
  const handleEvent = (e) => {
    let inputs = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputs });
  };
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
  const showUserProduct = async (id) => {
    const tempCards = [];

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      if (doc.data().ownerID === id) {
        tempCards.push(doc.data());
      }
    });
    setFilteredProducts(tempCards);

    console.log("filteredData", filteredProducts);
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

                <div className={styles.card_text}>{getUser.displayName}</div>
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
                  <button onClick={changePasswordBlock} id="auctions">
                    My Auctions
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
            <div className={styles.auctions_card}>
            {blockOption === "auctions" && (
             
             
                filteredProducts &&
                  filteredProducts.map((card, index) => {
                    return <Card  key={index} data={card} />;
                  })
             
                  
            )}
            </div>
          </div>
        </>
      )}
      {!getUser && <h1>Loading.....</h1>}
    </>
  );
};

export default Profile;
