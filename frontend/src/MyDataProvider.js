import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyDataContext from "./MyDataContext";

export const MyDataProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [avaibleTagList, setAvaibleTagList] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
    fetchTagData(); // Llama a la función para obtener los tags
  }, []);

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

  async function fetchTagData() {
    try {
      const res = await axios.get("http://localhost:4000/api/tags");
      setTagList(res.data); // Almacena los datos de los tags
      setAvaibleTagList(res.data);
    } catch (error) {
      console.error("Error fetching tag data:", error);
    }
  }

  async function fetchPlayer(id) {
    const res = await axios.get("http://localhost:4000/api/players/" + id);
    const player = res.data;
    setPlayerData({ ...player });
  }

  async function handleDeletePlayer(playerId) {
    await axios.delete("http://localhost:4000/api/players/" + playerId);
    fetchPlayers();
  }

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
      alert("jugador creado!");
    } else {
      await axios.put("http://localhost:4000/api/players/" + data.id, {
        name: data.name,
        score: data.score,
        trophies: data.trophies,
        description: data.description,
        tags: tags,
      });
      //setUpdateMode(false);
      alert("jugador actualizado!");
    }
    fetchPlayers();
  }

  function handleUpdatePlayer(playerId) {
    navigate("/create-player/" + playerId);
  }

  function handleSearch(searchTerm) {
    const filteredPlayers = playerList.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayerList(filteredPlayers);
  }

  function handleSortByScore() {
    const sortedPlayers = [...filteredPlayerList];
    sortedPlayers.sort((a, b) => b.score - a.score);
    setFilteredPlayerList(sortedPlayers);
  }

  return (
    <MyDataContext.Provider
      value={{
        playerList,
        setPlayerList,
        filteredPlayerList,
        setFilteredPlayerList,
        tagList,
        fetchPlayers,
        fetchTagData,
        handleDeletePlayer,
        handleUpdatePlayer,
        handleSearch,
        handleSortByScore,
        playerData,
        fetchPlayer,
        avaibleTagList,
        setAvaibleTagList,
        handleSubmitPlayer,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};

export default MyDataProvider;
