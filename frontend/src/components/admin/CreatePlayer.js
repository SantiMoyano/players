import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MyDataContext from "../data/MyDataContext";

function CreatePlayer() {
  const { fetchTags, fetchPlayer, handleSubmitPlayer } =
    useContext(MyDataContext);

  // player info
  const { id } = useParams();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [playerData, setPlayerData] = useState([]);

  // tags info
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [myTagList, setMyTagList] = useState([]);

  const [updateMode, setUpdateMode] = useState(false);
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

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    getTags();
    if (id) {
      setUpdateMode(true);
      getPlayerData();
    }
  }, []);

  async function getTags() {
    const tags = await fetchTags();
    setTagList(tags);
    setMyTagList(tags);
  }

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
    if (updateMode) {
      changeMessage("Jugador actualizado con exito!", "limegreen");
    } else {
      changeMessage("Jugador creado con exito!", "limegreen");
    }
    resetInputs();
    setUpdateMode(false);
  }

  function changeMessage(message, color) {
    setMessage(message);
    setMessageColor(color);
    setTimeout(() => {
      setMessage("");
      setMessageColor("");
    }, 3000);
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
    const search = e.target.value;
    setMyTagList(
      tagList.filter(
        (tag) =>
          tag.tagName
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) &&
          !selectedTags.some((selectedTag) => selectedTag._id === tag._id)
      )
    );
  }

  function addTag(tagId) {
    // Busca la etiqueta correspondiente al tagId
    const tagToAdd = myTagList.find((tag) => tag._id === tagId);
    if (tagToAdd) {
      // Agrega la etiqueta al array selectedTags
      setSelectedTags([...selectedTags, tagToAdd]);
    }
    // Crea una nueva lista de tags que excluye el tag seleccionado
    const updatedTagList = myTagList.filter((tag) => tag._id !== tagId);
    // Actualiza la lista de tags disponibles
    setMyTagList(updatedTagList);
  }

  function deleteTagFromSelected(tag) {
    const updatedSelectedTags = selectedTags.filter(
      (selectedTag) => selectedTag._id !== tag._id
    );
    setSelectedTags(updatedSelectedTags);
    setMyTagList([...myTagList, tag]);
  }

  return (
    <section className="form-section">
      <h2>{updateMode ? "UPDATE PLAYER" : "CREATE PLAYER"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="tags-selector">
            <label>Tags:</label>
            <div className="tag-list">
              {selectedTags.map((tag) => (
                <div>
                  <span style={{ color: tag.tagColor }}>{tag.tagName}</span>
                  <span onClick={() => deleteTagFromSelected(tag)}>X</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              id="tags"
              placeholder="Ej. Barcelona, Delantero.."
              name="tags"
              onClick={handleChangeTags}
              onChange={handleChangeTags}
            />
          </div>
          <select onChange={(e) => addTag(e.target.value)}>
            {myTagList.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.tagName}
              </option>
            ))}
          </select>
        </div>
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
        <div>
          <span style={{ color: messageColor, fontWeight: "bold" }}>
            {message}
          </span>
        </div>
        <div className="button-submit">
          <button type="submit">
            {updateMode ? "UPDATE PLAYER" : "CREATE PLAYER"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePlayer;
