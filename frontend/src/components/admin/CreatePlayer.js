import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CreatePlayer() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [description, setDescription] = useState("");
  const [tagList, setTagsList] = useState([]);
  const [filterTagList, setFilterTagList] = useState([]);
  const [tagSearched, setTagSearched] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    if (id) {
      setUpdateMode(true);
      fetchPlayer();
      setName(playerData.name);
      setScore(playerData.score);
      setTrophies(playerData.trophies);
      setDescription(playerData.description);
    }
    fetchTags();
  }, []);

  async function fetchPlayer() {
    const res = await axios.get("http://localhost:4000/api/players/" + id);
    const player = res.data;
    setPlayerData({ ...player });
  }

  async function fetchTags() {
    try {
      const res = await axios.get("http://localhost:4000/api/tags");
      setTagsList(res.data);
      setFilterTagList(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const tags = selectedTags.map((tag) => tag._id);
    if (!updateMode) {
      await axios.post("http://localhost:4000/api/players", {
        name,
        score,
        trophies,
        description,
        tags,
      });
      alert("jugador creado!");
    } else {
      await axios.put("http://localhost:4000/api/players/" + id, {
        name,
        score,
        trophies,
        description,
        tags,
      });
      setUpdateMode(false);
      alert("jugador actualizado!");
    }
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeScore(e) {
    setScore(e.target.value);
  }

  function handleChangeTrophies(e) {
    setTrophies(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeTags(e) {
    setTagSearched(e.target.value);
    setFilterTagList(
      tagList.filter((tag) =>
        tag.tagName
          .toLocaleLowerCase()
          .includes(tagSearched.toLocaleLowerCase())
      ),
      false
    );
  }

  function addTag(tagId) {
    // Busca la etiqueta correspondiente al tagId
    const tagToAdd = filterTagList.find((tag) => tag._id === tagId);

    if (tagToAdd) {
      // Agrega la etiqueta al array selectedTags
      setSelectedTags([...selectedTags, tagToAdd]);
    }

    // Crea una nueva lista de tags que excluye el tag seleccionado
    const updatedTagList = filterTagList.filter((tag) => tag._id !== tagId);

    // Actualiza la lista de tags disponibles
    setFilterTagList(updatedTagList);
  }

  return (
    <section className="create-player-content">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={playerData.name}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <label htmlFor="score">Score:</label>
          <input
            type="number"
            id="score"
            name="score"
            defaultValue={playerData.score}
            onChange={handleChangeScore}
          />
        </div>
        <div>
          <label htmlFor="trophy">Trophies:</label>
          <input
            type="number"
            id="trophy"
            name="trophy"
            defaultValue={playerData.trophies}
            onChange={handleChangeTrophies}
          />
        </div>
        <div>
          <label htmlFor="image">IMAGEN:</label>
          <input type="file" id="image" name="image" accept="image/image" />
        </div>
        <div>
          <label htmlFor="gif">GIF: </label>
          <input type="file" id="gif" name="gif" accept="image/gif" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            defaultValue={playerData.description}
            onChange={handleChangeDescription}
          ></textarea>
        </div>
        <div>
          <div>
            <label htmlFor="tags">Tags:</label>
            {selectedTags.map((tag) => (
              <span>{tag.tagName}</span>
            ))}
          </div>
          <input
            type="text"
            id="tags"
            name="tags"
            onChange={handleChangeTags}
          />
          <select onChange={(e) => addTag(e.target.value)}>
            {filterTagList.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.tagName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">
          {updateMode ? "ACTUALIZAR JUGADOR" : "CREAR JUGADOR"}
        </button>
      </form>
    </section>
  );
}

export default CreatePlayer;
