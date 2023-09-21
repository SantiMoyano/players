import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Styles
import "./styles/App.css";
import "./styles/content.css";
import "./styles/players.css";
import "./styles/profile.css";
import "./styles/detailed-player.css";
import "./styles/management.css";
import "./styles/create-player.css";
import "./styles/tags.css";

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
    "Lionel Andrés Messi Cuccittini (Rosario, 24 de junio de 1987), conocido como Leo Messi, es un futbolista argentino que juega como delantero en el Inter Miami de la Major League Soccer. Considerado como uno de los mejores de todos los tiempos,9​ es el único futbolista en la historia que ha ganado, entre otras distinciones, siete veces el Balón de Oro, siete premios de la FIFA al mejor jugador del mundo, seis Botas de Oro y dos Balones de Oro de la Copa Mundial de Fútbol. En 2020, se convirtió en el primer futbolista y el primer argentino en recibir un premio Laureus y fue incluido en el Dream Team del Balón de Oro. Con el Barcelona ganó 35 títulos, entre ellos, diez de La Liga, cuatro de la Liga de Campeones de la UEFA y siete de la Copa del Rey. Ostenta entre otros, los récords por más goles en una temporada,10​ en un mismo club y en un año calendario. Es, además, el máximo goleador histórico del Barcelona y de la selección argentina, de La Liga, la Supercopa de España, la Supercopa de Europa y el jugador no europeo con más goles en la Liga de Campeones de la UEFA.",
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
          <Route path="/create-player/:id" element={<CreatePlayer />} />
          <Route
            path="/tags-management"
            element={<TagsManagement tags={tags} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function Footer() {
  return (
    <footer>
      <span>COPYRIGHT SANTI</span>
    </footer>
  );
}

export default App;
