
import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from './pages/Home/Home';
import SignUp3 from './pages/signup/Signup3'
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Auction from "./pages/auction/Auction";
import AddProduct from './pages/AddProduct/AddProduct'
import Notification from "./pages/notification/notification";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AuctionCategory from "./pages/AunctionCategory/AuctionCategory";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp3 />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/productDetails/:id" element={<ProductDetails />}></Route>
          <Route path="/auction/:id" element={<AuctionCategory />}></Route>


        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
