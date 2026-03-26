import Card from "./card/Cards";

function PostList() {
  const products = [
  { id: 1, price: 450, title: "Piko яблоко", image: "https://bahandi.kz/netcat_files/23/65/piko_apple_550x550.jpg" },
  { id: 2, price: 450, title: "Piko апельсин", image: "https://bahandi.kz/netcat_files/23/65/piko_orange_550x550.jpg" },
  { id: 3, price: 600, title: "Fuse tea персик", image: "https://bahandi.kz/netcat_files/23/65/fuse_tea_peach_550x550.jpg" },
  { id: 4, price: 600, title: "Fuse tea манго-ромашка", image: "https://bahandi.kz/netcat_files/23/65/fuse_tea_mango_chamomile_550x550.jpg" },
  { id: 5, price: 600, title: "Fanta 0.5 л", image: "https://bahandi.kz/netcat_files/23/65/fanta_550x550.jpg" },
  { id: 6, price: 950, title: "Coca-cola 1 л", image: "https://bahandi.kz/netcat_files/23/65/coca_cola_1_550x550.jpg"},
  { id: 7, price: 600, title: "Coca-cola 0.5 л", image: "https://bahandi.kz/netcat_files/23/65/coca_cola_0.5_550x550.jpg" },
  { id: 8, price: 400, title: "Bonaqua без газа", image: "https://bahandi.kz/netcat_files/23/65/bonaqua_550x550.jpg" },
  { id: 9, price: 600, title: "Компот Bahandi", image: "https://bahandi.kz/netcat_files/23/65/compote_550x550.jpg" },
  { id: 10, price: 450, title: "Айран", image: "https://bahandi.kz/netcat_files/23/65/ayran_550x550.jpg" },
  { id: 11, price: 600, title: "Fuse tea манго-ананас", image: "https://bahandi.kz/netcat_files/23/65/fuse_tea_mango_pineapple_550x550.jpg" },
  { id: 12, price: 600, title: "Coca-cola без сахара", image: "https://bahandi.kz/netcat_files/23/65/coca_cola_zero_0.5_550x550.jpg" },
  { id: 13, price: 800, title: "Schweppes мохито", image: "https://bahandi.kz/netcat_files/23/65/schweppes_mojito_550x550.jpg" },
  { id: 14, price: 800, title: "Schweppes имбирный эль", image: "https://bahandi.kz/netcat_files/23/65/schweppes_gingerale_550x550.jpg" },
  { id: 15, price: 600, title: "Sprite 0.5 л", image: "https://bahandi.kz/netcat_files/23/65/sprite_0.5_550x550.jpg" }
  ];
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