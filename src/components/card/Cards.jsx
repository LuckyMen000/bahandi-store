function Card({ price, title, image }) {
  return (
    <div className="card">
      <div className="card-image-box">
        <img
          src={image}
          alt={title}
          className="card-image"
        />
      </div>

      <h2 className="card-price">{price} ₸</h2>
      <p className="card-title">{title}</p>

      <button className="card-button">
        В корзину
      </button>
    </div>
  );
}

export default Card;