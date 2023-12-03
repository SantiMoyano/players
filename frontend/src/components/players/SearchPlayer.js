import { useNavigate } from "react-router-dom";
import SearchIcon from "../user/icons/search";

function SearchPlayer({ handleSearch }) {
  function handleChange(e) {
    const searchTerm = e.target.value;
    handleSearch(searchTerm);
  }
  const navigate = useNavigate();
  function navigateToPlayers() {
    navigate("/players");
  }

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Ej. Lionel Andrés Messi"
        onChange={handleChange}
      />
      <button onClick={(handleSearch, navigateToPlayers)}>
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchPlayer;
