import { useState, useContext } from "react";

import CreateTag from "./CreateTag";
import TagsList from "./TagsList";
import MyDataContext from "../data/MyDataContext";

function TagsManagement() {
  const { fetchTag } = useContext(MyDataContext);
  const [toggled, setToggled] = useState(false);
  const [updateTag, setUpdateTag] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagId, setTagId] = useState("");

  async function handleEdit(id) {
    const tagData = await fetchTag(id);
    setTagName(tagData.tagName);
    setUpdateTag(true);
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
    <section className="form-section">
      <button
        className="button-submit"
        onClick={() => {
          handleClick();
          handleUpdatedTag();
        }}
      >
        <strong>{toggled ? "Create a new tag" : "View tags"}</strong>
      </button>

      {!toggled ? <h2>Create a new tag</h2> : <h2>List of tags</h2>}

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
