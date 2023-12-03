import Position from "./Position";

function Player({
  handleClick,
  name,
  imageUrl,
  positions,
  score,
  description,
}) {
  return (
    <li className="player">
      <figure>
        <img src={imageUrl} alt={name} onClick={handleClick} />
        <div className="content">
          <div className="top">
            <h2>{name}</h2>
            <span>
              <strong>{score}</strong>⭐
            </span>
          </div>

          <div className="skill-list">
            {positions.map((el) => (
              <Position position={el} key={el} />
            ))}
          </div>

          <figcaption>{description}</figcaption>
        </div>
      </figure>
    </li>
  );
}

export default Player;
