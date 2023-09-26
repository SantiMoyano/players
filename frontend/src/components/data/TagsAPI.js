import axios from "axios";

export async function fetchTags() {
  try {
    const res = await axios.get("http://localhost:4000/api/tags");
    return res.data;
  } catch (error) {
    console.error("Error fetching tag data:", error);
  }
}

export async function fetchTag(id) {
  const res = await axios.get("http://localhost:4000/api/tags/" + id);
  return res.data;
}

export async function deleteTag(id) {
  await axios.delete("http://localhost:4000/api/tags/" + id);
}

export async function updateOrCreateTag(data) {
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
}
