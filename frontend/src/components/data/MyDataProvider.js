import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyDataContext from "./MyDataContext";
import axios from "axios";

//prettier-ignore
import { fetchPlayers, fetchPlayer, deletePlayer, updateOrCreatePlayer,} from "./PlayerAPI";
import { fetchTags, fetchTag, deleteTag, updateOrCreateTag } from "./TagsAPI";
import { fetchUsers, createUser } from "./UserAPI";

export const MyDataProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [avaibleTagList, setAvaibleTagList] = useState([]);
  const [isLogged, setIsLogged] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayers();
    getTags();
  }, []);

  async function checkLogin(data) {
    try {
      // Realiza la solicitud de inicio de sesión
      const response = await axios.post(
        "http://localhost:4000/api/login/",
        data
      );

      // Si la solicitud fue exitosa (código 200 OK), el inicio de sesión fue exitoso
      console.log("Inicio de sesión exitoso:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
      } else {
        console.error("Error al iniciar sesión:", error.message);
      }
    }
  }

  async function getPlayers() {
    const data = await fetchPlayers();
    setPlayerList(data);
    setFilteredPlayerList(data);
  }

  async function handleDeletePlayer(id) {
    await deletePlayer(id);
    getPlayers();
  }

  async function handleSubmitPlayer(data) {
    await updateOrCreatePlayer(data);
    getPlayers();
  }

  async function getTags() {
    const tags = await fetchTags();
    setTagList(tags);
    setAvaibleTagList(tags);
  }

  async function handleDeleteTag(id) {
    await deleteTag(id);
    getTags();
  }

  async function handleSubmitTag(data) {
    await updateOrCreateTag(data);
    getTags();
  }

  // Handle the navigation to the player update page
  function handleUpdatePlayer(playerId) {
    navigate("/create-player/" + playerId);
  }

  // Handle searching for players by name
  function handleSearch(searchTerm) {
    const filteredPlayers = playerList.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayerList(filteredPlayers);
  }

  // Handle sorting players by score
  function handleSortByScore() {
    const sortedPlayers = [...filteredPlayerList];
    sortedPlayers.sort((a, b) => b.score - a.score);
    setFilteredPlayerList(sortedPlayers);
  }

  return (
    <MyDataContext.Provider
      value={{
        checkLogin,
        fetchUsers,
        createUser,
        fetchTag,
        fetchPlayer,
        setPlayerList,
        filteredPlayerList,
        tagList,
        handleDeletePlayer,
        handleUpdatePlayer,
        handleSearch,
        handleSortByScore,
        avaibleTagList,
        setAvaibleTagList,
        handleSubmitPlayer,
        handleDeleteTag,
        handleSubmitTag,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};