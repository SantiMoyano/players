import { useState } from "react";

function PlayersManagement({ data }) {
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

      <ul>
        {data.map((el) => (
          <Player
            name={el.name}
            imageRoute={el.imageRoute}
            filter={filter}
          ></Player>
        ))}
      </ul>
    </section>
  );
}

function Player({ name, imageRoute, filter }) {
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
        <button>Editar</button>
        <button>Eliminar</button>
      </div>
    </li>
  );
}

export default PlayersManagement;
