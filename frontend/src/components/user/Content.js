import { useContext } from "react";
import Players from "../players/Players";
import SearchPlayer from "../players/SearchPlayer";
import MyDataContext from "../data/MyDataContext";

function Content({ players }) {
  const { handleSearch } = useContext(MyDataContext);
  let originalPlayers = [];

  if (players) {
    originalPlayers = [...players];
  }

  return (
    <main>
      <section className="welcome">
        <img src="cristiano-ronaldo.jpg" alt="bichu" />
        <div className="welcome-content">
          <h1>PLAYERS APP</h1>
          <h3>Busca info de tus jugadores favoritos aca!</h3>
          <SearchPlayer handleSearch={handleSearch} />
        </div>
      </section>
      <Players showFirstFive={true}></Players>
    </main>
  );
}

export default Content;
