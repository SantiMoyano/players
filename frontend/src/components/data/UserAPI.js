import axios from "axios";
import { url } from "../../CONST";

export async function fetchUsers() {
  try {
    const res = await axios.get(url + "/api/users");
    return res.data;
  } catch (error) {
    console.error("Error fetching User data:", error);
  }
}

export async function addFavouritePlayer(id) {
  await axios.post(url + "/api/users/players/" + id);
}

export async function removeFavouritePlayer(id) {
  await axios.delete(url + "/api/users/players/" + id);
}

export async function getUserByName(name) {
  const users = await fetchUsers();
  const user = await users.find((us) => us.username === name);
  if (user) {
    return user._id;
  } else {
    return 0;
  }
}

export async function fetchUser(id) {
  const res = await axios.get(url + "/api/users/" + id);
  return res.data;
}

export async function deleteUser(id) {
  await axios.delete(url + "/api/users/" + id);
}

export async function createUser(data) {
  if (!data.isUpdate) {
    await axios.post(url + "/api/users", {
      username: data.username,
      password: data.password,
    });
    alert("User created!");
  }
}
