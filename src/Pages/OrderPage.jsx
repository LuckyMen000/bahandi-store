import { useLocation, useNavigate, useParams } from "react-router-dom";

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const order =
    location.state?.order ||
    savedOrders.find((o) => String(o.id) === id);

  if (!order) {
    return (
      <div className="body">
        <h1 className="order-title">Заказ не найден</h1>
        <button
          className="order-back-btn"
          onClick={() => navigate("/profile")}
        >
          Назад
        </button>
      </div>
    );
  }

  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="body">
      <div className="order-container">
        <h1 className="order-title">Заказ #{order.id}</h1>

        {order.items.map((item) => (
          <div key={item.id} className="order-card">
            <div className="order-left">
              <span className="order-name">{item.title}</span>
              <span className="order-qty">
                Количество: {item.quantity}
              </span>
            </div>

            <div className="order-price">
              {item.price} ₸
            </div>
          </div>
        ))}

        <div className="order-total">
          Итого: {totalPrice} ₸
        </div>

        <button
          className="order-back-btn"
          onClick={() => navigate("/profile")}
        >
          Назад к профилю
        </button>
      </div>
    </div>
  );
}

export default OrderPage;