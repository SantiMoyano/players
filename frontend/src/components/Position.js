import { useState, useEffect } from "react";

function Position({ position }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (position === "Delantero" || position === "Extremo") setColor("#D2231E");
    if (position === "Defensor") setColor("#60DAFB");
    if (position === "Mediocampo") setColor("#51A35F");
    if (position === "Arquero") setColor("#EFD81D");
    if (position === "Barcelona FC") setColor("#D2231E");
    if (position === "PSG") setColor("#223B8E");
    if (position === "Inter Miami") setColor("#B83981");
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
