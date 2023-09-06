import { useState } from "react";
import Position from "./Position";
import { Navigate } from "react-router-dom";

function Player({ name, imageRoute, positions, score, description }) {
  const [isClicked, setIsClicked] = useState(false);
  const [navigate, setNavigate] = useState("");

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);

      setTimeout(() => {
        setNavigate("/players/1"); // navega para esa ruta despues de la animacion
      }, 200);
    }, 300);
  };

  return (
    <li
      className={`player ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <figure>
        <Navigate to={navigate} />
        <img src={imageRoute} alt="arbol" />
        <div className="content">
          <div className="top">
            <h2>{name}</h2>
            <span>
              <strong>{score}</strong>⭐
            </span>
          </div>

          <div className="skill-list">
            {positions.map((el) => (
              <Position position={el} key={el + name} />
            ))}
          </div>

          <figcaption>{description}</figcaption>
        </div>
      </figure>
    </li>
  );
}

export default Player;
