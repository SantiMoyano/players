import axios from "axios";
import { url } from "../../CONST";

export async function fetchPlayers() {
  try {
    const res = await axios.get(url + "/api/players");
    return res.data;
  } catch (error) {
    console.error("Error fetching player data:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function fetchPlayer(id) {
  try {
    const res = await axios.get(url + "/api/players/" + id);
    return res.data;
  } catch (error) {
    console.error("Error fetching player by ID:", error);
    throw error;
  }
}

export async function deletePlayer(playerId) {
  await axios.delete(url + "/api/players/" + playerId);
}

export async function updateOrCreatePlayer(data) {
  const selectedTags = data.selectedTags || [];
  const tags = selectedTags.map((tag) => tag._id);
  if (!data.updateMode) {
    await axios.post(url + "/api/players", {
      name: data.name,
      score: data.score,
      trophies: data.trophies,
      shortDescription: data.shortDescription,
      description: data.description,
      imageUrl: data.imageUrl,
      gifUrl: data.gifUrl,
      tags: tags,
    });
    alert("Player created!");
  } else {
    await axios.put(url + "/api/players/" + data.id, {
      name: data.name,
      score: data.score,
      trophies: data.trophies,
      shortDescription: data.shortDescription,
      description: data.description,
      imageUrl: data.imageUrl,
      gifUrl: data.gifUrl,
      tags: tags,
    });
    alert("Player updated!");
  }
}
