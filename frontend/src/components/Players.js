import Player from "./Player";

function Players({ data }) {
  return (
    <section className="players">
      <h1>ULTIMOS JUGADORES</h1>
      <ul>
        {data.map((el) => (
          <Player
            name={el.name}
            imageRoute={el.imageRoute}
            positions={el.position}
            description={el.description}
            key={el.imageRoute}
          />
        ))}
      </ul>
    </section>
  );
}

export default Players;
