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
    // Encuentra la etiqueta correspondiente al id
    const tagData = await tagList.find((tag) => tag._id === position);
    setTag(tagData.tagName);
    setColor(tagData.tagColor);
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
