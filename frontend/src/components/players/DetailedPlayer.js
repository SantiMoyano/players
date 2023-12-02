import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MyDataContext from "../data/MyDataContext";

import Position from "./Position";

function DetailedPlayer() {
  const {
    fetchPlayer,
    isLogged,
    handleAddFavouritePlayer,
    handleRemoveFavouritePlayer,
    handleGetUser,
  } = useContext(MyDataContext);
  const [playerData, setPlayerData] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getPlayer();
    getUserData();
  }, [isFavourite]);

  async function getUserData() {
    const userData = await handleGetUser();
    //Verifica si el jugador mostrado es favorito
    if (!userData.favouritePlayers.includes(id)) {
      setIsFavourite(true);
    }
  }

  async function handleAddFavourite() {
    await handleAddFavouritePlayer(id);
    setIsFavourite(false);
  }

  async function handleRemoveFavourite() {
    await handleRemoveFavouritePlayer(id);
    setIsFavourite(true);
  }

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
        {/*  if user is logged and displayed player is favourite or not */}
        {isLogged & isFavourite && (
          <div className="add-fav-player">
            <button onClick={handleAddFavourite}>
              Agregar como favorito ⭐
            </button>
          </div>
        )}
        {isLogged & !isFavourite && (
          <div className="add-fav-player">
            <button onClick={handleRemoveFavourite}>
              Quitar de mis favoritos ⭐
            </button>
          </div>
        )}

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
