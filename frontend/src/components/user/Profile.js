import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MyDataContext from "../data/MyDataContext";

function Profile() {
  const { fetchUser } = useContext(MyDataContext);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const data = await fetchUser(id);
    setUserData({ ...data });
  }

  return (
    <section style={{ paddingTop: "120px" }}>
      <h2>{userData.username}</h2>
      <p>Bienvenido al perfil de {userData.username}!</p>
    </section>
  );
}

export default Profile;
