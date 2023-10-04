import { useState, useEffect, useContext } from "react";
import MyDataContext from "../data/MyDataContext.js";
import { Link } from "react-router-dom";

import MenuIcon from "../user/icons/menu.js";

function Header() {
  const { isLogged, handleLogout, userId } = useContext(MyDataContext);
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  const [clickedMenu, setClickedMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Admin hardcodeado

  const handleMenuClick = () => {
    setClickedMenu(!clickedMenu);
  };

  useEffect(() => {
    const actualizarAnchoPantalla = () => {
      setAnchoPantalla(window.innerWidth);
    };

    window.addEventListener("resize", actualizarAnchoPantalla);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", actualizarAnchoPantalla);
    };
  }, [isLogged]);

  /*
   * SI ES MOBILE ENTONCES MUESTRA HAMBURGUESA Y ALTERNA EL RESTO DE ELEMENTOS DEL HEADER
   * SI ES DESKTOP MUESTRA TODOS LOS ELEMENTOS DEL HEADER (Sin la hamburguesa)
   */

  return (
    <header className={`main-header  ${clickedMenu ? "background-menu" : ""}`}>
      {anchoPantalla < 768 ? (
        <>
          <MenuIcon handleClick={handleMenuClick} />
          {clickedMenu ? <NavElems isAdmin={isAdmin} /> : ""}
        </>
      ) : (
        <NavElems
          isLogged={isLogged}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
          userId={userId}
        />
      )}
    </header>
  );
}

function NavElems({ isAdmin, isLogged, handleLogout, userId }) {
  const linkStyle = { textDecoration: "none" };

  return (
    <div className="menu-content">
      <div>
        <Link to="/" style={linkStyle}>
          ⚽ PLAYERS APP
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/players" style={linkStyle}>
            Jugadores
          </Link>
        </li>

        {isAdmin && (
          <>
            <li>
              <Link to="/management" style={linkStyle}>
                Admin Jugadores
              </Link>
            </li>
            <li>
              <Link to="/create-player" style={linkStyle}>
                Crear Jugador
              </Link>
            </li>
            <li>
              <Link to="/tags-management" style={linkStyle}>
                Editar Tags
              </Link>
            </li>
          </>
        )}

        {isLogged ? (
          <>
            <li>
              <Link to={`/profile/${userId}`} style={linkStyle}>
                Perfil
              </Link>
            </li>
            <li>
              <Link to="/" style={linkStyle} onClick={handleLogout}>
                Desloguearse
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" style={linkStyle}>
              Ingresar
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
