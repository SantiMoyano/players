import { useState } from "react";
import axios from "axios";

import CreateTag from "./CreateTag";
import TagsList from "./TagsList";

function TagsManagement() {
  const [toggled, setToggled] = useState(false);
  const [updateTag, setUpdateTag] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagId, setTagId] = useState("");

  async function handleEdit(id) {
    setUpdateTag(true);
    const res = await axios.get("http://localhost:4000/api/tags/" + id);
    setTagName(res.data.tagName);
    setTagId(id);
    setToggled(!toggled);
  }

  function handleUpdatedTag() {
    setUpdateTag(false);
    setTagId("");
    setTagName("");
    setToggled(!toggled);
  }

  function handleClick() {
    setToggled(!toggled);
  }

  return (
    <section className="tags-management-container">
      <button onClick={(handleClick, handleUpdatedTag)}>
        <strong>{toggled ? "Crear un nuevo tag" : "Ver tags"}</strong>
      </button>

      {toggled ? (
        <TagsList handleEdit={handleEdit} />
      ) : (
        <CreateTag
          handleUpdatedTag={handleUpdatedTag}
          updateTag={updateTag}
          tagNameEditing={tagName}
          id={tagId}
        />
      )}
    </section>
  );
}

export default TagsManagement;
