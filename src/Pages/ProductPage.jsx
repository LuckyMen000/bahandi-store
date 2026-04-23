import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function ProductPage({ cart, setCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(location.state?.product || null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductAndComments = async () => {
      try {
        let currentProduct = product;

        // если зашли напрямую по ссылке /product/:id
        // а state не передался — подгружаем товар отдельно
        if (!currentProduct) {
          const productResponse = await axios.get(
            `https://4bd84f8eea8b152e.mokky.dev/bahandi-menu/${id}`
          );
          currentProduct = productResponse.data;
          setProduct(currentProduct);
        }

        const commentsResponse = await axios.get(
          `https://4bd84f8eea8b152e.mokky.dev/comments?productId=${currentProduct.id}`
        );

        const cleanComments = commentsResponse.data.filter(
          (comment) => comment.text && comment.text.trim() !== ""
        );

        setComments(cleanComments);
      } catch (error) {
        console.log("Ошибка загрузки товара или комментариев:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndComments();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const newComment = {
        productId: product.id,
        text: commentText.trim(),
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(
        "https://4bd84f8eea8b152e.mokky.dev/comments",
        newComment
      );

      setComments((prev) => [...prev, response.data]);
      setCommentText("");
    } catch (error) {
      console.log("Ошибка при добавлении комментария:", error);
    }
  };

  if (loading) {
    return <div className="product-page">Загрузка...</div>;
  }

  if (!product) {
    return (
      <div className="product-page">
        <div className="product-card">
          <h2>Товар не найден</h2>
          <button className="product-button" onClick={() => navigate("/")}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-card">
        <Link to="/" className="product-back">
          ← Назад
        </Link>

        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">{product.price} ₸</p>

          <button className="product-button" onClick={addToCart}>
            Купить
          </button>

          <div className="product-comments">
            <h3>Комментарии ({comments.length})</h3>

            <div className="comment-form">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите комментарий..."
                className="comment-input"
              />
              <button
                className="product-button"
                onClick={handleAddComment}
              >
                Отправить
              </button>
            </div>

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <p>{comment.text}</p>
                  </div>
                ))
              ) : (
                <p>Комментариев пока нет</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;