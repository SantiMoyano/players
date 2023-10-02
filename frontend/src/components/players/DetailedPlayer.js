import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Position from "./Position";

function DetailedPlayer() {
  const [playerData, setPlayerData] = useState([]);
  const [tags, setTags] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchPlayer();
  }, []);

  async function fetchPlayer() {
    const res = await axios.get("http://localhost:4000/api/players/" + id);
    const player = res.data;
    setPlayerData({ ...player });
    const tagList = player.tags;
    setTags(tagList);
  }

  return (
    <section className="detailed-player">
      <main>
        <section className="top-detailed-player">
          <h1>{playerData.name}</h1>
          <span>
            <strong>{playerData.score}</strong>⭐
          </span>
        </section>
        <figure>
          <img src={playerData.imageUrl} alt="data" />
        </figure>

        <div className="player-content">
          <div className="tags">
            <div className="skill-list">
              {tags.map((el) => (
                <Position position={el} key={el} />
              ))}
            </div>
          </div>

          <figure>
            <figcaption className="player-description">
              {playerData.description}
            </figcaption>
            <img src="../ankaramessi-barcelona.gif" alt="messi" />
          </figure>
          <h2>{`Trofeos ganados: ${playerData.trophies}`}</h2>
        </div>
      </main>
    </section>
  );
}

export default DetailedPlayer;
