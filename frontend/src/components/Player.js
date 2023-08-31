import Position from "./Position";

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

export default Player;
