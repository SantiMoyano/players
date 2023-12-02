import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MyDataContext from "../data/MyDataContext";

function Profile() {
  const { fetchUser, fetchPlayer } = useContext(MyDataContext);
  const [userData, setUserData] = useState({});
  const [favouritePlayers, setFavouritePlayers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUser(id);
        setUserData(data);

        const playerIds = data.favouritePlayers || [];
        const players = await Promise.all(
          playerIds.map(async (id) => await fetchPlayer(id))
        );

        setFavouritePlayers(players);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, fetchUser, fetchPlayer]);

  return (
    <section className="profile">
      <h2>{userData.username}</h2>
      <p>Bienvenido al perfil de {userData.username}!</p>
      <FavouritePlayers
        userData={userData}
        favouritePlayers={favouritePlayers}
      />
    </section>
  );
}

function FavouritePlayers({ userData, favouritePlayers }) {
  return (
    <section className="favourite-players players">
      <h2>Jugadores favoritos de {userData.username}</h2>
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

function FavouritePlayer({ name, image, score }) {
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

export default Profile;
