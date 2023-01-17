import { useState } from "react";
import { storage, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { useGetUploadImage } from "./useGetUploadImage";

export const useSetUploadImage = () => {
  const [imageError, setImageError] = useState(null);
  const [imageIsPending, setImageIsPending] = useState(null);
  const [singleImage, setSingleImage] = useState("");


  const storage = getStorage();
  const listRef = ref(storage, "images");

  const uploadImage = async (imageFile) => {
    setImageError(null);
    setImageIsPending(true);
    try {
      if (imageFile == null) return;
      const imageRef = ref(storage, `images/${imageFile.name + Date.now()}`);
      const imageResponse = await uploadBytes(imageRef, imageFile);
      console.log("imageResponse", imageResponse);

      if (!imageResponse) {
        throw new Error("image is not uploaded");
      }
      if (imageResponse) {
       
          const res = await listAll(listRef);

          res.items.forEach(async (itemRef) => {
            const fetchUrl = await getDownloadURL(itemRef);
            console.log("fetchUrl", typeof fetchUrl);
          
            setSingleImage(singleImage)
            
          });
       
      }
      setImageIsPending(false);
      setImageError(null);
    } catch (error) {
      console.log(error);
      setImageError(error);
      setImageIsPending(false);
    }
  };

  return { imageIsPending, imageError, uploadImage , singleImage };
};
