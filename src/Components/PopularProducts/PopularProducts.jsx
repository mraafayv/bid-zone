import "./PopularProducts.css";

import Card from "../Card/Card";
import Slider from "react-slick";
import { useAuth } from "../../hooks/useAuth";

import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy, limit, limitToLast } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function PopularProducts() {
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
  };

  const [cardsData, setCardsData] = useState([]);
  // const cardsData = [];

  useEffect(() => {
    const tempCards = [];

    const loadData = async () => {
      const first = query(
        collection(db, "products"),
        orderBy("prodName"),limit(8)
        
      );
      const documentSnapshots = await getDocs(first);
      documentSnapshots.forEach((doc)=>{

        tempCards.push(doc.data())
        console.log(doc.data())
      })
      // const querySnapshot = await getDocs(collection(db, "products"));
      // const tempCards = [];
      // querySnapshot.forEach((doc) => {
      //   tempCards.push(doc.data());
      // });
      setCardsData(tempCards);
    console.log("cardsData", tempCards)

    };
    loadData();
   

  }, []);

  return (
    <div className="popular-products-container">
      <div className="popular-section">
        <h1>Popular Products</h1>
        <Slider {...settings}>
          {cardsData &&
            cardsData.map((card, index) => {
              return <Card key={index} data={card} />;
            })}
        </Slider>

        {/* <div className="carousel">
          {cardsData &&
            cardsData.map((card, index) => {
              return <Card key={index} data={card} />;
            })}
        */}
      </div>
    </div>
  );
}
