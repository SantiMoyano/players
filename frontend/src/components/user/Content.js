import Welcome from "./Welcome";
import Players from "./Players";

function Content({ players }) {
  return (
    <main>
      <Welcome />
      <Players data={players} showFilter={false} />
    </main>
  );
}

export default Content;
