import './PopularProducts.css'

import Card from '../Card/Card'

import { db } from '../../firebase/config'
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function PopularProducts() {

  const [cardsData, setCardsData] = useState([])
  // const cardsData = [];
  

 useEffect(() => {
  
  const loadData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setCardsData(prevData => [...prevData, doc.data()])
    
    // console.log(doc.id, " => ", doc.data());
  });
}

// setCardData(cardsData)

loadData();

}, [])

  return (
    <div className="popular-products-container">
      <div className="popular-section">
        <h1>Popular Products</h1>
        <div className="carousel">
          
        {console.log(cardsData)}

          
         {cardsData.map(card => {
          return <Card data={card}/>
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
