import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MyDataContext from "../../data/MyDataContext";
import { FavouritePlayers } from "./FavouritePlayers";

function Profile() {
  const { fetchUser, fetchPlayer } = useContext(MyDataContext);
  const [userData, setUserData] = useState({});
  const [favouritePlayers, setFavouritePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  function handlePlayerClicked(playerId) {
    navigate("/players/" + playerId);
  }

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, fetchUser, fetchPlayer, isLoading]);

  return !isLoading ? (
    <section className="profile">
      <div className="banner">
        {/* Contenido del banner, por ejemplo, un título */}
      </div>
      <div className="user">
        <div className="user-logo">
          <img src="data:image/jpeg;base64,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" />
        </div>
        <div className="user-info">
          <h2>{userData.username}</h2>
          <p>Welcome to the {userData.username} profile!</p>
        </div>
      </div>
      <hr
        style={{
          width: "55%",
          height: "1px",
          margin: "16px 0",
          border: "none",
          backgroundColor: "#ddd",
        }}
      />

      <FavouritePlayers
        userData={userData}
        favouritePlayers={favouritePlayers}
        handlePlayerClicked={handlePlayerClicked}
      />
    </section>
  ) : (
    <section className="loading">
      <h2>. . .</h2>
    </section>
  );
}

export default Profile;
