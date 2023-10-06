import { useState, useEffect, useContext } from "react";
import MyDataContext from "../data/MyDataContext";

function Position({ position }) {
  const { tagList } = useContext(MyDataContext);
  const [color, setColor] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    searchTags();
  }, []);

  async function searchTags() {
    try {
      // Encuentra la etiqueta correspondiente al id
      const tagData = tagList.find((tag) => tag._id === position);
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
