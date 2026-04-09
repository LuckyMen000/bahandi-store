import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card/Cards";
import { Link } from "react-router-dom";

function PostList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get("https://4bd84f8eea8b152e.mokky.dev/drinks");
        setProducts(response.data);
      } catch (error) {
        console.log("Ошибка при получении данных:", error);
      }
    };
    fetchDrinks();
  }, []);

  return (
    <div className="cards-container">
      {products.map((item) => (
      <Link 
        key={item.id} 
         to={`/product/${item.id}`} 
        state={{ product: item }}
      >
     <Card
      price={item.price}
      title={item.title}
      image={item.image}
    />
    </Link>
      ))}
    </div>
  );
}

export default PostList;