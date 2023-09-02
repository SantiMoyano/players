import Position from "./Position";

function Player({ name, imageRoute, positions, score, description }) {
  return (
    <li>
      <figure>
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
