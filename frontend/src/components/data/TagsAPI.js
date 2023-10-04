import axios from "axios";
import { url } from "../../CONST";

export async function fetchTags() {
  try {
    const res = await axios.get(url + "/api/tags");
    return res.data;
  } catch (error) {
    console.error("Error fetching tag data:", error);
  }
}

export async function fetchTag(id) {
  const res = await axios.get(url + "/api/tags/" + id);
  return res.data;
}

export async function deleteTag(id) {
  await axios.delete(url + "/api/tags/" + id);
}

export async function updateOrCreateTag(data) {
  if (!data.updateTag) {
    await axios.post(url + "/api/tags", {
      tagName: data.tagName,
      tagColor: data.tagColor,
      tagType: data.tagType,
    });
    alert("Tag created!");
  } else {
    await axios.put(url + "/api/tags/" + data.id, {
      tagName: data.tagName,
      tagColor: data.tagColor,
      tagType: data.tagType,
    });
    alert("Tag updated!");
  }
}
