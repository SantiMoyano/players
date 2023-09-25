import { useState, useContext } from "react";
import MyDataContext from "../../MyDataContext";

function TagsList({ handleEdit }) {
  const { tagList, handleDeleteTag } = useContext(MyDataContext);
  const [selectedFilter, setSelectedFilter] = useState("position");

  function handleFilterChange(value) {
    setSelectedFilter(value);
  }

  const filteredList = tagList.filter((tag) => tag.tagType === selectedFilter);

  return (
    <>
      <SortTags
        handleFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      />
      <ul>
        {filteredList.map((el) => (
          <Tag
            key={el._id}
            name={el.tagName}
            color={el.tagColor}
            handleEdit={() => handleEdit(el._id)}
            handleDelete={() => handleDeleteTag(el._id)}
          />
        ))}
      </ul>
    </>
  );
}

function SortTags({ handleFilterChange, selectedFilter }) {
  return (
    <div className="sort-players">
      <h2>Mostrar solo:</h2>
      <select
        onChange={(e) => handleFilterChange(e.target.value)}
        value={selectedFilter}
      >
        <option value="position">Posiciones</option>
        <option value="club">Clubes</option>
      </select>
    </div>
  );
}

function Tag({ name, color, handleDelete, handleEdit }) {
  return (
    <li>
      <span>{name}</span>
      <span style={{ backgroundColor: color }}>{color}</span>
      <span onClick={handleEdit}>Edit</span>
      <span id="delete-icon" onClick={handleDelete}>
        X
      </span>
    </li>
  );
}

export default TagsList;
