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
    // Find the tag corresponding to the id
    const tagData = await tagList.find((tag) => tag._id === position);
    setTag(tagData.tagName);
    setColor(tagData.tagColor);
  }

  // Render the component only when the data is loaded
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>
        <strong>{tag}</strong>
      </span>
    </div>
  );
}

export default Position;
