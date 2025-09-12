import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

function Header({ moonIcon, sunIcon, darkLogo, lightLogo }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <nav className={`nav ${theme}`}>
        <div className="logo">
          <img src={theme === "light" ? darkLogo : lightLogo} alt="logo" />
        </div>

        <button className={`theme ${theme}`} onClick={toggleTheme}>
          <img
            src={theme === "light" ? moonIcon : sunIcon}
            alt="toggle theme"
            className="theme-logo"
            style={{ width: "1.2rem", height: "1.2rem" }}
          />
        </button>
      </nav>
    </header>
  );
}

export default Header;
