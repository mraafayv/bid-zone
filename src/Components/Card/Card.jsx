import "./Card.css";
import Timer from "../Timer/Timer";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  // console.log(props)

  return (
    <div className="card">
      <div className="image-container">
        <img src={data.prodImage} alt="product" />
      </div>
      <div className="card-content">
        <div className="product-name">
          <h3>{data.prodName}</h3>
        </div>
        <div className="current-bid">
          <h4 className="price-label">Base Price:</h4>
          <h4 className="amount">{data.basePrice}</h4>
        </div>

        <div className="location">
          <h4 className="location-label">Location: </h4>
          <h4 className="pin-location">Pakistan </h4>
        </div>
        <div className="card-footer">
          <button className="view-details-button">
            <Link to={`/productDetails/${data.prodID}`}>View Details</Link>
          </button>
        <Timer data={data} />

        </div>
      </div>
    </div>
  );
}
