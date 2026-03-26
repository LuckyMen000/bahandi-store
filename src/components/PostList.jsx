import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card/Cards";

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
        <Card
          key={item.id}
          price={item.price}
          title={item.title}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default PostList;