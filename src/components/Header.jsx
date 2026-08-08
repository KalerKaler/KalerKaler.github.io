import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Header.css";

export default function Header() {
    useEffect(() => {
        const menuBtn = document.getElementById("menu-btn");
        const submenu = document.getElementById("submenu");
    
        function showSubmenu() {
            submenu.classList.add("show");
        }
    
        function hideSubmenu() {
            setTimeout(() => {
                const isOverMenu = menuBtn.matches(":hover");
                const isOverSubmenu = submenu.matches(":hover");
    
                if (!isOverMenu && !isOverSubmenu) {
                    submenu.classList.remove("show");
                }
            }, 100);
        }
    
        menuBtn.addEventListener("mouseover", showSubmenu);
        menuBtn.addEventListener("mouseout", hideSubmenu);
        submenu.addEventListener("mouseover", showSubmenu);
        submenu.addEventListener("mouseout", hideSubmenu);
    })
    return (
    <>
      <img
        className="banner"
        id="bannerDark"
        src="/bannerDark.jpg"
        alt="Banner"
      />
      <img
        className="banner light-mode"
        id="bannerLight"
        src="/bannerLight.jpg"
        alt="Banner"
      />
      <div className="top-left">
        <div id="menu">
          <i title="Click to open the Sub-Menu" className="fa-solid fa-bars social" id="menu-btn" />
          <ul id="submenu">
            <li>
              <Link to="/">Certifications</Link>
            </li>
            <li>
              <Link to="/music">My Listening Habits</Link>
            </li>
          </ul>
        </div>
        <i className="fa-solid fa-moon social" id="theme" />
      </div>
      <div className="icons">
        <a href="https://www.linkedin.com/in/rajveer-singh-64691435a/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-linkedin social" />
        </a>
        <a href="https://github.com/KalerKaler" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github social" />
        </a>
      </div>
    </>
  );
}
