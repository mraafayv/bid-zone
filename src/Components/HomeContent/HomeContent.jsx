import "./HomeContent.css";
import auctionImage from "../../assets/auction2.jpg";

export default function HomeContent() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="intro-text">
          <h3>Welcome to BidZone!</h3>
          <p>
          BidZone allows you to sell and bid on items from the comfort of your home or office. 
          Purchase or sell things like real estate, jewels, business equipment, vehicles, and electronics. 
          BidZone offers protection for both buyers and sellers.
          </p>
          <button>Get Started</button>
        </div>
        <img src={auctionImage} alt="Vector of auction" />
      </div>
    </div>
  );
}
