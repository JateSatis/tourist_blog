import { NavLink } from "react-router-dom";

import { useState, useEffect } from "react";
import useTheme from "../hooks/useTheme.js";

import { FaTree } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";

const getPreferedTheme = () => {
  const preferedTheme = localStorage.getItem("theme");
  if (!preferedTheme) {
    localStorage.setItem("theme", "dark");
    return "dark";
  } else {
    return preferedTheme;
  }
};

const Header = () => {
  const [theme, setTheme] = useTheme(getPreferedTheme());

  const toggleTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
    document.documentElement.setAttribute("data-theme", theme);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <nav className="navigation">
        <NavLink to="/" className="header_button">
          <FaTree className="header_button-icon" />
          {screenWidth > 600 ? "Главная" : ""}
        </NavLink>
        <NavLink to="/find" className="header_button">
          <FaSearch className="header_button-icon" />
          {screenWidth > 600 ? "Поиск" : ""}
        </NavLink>
        <NavLink to="/places/create" className="header_button">
          <FaRegSquarePlus className="header_button-icon" />
          {screenWidth > 600 ? "Добавить" : ""}
        </NavLink>
      </nav>
      <section className="header_options">
        {theme == "light" ? (
          <div
            onClick={toggleTheme}
            className="header_button header_theme-icon"
          >
            {screenWidth > 600 ? "Тема" : ""}
            <FaSun className="header_button-icon" />
          </div>
        ) : (
          <div
            onClick={toggleTheme}
            className="header_button header_theme-icon"
          >
            {screenWidth > 600 ? "Тема" : ""}
            <FaMoon className="header_button-icon" />
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
