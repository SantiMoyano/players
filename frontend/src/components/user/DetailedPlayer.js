import { useState } from "react";
import { Link } from "react-router-dom";

import Position from "./Position";

function DetailedPlayer({ data }) {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <section className="detailed-player">
      <main>
        <section className="top-detailed-player">
          <h1>{data.name}</h1>
          {isAdmin ? <Link to="/create-player">Edit</Link> : ""}
          <span>
            <strong>{data.score}</strong>⭐
          </span>
        </section>
        <figure>
          <img src={data.imageRoute} alt={data.imageRoute} />
        </figure>

        <div className="player-content">
          <div className="tags">
            <div className="skill-list">
              {data.positions.map((el) => (
                <Position position={el} key={el + data.name} />
              ))}
            </div>
            <div className="skill-list">
              {data.teams.map((el) => (
                <Position position={el} key={el + data.name} />
              ))}
            </div>
          </div>

          <figure>
            <figcaption className="player-description">
              {data.description}
            </figcaption>
            <img src={data.gifRoute} alt={data.gifRoute} />
          </figure>
          <h2>{`Trofeos ganados: ${data.trophies}`}</h2>
        </div>
      </main>
    </section>
  );
}

export default DetailedPlayer;
