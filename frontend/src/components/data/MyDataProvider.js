import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyDataContext from "./MyDataContext";
//prettier-ignore
import { fetchPlayers, fetchPlayer, deletePlayer, updateOrCreatePlayer,} from "./PlayerAPI";
import { fetchTags, fetchTag, deleteTag, updateOrCreateTag } from "./TagsAPI";
import { fetchUsers, createUser } from "./UserAPI";

export const MyDataProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [avaibleTagList, setAvaibleTagList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayers();
    getTags();
  }, []);

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
