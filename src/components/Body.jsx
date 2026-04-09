import PostList from "./PostList";
import { useSearchParams } from "react-router-dom";

function Body() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const categoryTitles = {
    drinks: "Напитки",
    burgers: "Бургеры",
    combo: "Комбо",
  };

  const title = categoryTitles[category] || "Все товары";

  return (
    <main className="body">
      <h1 className="body-title">{title}</h1>
      <PostList />
    </main>
  );
}

export default Body;