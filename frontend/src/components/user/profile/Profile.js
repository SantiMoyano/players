import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyDataContext from "../../data/MyDataContext";
import { FavouritePlayers } from "./FavouritePlayers";
import { EditProfile } from "./EditProfile";

export function Profile() {
  const { fetchUser, fetchPlayer, handleLogout, updateUser } =
    useContext(MyDataContext);
  const [userData, setUserData] = useState({});
  const [favouritePlayers, setFavouritePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  function handlePlayerClicked(playerId) {
    navigate("/players/" + playerId);
  }

  function goToHome() {
    navigate("/");
  }

  function goToPlayers() {
    navigate("/players");
  }

  function handleEditMode() {
    setEditProfileMode(true);
  }

  async function handleLogoutClicked() {
    await handleLogout();
    goToHome();
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
  }, [id, fetchUser, fetchPlayer, isLoading, userData]);

  function handleUpdateProfile(data) {
    const dataAndId = { data, id };
    updateUser(dataAndId);
    setEditProfileMode(false);
  }

  return !isLoading ? (
    <section className="profile">
      <div
        style={{ backgroundColor: userData.profileBannerColor }}
        className="banner"
      >
        {/* Contenido del banner, por ejemplo, un título */}
      </div>

      <div className="user">
        <div className="user-logo">
          <img src={userData.profileImageUrl} alt={userData.profileImageUrl} />
        </div>
        <div className="user-info">
          <h2>{userData.username}</h2>
          <p>{userData.profileBio}</p>
          <div onClick={handleEditMode} className="edit-profile">
            <p>Edit profile</p>
          </div>
        </div>

        <div onClick={handleLogoutClicked} className="logout">
          <p>Logout</p>
        </div>
      </div>
      {editProfileMode && (
        <EditProfile
          userData={userData}
          handleUpdateProfile={handleUpdateProfile}
        />
      )}
      <hr
        style={{
          width: "55%",
          height: "1px",
          margin: "16px 0",
          border: "none",
          backgroundColor: "#ddd",
        }}
      />
      {favouritePlayers.length > 0 ? (
        <FavouritePlayers
          userData={userData}
          favouritePlayers={favouritePlayers}
          handlePlayerClicked={handlePlayerClicked}
        />
      ) : (
        <>
          <p>{userData.username} doesn't have any favorite players yet. 😟</p>
          <h3
            style={{ cursor: "pointer", paddingBottom: "200px" }}
            onClick={goToPlayers}
          >
            View players!
          </h3>
        </>
      )}
    </section>
  ) : (
    <section className="loading">
      <h2>. . .</h2>
    </section>
  );
}

export default Profile;
