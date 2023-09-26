import { useState } from "react";

function SortPlayers({ handleSortByScore }) {
  const [sortBy, setSortBy] = useState("input");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSortBy(selectedValue);
    if (selectedValue === "score") {
      handleSortByScore();
    }
  };

  return (
    <div className="sort-players">
      <h2>Ordenar jugadores por:</h2>
      <select value={sortBy} onChange={handleSelectChange}>
        <option value="input">Orden de entrada</option>
        <option value="position">Posicion</option>
        <option value="score">Valoracion</option>
      </select>
    </div>
  );
}

export default SortPlayers;
