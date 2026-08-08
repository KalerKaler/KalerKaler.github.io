import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {

  const [isLightMode, setIsLightMode] = useState(false);
  const [showSubmenu , setShowSubmenu] = useState(false);

    useEffect(() => {

      if (isLightMode){
        document.body.classList.add("light-mode");
      }else{
        document.body.classList.remove("light-mode");
      }
    }, [isLightMode]);
    return (
    <>
      <img
        className= {`banner ${isLightMode ? "hidden" : ""}`}
        id="bannerDark"
        src="/bannerDark.jpg"
        alt="Banner"
      />
      <img
        className= {`banner ${isLightMode ? "" : "hidden"}`}
        id="bannerLight"
        src="/bannerLight.jpg"
        alt="Banner"
      />
      <div className="top-left">
        <div 
        id="menu" 
        onMouseEnter={() => setShowSubmenu(true)}
        onMouseLeave={() => setShowSubmenu(false)}
        >
          <i className="fa-solid fa-bars social" id="menu-btn" />
          <ul id="submenu" className={showSubmenu ? "show" : ""}>
            <li>
              <Link to="/">Certifications</Link>
            </li>
            <li>
              <Link to="/music">My Listening Habits</Link>
            </li>
          </ul>
        </div>
        <i 
        className={`fa-solid social ${isLightMode ? "fa-sun" : "fa-moon"}`} 
        id="theme"
        onClick={() => setIsLightMode(!isLightMode)}
        />
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
