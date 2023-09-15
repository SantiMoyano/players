import { useState } from "react";
import axios from "axios";

function CreateTag() {
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagType, setTagType] = useState("position");

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/tags", {
      tagName: tagName,
      tagColor: tagColor,
      tagType: tagType,
    });
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
        <strong>Crear Tag</strong>
      </button>
    </form>
  );
}

export default CreateTag;
