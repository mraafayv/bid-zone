import "./PopularProducts.css";

import Card from "../Card/Card";
import Slider from "react-slick";
import { useAuth } from "../../hooks/useAuth";
import Searchbar from "../Searchbar/Searchbar";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  limitToLast,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export default function PopularProducts() {
  const [cardsData, setCardsData] = useState([]);

  const { search } = useAuth();
  console.log("search", search);
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

  // const cardsData = [];

  useEffect(() => {
    const tempCards = [];
    const loadData = async () => {
      const first = query(
        collection(db, "products"),
        orderBy("basePrice", "desc"),
        limit(8)
      );
      const documentSnapshots = await getDocs(first);
<<<<<<< HEAD
      documentSnapshots.forEach((doc)=>{

        tempCards.push(doc.data())
        // console.log(doc.data())
      })
      // const querySnapshot = await getDocs(collection(db, "products"));
      // const tempCards = [];
      // querySnapshot.forEach((doc) => {
      //   tempCards.push(doc.data());
      // });
      setCardsData(tempCards);
      // console.log("cardsData", tempCards)

=======
      documentSnapshots.forEach((doc) => {
        tempCards.push(doc.data());
        console.log(doc.data());
      });
      setCardsData(tempCards);
      console.log("cardsData", tempCards);
>>>>>>> 4b83e9b5c706279e870dcdaa57cbf35a976eae8d
    };
    // const SearchData = () => {
    //   if (search.length > 0) {
    //     // const str = search.charAt(0).toUpperCase() + search.slice(1);
    //     const str = search.toLowerCase();
    //     let getData = cardsData.filter((data) => {
    //       return (
    //         data.prodName.toLowerCase().match(str) ||
    //         data.prodCategory.toLowerCase().match(str)
    //       );
    //     });
    //     setCardsData(getData);
    //   } else if (search.length == 0) {
    //     setCardsData(cardsData);
    //   }
    // };

<<<<<<< HEAD
=======
    // SearchData();
    loadData();
>>>>>>> 4b83e9b5c706279e870dcdaa57cbf35a976eae8d
  }, []);

  return (
    <div className="popular-products-container">
      <div className="popular-section">
     

        <h1>Popular Products
        </h1>
      
        <Searchbar />
        
        <div className="popular-carousel">
          {cardsData &&
            cardsData
              .filter((data) => {
                return (
                  data.prodName.toLowerCase().match(search.toLowerCase()) ||
                  data.prodCategory.toLowerCase().match(search.toLowerCase())
                );
              })
              .map((card, index) => {
                return <Card key={index} data={card} />;
              })}
              </div>

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
