import "./AuctionCategory.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  
} from "firebase/firestore";

import Navbar from '../../Components/Navbar/Navbar'
import AuctionCard from "../../Components/AuctionCard/AuctionCard";

export default function AuctionCategory() {

    const [error, setError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [products, setProducts] = useState();
    
    const { id } = useParams();
    
    const q = query(collection(db, "products"), where("prodCategory", "==", id));
    
    
    useEffect(() => {
      let productCategoryArr = [];
    setIsPending(true);

    async function getProductDetails() {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        productCategoryArr.push(doc.data())
        // setProducts(doc.data());
        setIsPending(false);
        // console.log(doc.id, " => ", doc.data());
      });
    //   let unqueval = new Set(productCategoryArr);
    //   Object.values(unqueval)
    const key = 'prodID';

    productCategoryArr = [...new Map(productCategoryArr.map(item =>
      [item[key], item])).values()];
        setProducts(productCategoryArr)
    }
    getProductDetails().catch((err) => {
      setError(true);
      console.log(err.message);
    });

    // if (error) {
    //     console.log(error)
    // //   setTimeout(() => navigate("/"), 2000);
    // }
    // checkExpiryOfTimer();
  }, [error, id, doc]);


  return (
    // <div className="auction-category">
    //     <h1>{ id }</h1>
    //     {isPending && <div>Loading...</div>}
    //     {/* {error && <div>Could not fetch data</div>} */}
    //     {products && products.map(product => {
    //         return <AuctionCard data={product} key={product.prodID}/>
    //     })}
    // </div>

    <>
      <Navbar />
      <div className="auctions-category-page-container">
        <div className="auctions-page">
          <h1 className="page-title">{id}</h1>
          <div className="auction-content">
            {products && products.map(product => {
              // console.log(card)
              return <AuctionCard data={product} key={product.prodID}/>
            })}
          </div>
        </div>
      </div>
    </>
    );
}
