import SearchIcon from "./icons/search";

function SearchPlayer({ handleSearch }) {
  function handleChange(e) {
    const searchTerm = e.target.value;
    handleSearch(searchTerm);
  }

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Ej. Lionel Andrés Messi"
        onChange={handleChange}
      />
      <button onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchPlayer;
