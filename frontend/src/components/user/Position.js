import { useState, useEffect } from "react";
import axios from "axios";

function Position({ position }) {
  const [color, setColor] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      const tagsResponse = await axios.get("http://localhost:4000/api/tags");
      const tagsData = tagsResponse.data;
      setTagList(tagsData);

      // Encuentra la etiqueta correspondiente al id
      const tagData = tagsData.find((tag) => tag._id === position);
      if (tagData) {
        setTag(tagData.tagName);
        setColor(tagData.tagColor);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Mostrar el componente solo cuando los datos estén cargados
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>
        <strong>{tag}</strong>
      </span>
    </div>
  );
}

export default Position;
