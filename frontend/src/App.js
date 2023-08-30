import "./App.css";
import "./players.css";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Welcome from "./components/Welcome";

import players from "./data-players";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
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

function Players({ data }) {
  return (
    <section className="players">
      <h1>ULTIMOS JUGADORES</h1>
      <ul>
        {data.map((el) => (
          <Player
            name={el.name}
            imageRoute={el.imageRoute}
            positions={el.position}
            description={el.description}
            key={el.imageRoute}
          />
        ))}
      </ul>
    </section>
  );
}

function Player({ name, imageRoute, positions, description }) {
  return (
    <li>
      <figure>
        <img src={imageRoute} alt="arbol" />
        <h2>{name}</h2>
        <div className="skill-list">
          {positions.map((el) => (
            <Position position={el} key={el + name} />
          ))}
        </div>
        <figcaption>{description}</figcaption>
      </figure>
    </li>
  );
}

function Position({ position }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (position === "Delantero" || position === "Extremo") setColor("#FF3B00");
    if (position === "Defensor") setColor("#60DAFB");
    if (position === "Mediocampo") setColor("#C3FCAF");
    if (position === "Arquero") setColor("#EFD81D");
  }, []);

  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>
        <strong>{position}</strong>
      </span>
    </div>
  );
}

export default App;
