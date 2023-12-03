import { useState, useEffect } from "react";
import { useContext } from "react";
import MyDataContext from "../data/MyDataContext";
import { useNavigate } from "react-router-dom";

import Player from "./Player";
import SortPlayers from "./SortPlayers";
import SearchPlayer from "./SearchPlayer.js";

function Players({ showFilter, showFirstFive }) {
  const { filteredPlayerList, handleSortByScore, handleSearch } =
    useContext(MyDataContext);
  const navigate = useNavigate();
  const [playerList, setPlayerList] = useState([]);

  function handlePlayerClicked(playerId) {
    navigate("/players/" + playerId);
  }

  useEffect(() => {
    getPlayers();
  }, [filteredPlayerList]);

  async function getPlayers() {
    const players = await filteredPlayerList;
    setPlayerList(players);
    if (showFirstFive) {
      setPlayerList(players.slice(0, 5));
    }
  }

  return (
    <section className="players">
      {showFilter ? (
        <section className="players-searcher">
          <SortPlayers handleSortByScore={handleSortByScore} />
          <SearchPlayer handleSearch={handleSearch} />
        </section>
      ) : (
        <section className="view-more-players">
          <h2>Ultimos jugadores</h2>
          <button className="view-more-players-button">
            Ver mas jugadores
          </button>
        </section>
      )}
      {filteredPlayerList.length === 0 && (
        <span>"No se encontraron resultados :c"</span>
      )}
      <ul>
        {playerList.map((el) => (
          <>
            <Player
              key={el._id}
              name={el.name}
              imageUrl={el.imageUrl}
              positions={el.tags}
              score={el.score}
              description={el.shortDescription}
              handleClick={() => handlePlayerClicked(el._id)}
            />
            <hr style={{ borderColor: "#636363" }} />
          </>
        ))}
      </ul>
    </section>
  );
}

export default Players;
