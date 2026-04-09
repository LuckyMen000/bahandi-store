import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card/Cards";
import { Link, useSearchParams } from "react-router-dom";

function PostList() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://4bd84f8eea8b152e.mokky.dev/bahandi-menu";

        if (category) {
          url += `?category=${category}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.log("Ошибка при получении данных:", error);
      }
    };

    fetchProducts();
  }, [category]);

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