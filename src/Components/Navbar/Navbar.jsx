import Searchbar from "../Searchbar/Searchbar";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">BidZone</div>
        <Searchbar />
        <div className="user-avatar">
          <span>A</span>
        </div>
      </div>
    </div>
  );
}
