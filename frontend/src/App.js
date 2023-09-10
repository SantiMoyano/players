import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Styles
import "./App.css";
import "./players.css";
import "./profile.css";
import "./detailed-player.css";
import "./management.css";
import "./create-player.css";
import "./tags.css";

// Components
import Header from "./components/user/Header";
import Content from "./components/user/Content";
import Players from "./components/user/Players";
import Profile from "./components/user/Profile";
import DetailedPlayer from "./components/user/DetailedPlayer";
import PlayersManagement from "./components/admin/PlayersManagement";
import CreatePlayer from "./components/admin/CreatePlayer";
import TagsManagement from "./components/admin/TagsManagement";

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

const tags = [
  {
    name: "Delantero",
    color: "#D2231E",
    type: "position",
  },
  {
    name: "Arquero",
    color: "#EFD81D",
    type: "position",
  },
  {
    name: "Barcelona",
    color: "#D2231E",
    type: "club",
  },
  {
    name: "PSG",
    color: "#223B8E",
    type: "club",
  },
  {
    name: "Mediocampo",
    color: "#51A35F",
    type: "position",
  },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Content players={players} />} />
          <Route
            path="/players"
            element={<Players data={players} showFilter={true} />}
          />
          <Route
            path="/players/1"
            element={<DetailedPlayer data={player} />}
          ></Route>
          <Route path="/profile" element={<Profile data={players} />} />
          <Route
            path="/management"
            element={<PlayersManagement data={players} />}
          />
          <Route path="/create-player" element={<CreatePlayer />} />
          <Route
            path="/tags-management"
            element={<TagsManagement tags={tags} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
