import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MyDataContext from "../../MyDataContext";

function CreatePlayer() {
  const {
    tagList,
    fetchPlayer,
    avaibleTagList,
    setAvaibleTagList,
    handleSubmitPlayer,
  } = useContext(MyDataContext);

  const { id } = useParams();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [description, setDescription] = useState("");
  const [tagSearched, setTagSearched] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [playerData, setPlayerData] = useState([]);

  const data = {
    name,
    score,
    trophies,
    description,
    selectedTags,
    updateMode,
    id,
  };

  useEffect(() => {
    if (id) {
      setUpdateMode(true);
      getPlayerData();
    }
  }, []);

  async function getPlayerData() {
    const data = await fetchPlayer(id);
    setPlayerData(data);
    setName(playerData.name);
    setScore(playerData.score);
    setTrophies(playerData.trophies);
    setDescription(playerData.description);
  }

  function handleSubmit(e) {
    // The inputs are not resetting visually, but this issue is resolved by forcefully not using preventDefault.
    // e.preventDefault();
    handleSubmitPlayer(data);
    resetInputs();
    setUpdateMode(false);
  }

  function resetInputs() {
    setName("");
    setScore(0);
    setTrophies(0);
    setDescription("");
    setSelectedTags([]);
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
    setAvaibleTagList(
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
    const tagToAdd = avaibleTagList.find((tag) => tag._id === tagId);
    if (tagToAdd) {
      // Agrega la etiqueta al array selectedTags
      setSelectedTags([...selectedTags, tagToAdd]);
    }
    // Crea una nueva lista de tags que excluye el tag seleccionado
    const updatedTagList = avaibleTagList.filter((tag) => tag._id !== tagId);
    // Actualiza la lista de tags disponibles
    setAvaibleTagList(updatedTagList);
  }

  return (
    <section className="form-section">
      <h2>{updateMode ? "ACTUALIZAR JUGADOR" : "CREAR JUGADOR"}</h2>
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
          <div className="tags-selector">
            <label>Tags:</label>
            {selectedTags.map((tag) => (
              <span>{tag.tagName}</span>
            ))}
            <input
              type="text"
              id="tags"
              placeholder="Ej. Barcelona, Delantero.."
              name="tags"
              onChange={handleChangeTags}
            />
          </div>
          <select onChange={(e) => addTag(e.target.value)}>
            {avaibleTagList.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.tagName}
              </option>
            ))}
          </select>
        </div>

        {/* TODO: not implemented yet
         <div>
          <label htmlFor="image">IMAGEN:</label>
          <input type="file" id="image" name="image" accept="image/image" />
        </div>
        <div>
          <label htmlFor="gif">GIF: </label>
          <input type="file" id="gif" name="gif" accept="image/gif" />
        </div> */}
        <div className="button-submit">
          <button type="submit">
            {updateMode ? "ACTUALIZAR JUGADOR" : "CREAR JUGADOR"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePlayer;
