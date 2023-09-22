import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import MyDataContext from "./MyDataContext";

export const MyDataProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filteredPlayerList, setFilteredPlayerList] = useState([]);
  const [tagList, setTagList] = useState([]);

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
    } catch (error) {
      console.error("Error fetching tag data:", error);
    }
  }

  const data = [
    playerList,
    setPlayerList,
    filteredPlayerList,
    setFilteredPlayerList,
    tagList,
    fetchPlayers,
    fetchTagData,
  ];

  return (
    <MyDataContext.Provider value={data}>{children}</MyDataContext.Provider>
  );
};

export default MyDataProvider;
