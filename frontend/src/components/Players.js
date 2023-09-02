import Player from "./Player";
import { useState } from "react";

function Players({ data }) {
  return (
    <section className="players">
      <SortPlayers />
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
