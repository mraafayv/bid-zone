import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import Navbar from "../../Components/Navbar/Navbar";
// import Timer from "../../Components/Timer/Timer";
import "./Auction.css";
import AuctionCard from "../../Components/AuctionCard/AuctionCard";

const Auction = () => {

    const [auctionList, setAuctionList] = useState([]) 


  useEffect(() => {
    const tempCards = [];

    const loadData = async () => {
      const first = query(
        collection(db, "products"),
        orderBy("createdAt")
        
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
      setAuctionList(tempCards);
    // console.log("cardsData", tempCards)

    };

    loadData();
   

  }, []);

  return (
    <>
      <Navbar />
      <div className="auctions-page-container">
        <div className="auctions-page">
          <h1 className="page-title">Auctions</h1>
          <div className="auction-content">
            {auctionList && auctionList.map(card => {
              // console.log(card)
              return <AuctionCard data={card} key={card.prodID}/>
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
