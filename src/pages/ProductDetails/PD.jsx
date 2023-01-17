import "./ProductDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Timer from "../../Components/Timer/Timer";

import { useAuth } from "../../hooks/useAuth";

import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

export default function PD() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [lesserAmount, setLesserAmount] = useState(true);
  const [document, setDocument] = useState(null);

  const q = query(collection(db, "products"), where("prodID", "==", id));

  const { localUser } = useAuth();

  function increaseBid() {
    setBidAmount(Number(bidAmount) + 10);
  }

  function decreaseBid() {
    if (bidAmount > 0) {
      setBidAmount(Number(bidAmount) - 10);
    }
  }

  function checkBidAmount(e) {
    if (e.target.value <= Number(product.basePrice)) {
      setBidAmount(e.target.value);
      console.log("Bid can't be lesser than original price");
      setLesserAmount(true);
    } else if (e.target.value < 0) {
      e.target.value = 0;
    } else {
      setBidAmount(e.target.value);
      setLesserAmount(false);
    }
  }

  async function placeBid() {
    if (bidAmount < Number(product.basePrice)) {
      console.log(bidAmount);
      // console.log("Can't place a bid on amount lesser than the base price")
    } else {
      const docRef = doc(db, "products", document._key.path.segments[6]);
      // console.log("Doc Ref: ",docRef)

      if (bidAmount > Number(product.currentBid)) {
        await updateDoc(docRef, {
          currentBid: bidAmount,
          subscribers: arrayUnion(localUser.uid)
        });
        
      }
    }
  }
  useEffect(() => {
    setIsPending(true);

    async function getProductDetails() {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setDocument(doc);
        setProduct(doc.data());
        setIsPending(false);
        // console.log(doc.id, " => ", doc.data());
      });
    }
    getProductDetails().catch((err) => {
      setError(true);
      console.log(err.message);
    });

    // if (error) {
    //     console.log(error)
    // //   setTimeout(() => navigate("/"), 2000);
    // }
  }, [error, navigate, id, doc]);

  let errorClass = lesserAmount ? "error-field" : "";

  return (
    <div className="product-details-page">
      {error && <p className={`error`}>Could not fetch data</p>}
      {isPending && <p className={`loading`}>Loading...</p>}
      {product && (
        <div className="product-details">
          <h2 className={`page-title`}>Product Details</h2>
          <div className="basic-details">
            <div className="image-container">
              <img src={product.prodImage} alt={product.prodName} />
            </div>
            <div className="product-info">
              <div className="product-name">
                <h4>{product.prodName.toUpperCase()}</h4>
              </div>
              <div className="product-description">
                <h5 className="description-label">Description</h5>
                <p>{product.prodDescription}</p>
              </div>
              <div className="base-price">
                <h5 className="base-price-label">Base Price:</h5>
                <p className="base-price-amount">{product.basePrice}</p>
              </div>
              <div className="current-bid-price">
                <h5 className="current-bid-label">Highest Bid:</h5>
                {/* <p className="current-bid-price-amount">{product.currentBid}</p> */}
                <p className="current-bid-price-amount">{product.currentBid}</p>
              </div>

              <div className="bid-input">
                <div className="input-field">
                  <input
                    type="number"
                    name="bid-amount"
                    className={errorClass}
                    id="bidInput"
                    value={bidAmount}
                    onChange={(e) => checkBidAmount(e)}
                  />
                  {lesserAmount ? (
                    <div className="error-message">
                      Can't place a bid on amount lesser than the base price
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="bidding-btn-group">
                  <button className="decrement" onClick={decreaseBid}>
                    -
                  </button>
                  <button className="bid-input-btn" onClick={placeBid}>
                    Place a Bid
                  </button>
                  <button className="increment" onClick={increaseBid}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="product-timer">
            <Timer data={product} />
          </div>
        </div>
      )}
    </div>
  );
}
