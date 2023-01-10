import "./HomeContent.css";
import auctionImage from "../../assets/auction2.jpg";

export default function HomeContent() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="intro-text">
          <h3>Welcome to BidZone!</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            voluptatibus quod iure suscipit error, nihil dicta repellendus
            ducimus libero commodi deleniti
          </p>
          <button>Get Started</button>
        </div>
        <img src={auctionImage} alt="Vector of auction" />
      </div>
    </div>
  );
}
