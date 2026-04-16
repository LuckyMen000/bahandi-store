import { useState, useEffect } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increase = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decrease = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(newCart);
  };

  const remove = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };
  const handleOrder = () => {
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );
    localStorage.removeItem("cart");
    setCart([]);
    alert("Заказ оформлен");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="body">
      <h1 className="body-title">Корзина</h1>

      <div className="cart-container">
        {cart.length === 0 ? (
          <p>Корзина пустая</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-top">
                  <span className="cart-title">{item.title}</span>
                  <span className="cart-price">
                    {item.price} ₸
                  </span>
                </div>

                <div className="cart-controls">
                  <button
                    className="cart-btn"
                    onClick={() => decrease(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="cart-btn"
                    onClick={() => increase(item.id)}
                  >
                    +
                  </button>

                  <button
                    className="cart-btn cart-remove"
                    onClick={() => remove(item.id)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              Итого: {totalPrice} ₸
            </div>

            <button
              className="cart-order-btn"
              onClick={handleOrder}
            >
              Оформить заказ
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;