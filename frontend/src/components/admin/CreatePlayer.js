import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MyDataContext from "../data/MyDataContext";

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
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [tagSearched, setTagSearched] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [playerData, setPlayerData] = useState([]);

  const data = {
    name,
    score,
    trophies,
    shortDescription,
    description,
    imageUrl,
    gifUrl,
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
    setImageUrl(playerData.imageUrl);
    setGifUrl(playerData.gifUrl);
    setShortDescription(playerData.shortDescription);
    setDescription(playerData.description);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleSubmitPlayer(data);
    resetInputs();
    setUpdateMode(false);
  }

  function resetInputs() {
    setName("");
    setScore(0);
    setTrophies(0);
    setShortDescription("");
    setDescription("");
    setImageUrl("");
    setGifUrl("");
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

  function handleChangeShortDescription(e) {
    setShortDescription(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeImageUrl(e) {
    setImageUrl(e.target.value);
  }

  function handleChangeGifUrl(e) {
    setGifUrl(e.target.value);
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
      <h2>{updateMode ? "UPDATE PLAYER" : "CREATE PLAYER"}</h2>
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
          <label htmlFor="description">
            Short description: (Max. 100 Chars.)
          </label>
          <textarea
            id="short-description"
            name="short-description"
            rows="4"
            defaultValue={playerData.shortDescription}
            onChange={handleChangeShortDescription}
          ></textarea>
        </div>
        <div>
          <label htmlFor="description">Description: (Min. 400 Chars.)</label>
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
        <div>
          <label htmlFor="name">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="name"
            defaultValue={playerData.imageUrl}
            onChange={handleChangeImageUrl}
            onPaste={handleChangeImageUrl}
          />
        </div>
        <div>
          <label htmlFor="name">Gif URL: (Optional)</label>
          <input
            type="text"
            id="gifUrl"
            name="name"
            defaultValue={playerData.gifUrl}
            onChange={handleChangeGifUrl}
            onPaste={handleChangeGifUrl}
          />
        </div>
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
