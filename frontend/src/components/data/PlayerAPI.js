import axios from "axios";

export async function fetchPlayers() {
  try {
    const res = await axios.get("http://localhost:4000/api/players");
    return res.data;
  } catch (error) {
    console.error("Error fetching player data:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function fetchPlayer(id) {
  try {
    const res = await axios.get("http://localhost:4000/api/players/" + id);
    return res.data;
  } catch (error) {
    console.error("Error fetching player by ID:", error);
    throw error;
  }
}

export async function deletePlayer(playerId) {
  await axios.delete("http://localhost:4000/api/players/" + playerId);
}

export async function updateOrCreatePlayer(data) {
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
}
