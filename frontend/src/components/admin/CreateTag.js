import { useState, useEffect, useContext } from "react";
import MyDataContext from "../data/MyDataContext";

function CreateTag({ handleUpdatedTag, updateTag, tagNameEditing, id }) {
  const { handleSubmitTag, fetchTag } = useContext(MyDataContext);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagType, setTagType] = useState("position");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const data = { tagName, tagColor, tagType, updateTag, id };

  useEffect(() => {
    if (updateTag) {
      getTagData();
    }
  }, [id]);

  async function getTagData() {
    const data = await fetchTag(id);
    setTagName(data.tagName);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitTag(data);
    if (updateTag) {
      changeMessage("Tag updated successfully!", "limegreen");
    } else {
      changeMessage("Tag created successfully!", "limegreen");
    }
    setTimeout(() => {
      handleUpdatedTag();
    }, 2000);
  }

  function changeMessage(message, color) {
    setMessage(message);
    setMessageColor(color);
    setTimeout(() => {
      setMessage("");
      setMessageColor("");
    }, 2000);
  }

  function handleChangeUsername(e) {
    setTagName(e.target.value.toUpperCase()); // Convert to uppercase
  }

  function handleChangeColor(e) {
    setTagColor(e.target.value);
  }

  function handleSelectType(e) {
    setTagType(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={tagNameEditing}
          onChange={handleChangeUsername}
        />
      </div>
      <div>
        <label htmlFor="score">Tag Type:</label>
        <select onChange={handleSelectType}>
          <option value="position">Position</option>
          <option value="club">Club</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Color:</label>
        <input type="color" id="colorPicker" onChange={handleChangeColor} />
      </div>
      <div>
        <span style={{ color: messageColor, fontWeight: "bold" }}>
          {message}
        </span>
      </div>
      <div className="button-submit">
        <button type="submit">
          <strong>{!updateTag ? "Create Tag" : "Update Tag"}</strong>
        </button>
      </div>
    </form>
  );
}

export default CreateTag;
