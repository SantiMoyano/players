export function FavouritePlayer({
  id,
  name,
  image,
  score,
  handlePlayerClicked,
}) {
  return (
    <li onClick={() => handlePlayerClicked(id)} className="player">
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
