import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Styles
import "./App.css";
import "./players.css";
import "./profile.css";
import "./detailed-player.css";

// Components
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Players from "./components/Players";
import Profile from "./components/Profile";
import DetailedPlayer from "./components/DetailedPlayer";

// Mock data
import players from "./data-players";

const player = {
  name: "Lionel Andrés Messi",
  imageRoute: "/messi.jpg",
  positions: ["Delantero", "Extremo", "Mediocampo"],
  teams: ["Barcelona FC", "PSG", "Inter Miami"],
  score: 10,
  trophies: 44,
  gifRoute: "/ankaramessi-barcelona.gif",
  description:
    "Lionel Andrés Messi Cuccittini, conocido como Leo Messi, es un futbolista argentino que juega como delantero o centrocampista.",
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Content />} />
          <Route path="/players" element={<Players data={players} />} />
          <Route
            path="/players/1"
            element={<DetailedPlayer data={player} />}
          ></Route>
          <Route path="/profile" element={<Profile data={players} />} />
        </Routes>
      </div>
    </Router>
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
