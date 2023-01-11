
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from './pages/Home/Home';
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Auction from "./pages/auction/Auction";
import AddProduct from './pages/AddProduct/AddProduct'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/addProduct" element={<AddProduct />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
