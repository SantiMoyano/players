import axios from "axios";

export async function fetchUsers() {
  try {
    const res = await axios.get("http://localhost:4000/api/users");
    return res.data;
  } catch (error) {
    console.error("Error fetching User data:", error);
  }
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
  const res = await axios.get("http://localhost:4000/api/users/" + id);
  return res.data;
}

export async function deleteUser(id) {
  await axios.delete("http://localhost:4000/api/users/" + id);
}

export async function createUser(data) {
  if (!data.isUpdate) {
    await axios.post("http://localhost:4000/api/users", {
      username: data.username,
      password: data.password,
    });
    alert("User created!");
  }
}
