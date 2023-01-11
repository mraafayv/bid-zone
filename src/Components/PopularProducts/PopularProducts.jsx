import './PopularProducts.css'

import Card from '../Card/Card'

import { db } from '../../firebase/config'
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function PopularProducts() {

  // const [cardData, setCardData] = useState({})
  const cardsData = [];
  

 useEffect(() => {
  
  const loadData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    cardsData.push(Object.assign(doc.data(), {prodID: doc.id}))
    console.log(doc.id, " => ", doc.data());
  });
  }


  loadData();

}, [])

  return (
    <div className="popular-products-container">
      <div className="popular-section">
        <h1>Popular Products</h1>
        <div className="carousel">
          
        {console.log(cardsData)}

          
          {cardsData.map(card => {
            console.log("CARD",card)
            return <Card prodName={card.prodName} prodImage={card.prodImage}/>
            // return (<h1>Card</h1>)
          })} 
        {/* <Card /> 
        <Card /> 
        <Card /> 
        <Card />  */}

        </div>
      </div>
    </div>
  )
}
