import "./AddProduct.css";
import Navbar from "../../Components/Navbar/Navbar";


import { useState, useEffect } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import uuid from "react-uuid";
import { useAuth } from "../../hooks/useAuth";

export default function AddProduct() {
  const { localUser } = useAuth();

  const [imageFile, setImageFile] = useState(null);
  const [percent, setPercent] = useState(null);
  const [url, setUrl] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodCategory, setProdCategory] = useState("Cars");
  const [duration, setDuration] = useState(0);
  const [validDuration, setValidDuration] = useState(false);
  // const [createdAt, setCreatedAt] = useState("");
  const [basePrice, setBasePrice] = useState(0);

  const navigate = useNavigate();

  const uploadImage = async () => {
    const storage = getStorage();
    const listRef = ref(storage, "images/productImages");
    const res = await listAll(listRef);

    const storageRef = ref(storage, `images/productImages/${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const percent2 = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        console.log("percent: ", percent2);
        setPercent(percent2);
      },

      (err) => console.log(err),

      () => {
        // download url

        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url: ", url);

          setUrl(url);
        });
      }
    );
  };

  const resetForm = () => {
    setBasePrice("");
    setDuration("");
    // setImageFile("")
    setProdCategory("");
    setProdDescription("");
    setProdName("");
    setProdImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkDuration(duration)
    
    if(validDuration){
      const docRef = addDoc(collection(db, "products"), {
        ownerID: localUser.uid,
        prodID: uuid(),
        prodName: prodName,
        prodDescription: prodDescription,
        prodCategory: prodCategory,
        basePrice: basePrice,
        prodImage: url,
        createdAt: new Date(),
        currentBid:"",
        notification:[],
        duration: new Date(duration),
      });
      console.log("Document written successfully");
      console.log("docRef", docRef);
      resetForm();
    }

    //  await uploadImage();

    

  };


  const checkDuration = (duration) => {
    const selectedTime = new Date(duration);
    const now = Date.now();
    const diff = selectedTime - now;
    
    if(diff<0){
      setValidDuration(false);
    }else {
      setValidDuration(true);
    }
  }


  let durationClass = validDuration ? "" : "display-error";

  return (
    <div>
      <Navbar />
      <div className="add-product-container">
        <div className="add-product-page">
          <h1 className="page-title">Add Product</h1>
          <form className="add-product-form">
            <div className="product-name">
              <label htmlFor="product-name">Product Name</label>
              <input
                type="text"
                name="productName"
                id="productName"
                required
                onChange={(e) => setProdName(e.target.value)}
                value={prodName}
              />
                  
            </div>
            <div className="product-description">
              <label htmlFor="product-description">Product Description</label>
              <textarea
                name="productDescription"
                id="productDescription"
                cols="20"
                rows="10"
                required
                onChange={(e) => setProdDescription(e.target.value)}
                value={prodDescription}
              ></textarea>
            </div>
            <div className="product-category">
              <label htmlFor="product-category">Product Category</label>
              <select
                name="categories"
                id="categories"
                onChange={(e) => setProdCategory(e.target.value)}
                value={prodCategory}
              >
                <option value="Cars" selected>
                  Cars
                </option>
                <option value="Collectibles">Collectibles</option>
                <option value="Electronics">Electronics</option>
                <option value="Watches">Watches</option>
                <option value="Sneakers">Sneakers</option>
              </select>
            </div>
            <div className="product-image">
              <label htmlFor="product-image">Product Photos</label>
              <input
                type="file"
                name="myImage"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                }}

              
              />
              <p>{percent !== null ? `${percent}% done` : ""} </p>
              <button onClick={uploadImage}>upload</button> 
              {/* <button onClick={uploadImage}>upload photo</button> */}
            </div>
            <div className="product-base-price">
              <label htmlFor="product-base-price">Base Price</label>
              <input
                type="number"
                name="basePrice"
                id="basePrice"
                required

                value={basePrice}

                onChange={(e) => setBasePrice(e.target.value)}
              />
            </div>

            <div className="auction-duration">
              <label htmlFor="auction-duration">Auction Ends At</label>
            
              <input
                className={durationClass}
                type="datetime-local"
                name="duration"
                id="duration"
                value={duration}
                required
                onChange={(e) => setDuration(e.target.value)}
              />
              {validDuration ? (
                        <></>
                      ) : (
                        <div className="error-message">
                          Please select a valid date
                        </div>
                      )}
            </div>
            <div className="button-group">

              {percent === 100 && (
                <button className="post-button" onClick={handleSubmit}>
                  Post
                </button>
              )}
              {percent !== 100 && (
                <button className="post-button" onClick={handleSubmit} disabled>
                  Post
                </button>
              )}
              <button type="reset" className="clear-button">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
