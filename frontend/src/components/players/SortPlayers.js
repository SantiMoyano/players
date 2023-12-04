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
      <h2>Sort players by:</h2>
      <select value={sortBy} onChange={handleSelectChange}>
        <option value="input">Entry order</option>
        <option value="score">Score</option>
      </select>
    </div>
  );
}

export default SortPlayers;
