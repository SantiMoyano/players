import { useContext, useEffect, useState } from "react";
import Players from "../players/Players";
import SearchPlayer from "../players/SearchPlayer";
import MyDataContext from "../data/MyDataContext";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

function Content({ players }) {
  const { handleSearch, isLogged } = useContext(MyDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  let originalPlayers = [];

  if (players) {
    originalPlayers = [...players];
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  });

  function navigateLogin() {
    navigate("/login");
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <section className="welcome">
            <img src="cristiano-ronaldo.jpg" alt="bichu" />
            <div className="welcome-content">
              <h1>PLAYERS APP</h1>
              <h3>Search info about your favorite players here!</h3>
              <SearchPlayer handleSearch={handleSearch} />
              {!isLogged && (
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <strong onClick={navigateLogin} style={{ cursor: "pointer" }}>
                    Log in
                  </strong>{" "}
                  &nbsp;to create tags and players.
                </p>
              )}
            </div>
          </section>
          <Players showFirstFive={true}></Players>
        </main>
      )}
    </>
  );
}

export default Content;
