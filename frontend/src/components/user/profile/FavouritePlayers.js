import { FavouritePlayer } from "./FavouritePlayer";

export function FavouritePlayers({ userData, favouritePlayers }) {
  return (
    <section className="favourite-players players">
      <h2>Favorite players of {userData.username}</h2>
      <ul>
        {favouritePlayers.map((el) => (
          <FavouritePlayer
            key={el.id}
            name={el.name}
            image={el.imageUrl}
            score={el.score}
          />
        ))}
      </ul>
    </section>
  );
}
