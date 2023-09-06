import Position from "./Position";
import { useState } from "react";

function DetailedPlayer({ data }) {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <section className="detailed-player">
      <header>
        <h2>{data.name}</h2>
        {isAdmin ? <span>Edit</span> : ""}
        <span>
          <strong>{data.score}</strong>⭐
        </span>
      </header>

      <main>
        <figure>
          <img src={data.imageRoute} alt={data.imageRoute} />
        </figure>

        <div className="player-content">
          <h2>Positions</h2>
          <div className="skill-list">
            {data.positions.map((el) => (
              <Position position={el} key={el + data.name} />
            ))}
          </div>
          <h2>Teams</h2>
          <div className="skill-list">
            {data.teams.map((el) => (
              <Position position={el} key={el + data.name} />
            ))}
          </div>
          <h2>{`Trofeos ganados: ${data.trophies}`}</h2>
        </div>
        <figure>
          <img src={data.gifRoute} alt={data.gifRoute} />
          <figcaption className="player-description">
            {data.description}
          </figcaption>
        </figure>
      </main>
    </section>
  );
}

export default DetailedPlayer;
