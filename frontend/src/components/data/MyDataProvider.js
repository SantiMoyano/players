import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyDataContext from "./MyDataContext";

export const MyDataProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [avaibleTagList, setAvaibleTagList] = useState([]);
  const navigate = useNavigate();

  // Fetch player and tag data when the component mounts
  useEffect(() => {
    fetchPlayers();
    fetchTags();
  }, []);

  // Fetch the list of players from the API
  async function fetchPlayers() {
    try {
      const res = await axios.get("http://localhost:4000/api/players");
      const players = res.data;
      setPlayerList(players);
      setFilteredPlayerList(players);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch the list of tags from the API
  async function fetchTags() {
    try {
      const res = await axios.get("http://localhost:4000/api/tags");
      setTagList(res.data); // Store tag data
      setAvaibleTagList(res.data);
    } catch (error) {
      console.error("Error fetching tag data:", error);
    }
  }

  // Fetch data for a specific player by ID
  async function fetchPlayer(id) {
    const res = await axios.get("http://localhost:4000/api/players/" + id);
    return res.data;
  }

  // Fetch data for a specific tag by ID
  async function fetchTag(id) {
    const res = await axios.get("http://localhost:4000/api/tags/" + id);
    return res.data;
  }

  // Handle the deletion of a player by ID
  async function handleDeletePlayer(playerId) {
    await axios.delete("http://localhost:4000/api/players/" + playerId);
    fetchPlayers(); // Refresh the player list
  }

  // Handle the deletion of a tag by ID
  async function handleDeleteTag(id) {
    await axios.delete("http://localhost:4000/api/tags/" + id);
    fetchTags(); // Refresh the tag list
  }

  // Handle the submission of player data
  async function handleSubmitPlayer(data) {
    const selectedTags = data.selectedTags || [];
    const tags = selectedTags.map((tag) => tag._id);
    if (!data.updateMode) {
      await axios.post("http://localhost:4000/api/players", {
        name: data.name,
        score: data.score,
        trophies: data.trophies,
        description: data.description,
        tags: tags,
      });
      alert("Player created!");
    } else {
      await axios.put("http://localhost:4000/api/players/" + data.id, {
        name: data.name,
        score: data.score,
        trophies: data.trophies,
        description: data.description,
        tags: tags,
      });
      alert("Player updated!");
    }
    fetchPlayers(); // Refresh the player list
  }

  // Handle the submission of tag data
  async function handleSubmitTag(data) {
    if (!data.updateTag) {
      await axios.post("http://localhost:4000/api/tags", {
        tagName: data.tagName,
        tagColor: data.tagColor,
        tagType: data.tagType,
      });
      alert("Tag created!");
    } else {
      await axios.put("http://localhost:4000/api/tags/" + data.id, {
        tagName: data.tagName,
        tagColor: data.tagColor,
        tagType: data.tagType,
      });
      alert("Tag updated!");
    }
    fetchTags(); // Refresh the tag list
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
        setPlayerList,
        filteredPlayerList,
        tagList,
        handleDeletePlayer,
        handleUpdatePlayer,
        handleSearch,
        handleSortByScore,
        fetchPlayer,
        avaibleTagList,
        setAvaibleTagList,
        handleSubmitPlayer,
        handleDeleteTag,
        handleSubmitTag,
        fetchTag,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};

export default MyDataProvider;
