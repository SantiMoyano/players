import { useState, useEffect } from "react";
import axios from "axios";

import CreateTag from "./CreateTag";
import TagsList from "./TagsList";

function TagsManagement() {
  const [toggled, setToggled] = useState(false);

  function handleClick() {
    setToggled(!toggled);
  }

  return (
    <section className="tags-management-container">
      <button onClick={handleClick}>
        <strong>{toggled ? "Crear un nuevo tag" : "Ver tags"}</strong>
      </button>

      {toggled ? <TagsList /> : <CreateTag />}
    </section>
  );
}

export default TagsManagement;
