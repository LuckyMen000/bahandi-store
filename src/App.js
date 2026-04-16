import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import ProductPage from "./Pages/ProductPage";
import Profile from "./Pages/ProfilePage";
import CartPage from "./Pages/CartPage";
import OrderPage from "./Pages/OrderPage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  return (
    <div>
      <Header isAuth={isAuth} cart={cart} />

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/product/:id" element={<ProductPage cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;