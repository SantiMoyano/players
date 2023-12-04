import { useState, useEffect, useContext } from "react";
import MyDataContext from "../data/MyDataContext.js";
import { Link } from "react-router-dom";

import MenuIcon from "../user/icons/menu.js";

function Header() {
  const { isAdmin } = useContext(MyDataContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [clickedMenu, setClickedMenu] = useState(false);

  const handleMenuClick = () => {
    setClickedMenu(!clickedMenu);
  };

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  /*
   * IF IT'S MOBILE, DISPLAY THE HAMBURGER ICON AND TOGGLE THE OTHER HEADER ELEMENTS
   * IF IT'S DESKTOP, DISPLAY ALL HEADER ELEMENTS (Without the hamburger icon)
   */

  return (
    <header className={`main-header ${clickedMenu ? "background-menu" : ""}`}>
      {screenWidth < 768 ? (
        <>
          <MenuIcon handleClick={handleMenuClick} />
          {clickedMenu ? <NavElems isAdmin={isAdmin} /> : ""}
        </>
      ) : (
        <NavElems />
      )}
    </header>
  );
}

function NavElems() {
  const { isLogged, handleLogout, userId, isAdmin } = useContext(MyDataContext);
  const linkStyle = { textDecoration: "none" };

  useEffect(() => {}, [isLogged, isAdmin, handleLogout]);

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
            Players
          </Link>
        </li>

        {isAdmin && (
          <>
            <li>
              <Link to="/management" style={linkStyle}>
                Admin Players
              </Link>
            </li>
            <li>
              <Link to="/create-player" style={linkStyle}>
                Create Player
              </Link>
            </li>
            <li>
              <Link to="/tags-management" style={linkStyle}>
                Edit Tags
              </Link>
            </li>
          </>
        )}

        {isLogged ? (
          <>
            <li>
              <Link to={`/profile/${userId}`} style={linkStyle}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/" style={linkStyle} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" style={linkStyle}>
              Log In
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
