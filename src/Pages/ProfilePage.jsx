import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "https://4bd84f8eea8b152e.mokky.dev/auth_me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
      } catch (err) {
        localStorage.removeItem("token");
        setError("Не удалось загрузить профиль");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Загрузка профиля...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Ошибка</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card profile-card-wide">
        <div className="profile-avatar">
          {user?.email?.charAt(0).toUpperCase()}
        </div>

        <h2>Мой профиль</h2>

        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user?.email}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">ID</span>
            <span className="profile-value">{user?.id}</span>
          </div>
        </div>

        <div className="profile-orders">
          <h3 className="profile-orders-title">Мои заказы</h3>

          {orders.length > 0 ? (
            <div className="profile-orders-list">
              {orders.map((order, index) => {
                const totalPrice = order.items
                  ? order.items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )
                  : 0;

                const totalQuantity = order.items
                  ? order.items.reduce((sum, item) => sum + item.quantity, 0)
                  : 0;

                return (
                  <div className="profile-order-card" key={order.id || index}>
                    <div className="profile-order-top">
                      <span className="profile-order-name">
                        Заказ #{index + 1}
                      </span>

                      <span className="profile-order-price">
                        {totalPrice} ₸
                      </span>
                    </div>

                    <div className="profile-order-meta">
                      Количество товаров: {totalQuantity}
                    </div>

                    {order.date && (
                      <div className="profile-order-meta">
                        Дата: {order.date}
                      </div>
                    )}

                    <div className="profile-order-actions">
                      <button
                        className="profile-btn secondary"
                        onClick={() =>
                          navigate(`/order/${order.id}`, {
                            state: { order },
                          })
                        }
                      >
                        Посмотреть
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="profile-orders-empty">
              У вас пока нет заказов
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button
            className="profile-btn secondary"
            onClick={() => navigate("/")}
          >
            На главную
          </button>

          <button className="profile-btn danger" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;