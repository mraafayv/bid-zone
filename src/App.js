import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
import Auction from "./pages/auction/Auction";
import SignUp3 from "./pages/signup/Signup3";
// import AddProduct from './pages/AddProduct/AddProduct'

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
