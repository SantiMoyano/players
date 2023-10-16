import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MyDataContext from "../data/MyDataContext";

function Profile() {
  const { fetchUser, fetchPlayer } = useContext(MyDataContext);
  const [userData, setUserData] = useState([]);
  const [favouritePlayers, setFavouritePlayers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const data = await fetchUser(id);
    setUserData({ ...data });
    getPlayersFromId();
  }

  async function getPlayersFromId() {
    const playersIds = await userData.favouritePlayers;

    for (const id of playersIds) {
      const player = await fetchPlayer(id);
      setFavouritePlayers([...favouritePlayers, player]);
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
