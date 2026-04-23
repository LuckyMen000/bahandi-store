import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card/Cards";
import { Link, useSearchParams } from "react-router-dom";

function PostList() {
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category")?.trim();

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
        console.log("Ошибка загрузки товаров:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://4bd84f8eea8b152e.mokky.dev/comments"
        );

        // убираем пустые комментарии
        const cleanComments = response.data.filter(
          (comment) =>
            comment.text &&
            comment.text.trim() !== ""
        );

        setComments(cleanComments);
      } catch (error) {
        console.log("Ошибка загрузки комментариев:", error);
      }
    };

    fetchProducts();
    fetchComments();
  }, [category]);

  return (
    <div className="cards-container">
      {products.map((item) => {
        const productComments = comments.filter(
          (comment) => comment.productId === item.id
        );

        return (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            state={{ product: item }}
          >
            <Card
              title={item.title}
              price={item.price}
              image={item.image}
              commentsCount={productComments.length}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default PostList;