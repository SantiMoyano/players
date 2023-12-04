import { FavouritePlayer } from "./FavouritePlayer";

export function FavouritePlayers({
  userData,
  favouritePlayers,
  handlePlayerClicked,
}) {
  return (
    <section className="favourite-players players">
      <h2>Favorite players of {userData.username}</h2>
      <ul>
        {favouritePlayers.map((el) => (
          <FavouritePlayer
            key={el._id}
            id={el._id}
            name={el.name}
            image={el.imageUrl}
            score={el.score}
            handlePlayerClicked={handlePlayerClicked}
          />
        ))}
      </ul>
    </section>
  );
}
