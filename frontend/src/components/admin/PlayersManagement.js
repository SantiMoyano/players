import { useEffect, useState, useContext } from "react";
import MyDataContext from "../data/MyDataContext";
import PencilIcon from "../user/icons/pencil";
import CloseIcon from "../user/icons/close";

import SearchPlayer from "../players/SearchPlayer";

function PlayersManagement() {
  const {
    filteredPlayerList,
    handleDeletePlayer,
    handleUpdatePlayer,
    handleSearch,
  } = useContext(MyDataContext);
  const [filter, setFilter] = useState("default");
  const [message, setMessage] = useState("");

  function handleDeleteButton() {
    setMessage("You have to be an administrator to do this.");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  return (
    <section className="management-content">
      <div className="sort-players">
        <h2>Change listing mode:</h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="default">With Image</option>
          <option value="nameOnly">Name Only</option>
        </select>
      </div>
      <SearchPlayer handleSearch={handleSearch} />

      <p>{message}</p>

      <ul>
        {filteredPlayerList.map((player) => (
          <Player
            key={player._id}
            name={player.name}
            imageUrl={player.imageUrl}
            filter={filter}
            handleDelete={() => handleDeletePlayer(player._id)}
            handleUpdate={() => handleUpdatePlayer(player._id)}
            handleDeleteButton={handleDeleteButton}
          ></Player>
        ))}
      </ul>
    </section>
  );
}

function Player({
  name,
  imageUrl,
  filter,
  handleDelete,
  handleUpdate,
  handleDeleteButton,
}) {
  return (
    <>
      <li>
        {filter === "default" ? (
          <figure>
            <img src={imageUrl} alt={name} />
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
          <button onClick={handleUpdate}>
            <PencilIcon />
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={handleDeleteButton}
          >
            <CloseIcon />
          </button>
        </div>
      </li>
      <hr />
    </>
  );
}

export default PlayersManagement;
