import React, { useState, useEffect } from "react";

import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

// import styles from "./Profile.module.css";

import styles from "./Profile.module.css";

import { db } from "../../firebase/config";

import { useAuth } from "../../hooks/useAuth";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Profile = () => {
  const storage = getStorage();

  const listRef = ref(storage, "images");

  const [getUser, setGetUser] = useState("");

  const [percent, setPercent] = useState(null);

  const [url, setUrl] = useState(getUser.url);

  const [id, setId] = useState("");

  var { localUser } = useAuth();

  const [imageFile, setImageFile] = useState(null);

  const [password, setPassword] = useState("");

  const [data, setData] = useState({
    password: getUser.password,
  });

  useEffect(() => {
    if (localUser) {
      setId(localUser.uid);

      getProfile(localUser.uid);
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

    const storageRef = ref(storage, `images/${imageFile.name}`);

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

          getDocs(collection(db, "userInformation")).then((querySnapshot) => {
            // console.log("querySnap: ",querySnapshot)

            querySnapshot.forEach((doc) => {
              // console.log(doc)

              if (
                doc._document.data.value.mapValue.fields.uid.stringValue === id
              ) {
                console.log("if block");

                // console.log("snapsjot: " , doc._document.data.value.mapValue.fields)

                // const x = doc._document.data.value.mapValue.fields.url.stringValue;

                // console.log(x)

                // console.log(doc._key.path.segments[6])

                updateDoc(collection(db, "userInformation"),doc._key.path.segments[6], {
                  url: updatedUrl,
                }).then(function () {
                  console.log("Image updated Successfully");
                });

                // setGetUser(doc.data());

                // data.username = doc.data().displayName;

                // data.email = doc.data().email;

                // data.password = doc.data().password;
              } else {
                console.log("saasf");
              }
            });
          });
        });
      }
    );
  };

  const getProfile = async (id) => {
    const querySnapshot = await getDocs(collection(db, "userInformation"));

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === id) {
        setGetUser(doc.data());

        data.username = doc.data().displayName;

        data.email = doc.data().email;

        data.password = doc.data().password;
      }
    });
  };

  const handleChange = () => {};

  return (
    <>
      {getUser && (
        <>
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
            </div>

            {/* Accounts detail card */}

            <div className={styles.card_form}>
              <div className={styles.card}>
                <div class={styles.card_header}>Account Details</div>

                <div className="card_body">
                  <form>
                    <div className={styles.inputbox}>
                      <span>Password</span>

                      <input
                        type="password"
                        onChange={handleEvent}
                        value={data.password}
                        name="password"
                      />
                    </div>

                    <button>Update</button>
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
