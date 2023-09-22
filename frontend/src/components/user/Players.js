import { useState, useEffect } from "react";
import { useContext } from "react";
import MyDataContext from "../../MyDataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Player from "./Player";
import SortPlayers from "./SortPlayers";
import SearchPlayer from "./SearchPlayer.js";

function Players({ showFilter }) {
  const playerList = useContext(MyDataContext)[0];
  const filteredPlayerList = useContext(MyDataContext)[2];
  const setFilteredPlayerList = useContext(MyDataContext)[3];
  console.log(playerList);
  const navigate = useNavigate();

  function handleSearch(searchTerm) {
    const filteredPlayers = playerList.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayerList(filteredPlayers);
  }

  function handleSort() {
    const sortedPlayers = [...filteredPlayerList];
    sortedPlayers.sort((a, b) => b.score - a.score);
    setFilteredPlayerList(sortedPlayers);
  }

  function handleClick(playerId) {
    navigate("/players/" + playerId);
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
      {filteredPlayerList.length === 0 && (
        <span>"No se encontraron resultados :c"</span>
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

export default Players;
