import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [clickedMenu, setClickedMenu] = useState(false);

  const handleMenuClick = () => {
    setClickedMenu(!clickedMenu);
  };

  return (
    <header className={clickedMenu ? "show-menu" : ""}>
      <svg
        onClick={handleMenuClick}
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-menu-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 6l16 0"></path>
        <path d="M4 12l16 0"></path>
        <path d="M4 18l16 0"></path>
      </svg>

      {clickedMenu && (
        <div className="menu-content">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/players">Jugadores</Link>
            </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
