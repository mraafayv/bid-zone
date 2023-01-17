import "./NotificationCard.css";
import { Link } from "react-router-dom";

export default function NotificationCard({ data }) {
  return (
    // <Link to={`/productDetails/${data.prodID}`}>
      <div className="notification-card">
        <p className="notification-text">{data}</p>
      </div>
    // </Link>
  );
}
