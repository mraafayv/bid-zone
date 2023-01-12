import { useState, useEffect } from "react";
import { storage, db } from "../firebase/config";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export const useGetUploadImage = () => {
  const [imageError, setImageError] = useState(null);
  const [imageIsPending, setImageIsPending] = useState(null);
  const [getImages, setGetImages] = useState([]);
  const [singleImage, setSingleImage] = useState("");
  const storage = getStorage();
  const listRef = ref(storage, "images");

  var fetchUrl;
  useEffect(() => {
    userData();
    // console.log(getImages, singleImage);
  }, []);
  const userData = async () => {
    const res = await listAll(listRef);

    res.items.forEach(async (itemRef) => {
      const fetchUrl = await getDownloadURL(itemRef);
      // console.log("fetchUrl", fetchUrl);
      setSingleImage(fetchUrl);
      setGetImages((current) => [...current, fetchUrl]);
    });
  };

  // const dbRef = doc(db, "userInformation", "userData");
  // const docSnap = await getDoc(dbRef);
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   console.log("No such document!");
  // }

  return { getImages, singleImage };
};
