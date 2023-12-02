import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MyDataContext from "../data/MyDataContext";

function Profile() {
  const { fetchUser, fetchPlayer } = useContext(MyDataContext);
  const [userData, setUserData] = useState([]);
  const [favouritePlayersIds, setFavouritePlayersIds] = useState([]);
  const [favouritePlayers, setFavouritePlayers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUserData();
    getPlayersFromId();
  }, [setUserData]);

  async function getUserData() {
    const data = await fetchUser(id);
    setUserData({ ...data });
  }

  async function getPlayersFromId() {
    for (const id of userData.favouritePlayers) {
      const player = await fetchPlayer(id);
      setFavouritePlayers(favouritePlayers.push(player));
    }
  }

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
    <section className="favourite-players">
      <h2>Jugadores favoritos de {userData.username}</h2>
      <ul>
        {favouritePlayers.map((el) => (
          <li>{el.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default Profile;
