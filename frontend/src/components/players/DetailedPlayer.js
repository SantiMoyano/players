import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../CONST";
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
    const res = await axios.get(url + "/api/players/" + id);
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
            <img src={playerData.gifUrl} alt="messi" />
          </figure>
          <h3>{`Trofeos ganados: ${playerData.trophies}`}</h3>
        </div>
      </main>
    </section>
  );
}

export default DetailedPlayer;
