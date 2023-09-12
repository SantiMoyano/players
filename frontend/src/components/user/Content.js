import Players from "./Players";

function Content({ players }) {
  return (
    <main>
      <section className="welcome">
        <h1>BIENVENIDO A PLAYERS APP</h1>
        <h3>Busca info de tus jugadores favoritos aca!</h3>
        <div className="search-input">
          <input type="text" placeholder="Ej. Messi" />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-search"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="white"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
          </button>
        </div>
      </section>
      <Players data={players}></Players>
    </main>
  );
}

export default Content;
