import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Styles
import "./App.css";
import "./players.css";

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
    <div>
      <img src="profile.jpg" alt="scorpion" />
      <p>tu perfil</p>
    </div>
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
