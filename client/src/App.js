import "./App.css";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Cart from "./pages/view cart/Cart";
import Details from "./pages/details/Details";
import Checkout from "./pages/checkout/Checkout";
import Successful from "./pages/successful/Successful";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/viewcart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/successful" element={<Successful />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
