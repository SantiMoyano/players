import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Styles
import "./App.css";
import "./players.css";
import "./profile.css";

// Components
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Players from "./components/Players";

// Mock data
import players from "./data-players";

const player = [
  {
    name: "Lionel Andrés Messi",
    imageRoute: "/messi.jpg",
    position: ["Delantero", "Extremo", "Mediocampo"],
    description:
      "Lionel Andrés Messi Cuccittini, conocido como Leo Messi, es un futbolista argentino que juega como delantero o centrocampista.",
  },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Content />} />
          <Route path="/players" element={<Players data={players} />} />
          <Route path="/players/1" element={<DetailedPlayer />}></Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

function DetailedPlayer() {
  return <Players data={player} />;
}

function Profile() {
  return (
    <main>
      <figure className="profile">
        <img className="img-profile" src="profile.jpg" alt="scorpion" />
        <figcaption>scorpion99</figcaption>
        <p>Editar perfil / Loguearse / Desloguearse / Registrarse</p>
      </figure>
      <section>
        <p>Jugadores favoritos</p>
        <FavouritePlayers data={players} />
      </section>
    </main>
  );
}

function FavouritePlayers({ data }) {
  return (
    <section className="favourite-players">
      <ul>
        {data.map((el) => (
          <FavouritePlayer
            name={el.name}
            imageRoute={el.imageRoute}
            key={el.imageRoute}
          />
        ))}
      </ul>
    </section>
  );
}

function FavouritePlayer({ name, imageRoute }) {
  return (
    <li className="favourite-player">
      <figure>
        <img src={imageRoute} alt="arbol" />
        <figcaption>{name}</figcaption>
      </figure>
    </li>
  );
}

function Content() {
  return (
    <main>
      <Welcome />
      <Players data={players} />
    </main>
  );
}

export default App;
