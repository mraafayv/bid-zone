import React from "react";
import Timer from "../Timer/Timer";

import { Link } from "react-router-dom";
import "./AuctionCard.css"

export default function AuctionCard({ data }) {
  return (
    <Link to={`/productDetails/${data.prodID}`} id="auctionCardLink">
      
      <div className="auction-card">
        <div className="auction-info">
          <div className="upper">
            <h3 className="product-name">{data.prodName.toUpperCase()}</h3>
            <p className="product-description">{data.prodDescription}</p>
          </div>
          <div className="lower">
            <p className="product-location">
              <span>
                <i class="fa-solid fa-location-dot"></i>
              </span>{" "}
              Location
            </p>
          </div>
        </div>
        <div className="price-section">
          <h4>
            Base Price:{" "}
            <span className="base-price-label">Rs. {data.basePrice}</span>
          </h4>
          <h4>
            Current Bid:{" "}
            <span className="current-bid-label">{data.currentBid ? `Rs. ${data.currentBid}` : `N/A`}</span>
          </h4>
        </div>
        <div className="timer-section">
          <Timer data={data} />
        </div>
        {/* <div>Timer</div> */}
        {/* <Timer /> */}
      </div>
    </Link>
  );
}
