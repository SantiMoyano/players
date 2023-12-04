export function FavouritePlayer({ name, image, score }) {
  return (
    <li className="player">
      <figure>
        <img src={image} alt={name} />
        <div className="content">
          <div className="top">
            <h2>{name}</h2>
            <span>
              <strong>{score}</strong>⭐
            </span>
          </div>
        </div>
      </figure>
    </li>
  );
}
