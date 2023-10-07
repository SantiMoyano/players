import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MyDataContext from "../data/MyDataContext";

import Position from "./Position";

function DetailedPlayer() {
  const { fetchPlayer } = useContext(MyDataContext);
  const [playerData, setPlayerData] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getPlayer();
  }, []);

  async function getPlayer() {
    const player = await fetchPlayer(id);
    setPlayerData({ ...player });
    const tagList = player.tags;
    setTags(tagList);
    if (player) setIsLoading(false);
  }

  return !isLoading ? (
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
  ) : (
    <section className="loading">
      <h2>. . .</h2>
    </section>
  );
}

export default DetailedPlayer;
