import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SearchPlayer from "../user/SearchPlayer";

function PlayersManagement({ data }) {
  const [filter, setFilter] = useState("default");
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const navigate = useNavigate();

  /*
   * TODO:
   * fetch players
   * agregar busqueda a mano
   * handle delete y update
   */

  useEffect(() => {
    fetchData();
  }, []);

  function handleSearch(searchTerm) {
    const filteredPlayers = playerList.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayerList(filteredPlayers);
  }

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:4000/api/players");
      setPlayerList(res.data);
      setFilteredPlayerList(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(playerId) {
    await axios.delete("http://localhost:4000/api/players/" + playerId);
    fetchData();
  }

  async function handleUpdate(playerId) {
    navigate("/create-player/" + playerId);
  }

  return (
    <section className="management-content">
      <div className="sort-players">
        <h2>Cambiar modo de listar:</h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="default">Con imagen</option>
          <option value="nameOnly">Solo nombre</option>
        </select>
      </div>
      <SearchPlayer handleSearch={handleSearch} />

      <ul>
        {filteredPlayerList.map((player) => (
          <Player
            key={player._id}
            name={player.name}
            imageRoute="./welcome.jpg"
            filter={filter}
            handleDelete={() => handleDelete(player._id)}
            handleUpdate={() => handleUpdate(player._id)}
          ></Player>
        ))}
      </ul>
    </section>
  );
}

function Player({ name, imageRoute, filter, handleDelete, handleUpdate }) {
  return (
    <li>
      {filter === "default" ? (
        <figure>
          <img src={imageRoute} alt={imageRoute} />
          <figcaption>{name}</figcaption>
        </figure>
      ) : (
        <div className="player-name">
          <span>{name}</span>
        </div>
      )}
      <div
        className={`manage-buttons ${
          filter !== "default" ? "align-buttons" : ""
        }`}
      >
        <button onClick={handleUpdate}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </li>
  );
}

export default PlayersManagement;
