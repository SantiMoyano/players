import { useEffect, useState } from "react";
import { useContext } from "react";
import MyDataContext from "../../MyDataContext";

import SearchPlayer from "../user/SearchPlayer";

function PlayersManagement() {
  const {
    filteredPlayerList,
    handleDeletePlayer,
    handleUpdatePlayer,
    handleSearch,
  } = useContext(MyDataContext);
  const [filter, setFilter] = useState("default");

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
            handleDelete={() => handleDeletePlayer(player._id)}
            handleUpdate={() => handleUpdatePlayer(player._id)}
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
