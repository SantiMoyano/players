import { useState, useEffect } from "react";

function Position({ position }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (position === "Delantero" || position === "Extremo") setColor("#FF3B00");
    if (position === "Defensor") setColor("#60DAFB");
    if (position === "Mediocampo") setColor("#51A35F");
    if (position === "Arquero") setColor("#EFD81D");
  }, []);

  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>
        <strong>{position}</strong>
      </span>
    </div>
  );
}

export default Position;
