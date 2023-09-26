import Players from "../players/Players";
import SearchPlayer from "../players/SearchPlayer";

function Content({ players }) {
  return (
    <main>
      <section className="welcome">
        <img src="cristiano-ronaldo.jpg" alt="bichu" />
        <div className="welcome-content">
          <h1>PLAYERS APP</h1>
          <h3>Busca info de tus jugadores favoritos aca!</h3>
          <SearchPlayer />
        </div>
      </section>
      <Players data={players}></Players>
    </main>
  );
}

export default Content;
