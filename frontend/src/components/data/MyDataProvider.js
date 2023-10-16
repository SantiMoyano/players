import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyDataContext from "./MyDataContext";
import axios from "axios";
import { url } from "../../CONST";

//prettier-ignore
import { fetchPlayers, fetchPlayer, deletePlayer, updateOrCreatePlayer,} from "./PlayerAPI";
import { fetchTags, fetchTag, deleteTag, updateOrCreateTag } from "./TagsAPI";
import {
  fetchUser,
  fetchUsers,
  createUser,
  getUserByName,
  addFavouritePlayer,
  removeFavouritePlayer,
} from "./UserAPI";

export const MyDataProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [avaibleTagList, setAvaibleTagList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayers();
    getTags();
  }, [isLogged, isAdmin]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const sessionId = localStorage.getItem("sessionId");
    const admin = localStorage.getItem("admin");
    if (sessionId) setUserId(sessionId);
    if (authToken) setIsLogged(true);
    if (admin) setIsAdmin(true);
  }, []);

  async function checkLogin(data) {
    try {
      // Realiza la solicitud de inicio de sesión
      const response = await axios.post(url + "/api/login/", data);
      const token = response.data.token;
      handleLogin(token, data.username);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
      } else {
        console.error("Error al iniciar sesión:", error.message);
      }
    }
  }

  async function handleLogin(token, username) {
    localStorage.setItem("authToken", token);
    setIsLogged(true);
    const id = await getUserByName(username);
    setUserId(id);
    if (username === "scorpion") {
      localStorage.setItem("admin", true);
      await setIsAdmin(true);
    }
    localStorage.setItem("sessionId", id);
    alert("Te logueaste!");
    navigate("/profile/" + id);
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("admin");
    setIsAdmin(false);
    setIsLogged(false);
  }

  async function handleGetUser() {
    const data = await fetchUser(userId);
    return data;
  }

  async function handleAddFavouritePlayer(playerId) {
    addFavouritePlayer(userId, playerId);
  }

  async function handleRemoveFavouritePlayer(playerId) {
    removeFavouritePlayer(userId, playerId);
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
        handleAddFavouritePlayer,
        handleRemoveFavouritePlayer,
        isAdmin,
        userId,
        fetchUser,
        handleLogout,
        isLogged,
        checkLogin,
        fetchUsers,
        createUser,
        fetchTag,
        fetchTags,
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
        handleGetUser,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};
