import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

function Header() {
  return (
    <header>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-menu-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 6l16 0"></path>
        <path d="M4 12l16 0"></path>
        <path d="M4 18l16 0"></path>
      </svg>
    </header>
  );
}

function Content() {
  return (
    <main>
      <Welcome />
    </main>
  );
}

function Welcome() {
  return (
    <figure className="welcome-container">
      <img src="./poke.jpg" alt="bg" />
      <h1>ANIME WORLD</h1>
    </figure>
  );
}

export default App;
