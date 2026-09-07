import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./Header.css";

export default function Header({ C, F }) {

  const [isLightMode, setIsLightMode] = useState(false);
  const [showSubmenu , setShowSubmenu] = useState(false);
  const timeoutRef = useRef(null);

    useEffect(() => {

      if (isLightMode){
        document.body.classList.add("light-mode");
      }else{
        document.body.classList.remove("light-mode");
      }
    }, [isLightMode]);

    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowSubmenu(true); 
    }

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => setShowSubmenu(false), 100);
    }

    return (
    <>
    <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 32px",
            background: "rgba(50,42,39,0.92)",
            backdropFilter: "blur(10px)",
            borderBottom: `1px solid ${C.pink}33`,
          }}
        >
          <Link to="/" style={{ fontFamily: F.pixel, fontSize: 20, color: C.pink, letterSpacing: 4 }}>
            [ RAJVEER.DEV ]
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {[
              { label: "CERTS", href: "/certs" },
              { label: "MUSIC", href: "/music" },
            ].map((l) => (
              <Link
                // key={l.label}
                to={l.href}
                style={{ fontFamily: F.pixel, fontSize: 18, color: C.muted, letterSpacing: 2, transition: "color .15s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.teal;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.muted;
                }}
              >
                {l.label}
              </Link>
            ))}
            {[
              { href: "https://www.linkedin.com/in/rajveer-singh-64691435a/", label: "[in]" },
              { href: "https://github.com/KalerKaler",   label: "[gh]" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: F.pixel,
                  fontSize: 16,
                  color: C.muted,
                  letterSpacing: 1,
                  border: `1px solid ${C.muted}55`,
                  padding: "2px 10px",
                  transition: "all .15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = C.pink;
                  el.style.borderColor = C.pink;
                  el.style.boxShadow = `0 0 10px ${C.pink}44`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = C.muted;
                  el.style.borderColor = `${C.muted}55`;
                  el.style.boxShadow = "none";
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </header>
      {/* <img
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
      /> */}
      <div className="top-left">
        <div 
        id="menu" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
