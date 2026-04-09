import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import ProductPage from "./Pages/ProductPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
        <Header/>
        <Routes>
            <Route path="/" element={<Body />}/>
            <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
