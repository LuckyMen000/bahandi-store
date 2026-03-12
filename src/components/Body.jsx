import Cards from "./card/Cards";

function Body() {
  return (
    <main className="body">
      <h1 className="body-title">Напитки</h1>
      <div className="cards-container">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </main>
  );
}

export default Body;