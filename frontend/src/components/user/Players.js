import { useState, useEffect } from "react";
import axios from "axios";

import Player from "./Player";
import SearchPlayer from "./SearchPlayer.js";

function Players({ showFilter }) {
  const [playerSearched, setPlayerSearched] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:4000/api/players");
      setPlayerList(res.data);
      setFilteredPlayerList(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleSearch(searchTerm) {
    const filteredPlayers = playerList.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayerList(filteredPlayers);
  }

  function handleClick(playerId) {
    console.log(playerId);
  }

  function handleSort() {
    const sortedPlayers = [...filteredPlayerList];
    sortedPlayers.sort((a, b) => b.score - a.score);
    setFilteredPlayerList(sortedPlayers);
  }

  return (
    <section className="players">
      {showFilter ? (
        <section className="players-searcher">
          <SortPlayers handleSort={handleSort} />
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
      <ul>
        {filteredPlayerList.map((el) => (
          <Player
            key={el._id}
            name={el.name}
            imageRoute="./welcome.jpg"
            positions={el.tags}
            score={el.score}
            description={el.description}
            handleClick={() => handleClick(el._id)}
          />
        ))}
      </ul>
    </section>
  );
}

function SortPlayers({ handleSort }) {
  const [sortBy, setSortBy] = useState("input");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSortBy(selectedValue);
    if (selectedValue === "score") {
      handleSort();
    }
  };

  return (
    <div className="sort-players">
      <h2>Ordenar jugadores por:</h2>
      <select value={sortBy} onChange={handleSelectChange}>
        <option value="input">Orden de entrada</option>
        <option value="position">Posicion</option>
        <option value="score">Valoracion</option>
      </select>
    </div>
  );
}

export default Players;
