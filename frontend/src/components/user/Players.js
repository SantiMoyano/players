import { useState } from "react";
import { Navigate } from "react-router-dom";

import Player from "./Player";
import SearchPlayer from "./SearchPlayer.js";

function Players({ data, showFilter }) {
  const [navigate, setNavigate] = useState("");

  function handleNavigate() {
    setTimeout(function () {
      setNavigate("/players");
    }, 300);
  }

  return (
    <section className="players">
      {showFilter ? (
        <section className="players-searcher">
          <SortPlayers />
          <SearchPlayer />
        </section>
      ) : (
        <section className="view-more-players">
          <Navigate to={navigate} />
          <h2>Ultimos jugadores</h2>
          <button className="view-more-players-button" onClick={handleNavigate}>
            Ver mas jugadores
          </button>
        </section>
      )}
      <ul>
        {data.map((el) => (
          <Player
            name={el.name}
            imageRoute={el.imageRoute}
            positions={el.position}
            score={el.score}
            description={el.description}
            key={el.imageRoute}
          />
        ))}
      </ul>
    </section>
  );
}

function SortPlayers() {
  const [sortBy, setSortBy] = useState("input");

  if (sortBy === "input") console.log("Ordenar por orden de entrada");
  if (sortBy === "position") console.log("Ordenar por posicion");
  if (sortBy === "score") console.log("Ordenar por valoracion");

  return (
    <div className="sort-players">
      <h2>Ordenar jugadores por:</h2>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Orden de entrada</option>
        <option value="position">Posicion</option>
        <option value="score">Valoracion</option>
      </select>
    </div>
  );
}

export default Players;
