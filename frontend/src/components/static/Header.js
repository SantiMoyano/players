import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "../user/icons/menu.js";

function Header() {
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
  }, []);

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
        <NavElems isAdmin={isAdmin} />
      )}
    </header>
  );
}

function NavElems({ isAdmin }) {
  const linkStyle = { color: "white", textDecoration: "none" };

  return (
    <div className="menu-content">
      <ul>
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/players" style={linkStyle}>
            Jugadores
          </Link>
        </li>
        <li>
          <Link to="/login" style={linkStyle}>
            Perfil
          </Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/management" style={linkStyle}>
                Administrar Jugadores
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
      </ul>
    </div>
  );
}

export default Header;
