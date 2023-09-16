import { useState } from "react";
import axios from "axios";

function CreateTag({ handleUpdatedTag, updateTag, tagNameEditing, id }) {
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagType, setTagType] = useState("position");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!updateTag) {
      await axios.post("http://localhost:4000/api/tags", {
        tagName: tagName,
        tagColor: tagColor,
        tagType: tagType,
      });
    } else {
      await axios.put("http://localhost:4000/api/tags/" + id, {
        tagName: tagName,
        tagColor: tagColor,
        tagType: tagType,
      });
      handleUpdatedTag();
    }
  }

  function handleChangeUsername(e) {
    setTagName(e.target.value);
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
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={tagNameEditing}
          onChange={handleChangeUsername}
        />
      </div>
      <div>
        <label htmlFor="score">Tipo de tag:</label>
        <select onChange={handleSelectType}>
          <option value="position">Posición</option>
          <option value="club">Club</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Color:</label>
        <input type="color" id="colorPicker" onChange={handleChangeColor} />
      </div>
      <button type="submit">
        <strong>{!updateTag ? "Crear Tag" : "Actualizar Tag"}</strong>
      </button>
    </form>
  );
}

export default CreateTag;
