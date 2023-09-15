import SearchIcon from "./icons/search";

function SearchPlayer() {
  return (
    <div className="search-input">
      <input type="text" placeholder="Ej. Lionel Andrés Messi" />
      <button>
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchPlayer;
