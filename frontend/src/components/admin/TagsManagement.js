import { useState } from "react";

function TagsManagement({ tags }) {
  const [toggled, setToggled] = useState(false);

  function handleClick() {
    setToggled(!toggled);
  }

  return (
    <section className="tags-management-container">
      <button onClick={handleClick}>
        <strong>{toggled ? "Crear un nuevo tag" : "Ver tags"}</strong>
      </button>

      {toggled ? (
        <>
          <SortTags /> <TagsList tags={tags} />
        </>
      ) : (
        <CreateTag />
      )}
    </section>
  );
}

function SortTags() {
  const [sortBy, setSortBy] = useState("input");

  if (sortBy === "positions") console.log("Mostrar solo posiciones");
  if (sortBy === "clubs") console.log("Mostrar solo clubes");

  return (
    <div className="sort-players">
      <h2>Mostrar solo:</h2>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="positions">Posiciones</option>
        <option value="clubs">Clubes</option>
      </select>
    </div>
  );
}

function TagsList({ tags }) {
  return (
    <ul>
      {tags.map((el) => (
        <Tags name={el.name} color={el.color} />
      ))}
    </ul>
  );
}

function Tags({ name, color }) {
  return (
    <li>
      <span>{name}</span>
      <span style={{ backgroundColor: color }}>{color}</span>
    </li>
  );
}

function CreateTag() {
  return (
    <form>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="score">Tipo de tag:</label>
        <select>
          <option value="position">Posición</option>
          <option value="club">Club</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Color:</label>
        <input type="color" id="colorPicker" />
      </div>
      <button type="submit">
        <strong>Crear Tag</strong>
      </button>
    </form>
  );
}

export default TagsManagement;
