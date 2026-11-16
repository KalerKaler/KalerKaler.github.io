import { useEffect, useState } from "react";
import styles from "./Projects.module.css";

const projects = [
  {
    id: "synced-lyrics",
    title: "Synced Lyrics",
    eyebrow: "Noctalia plugin",
    sub: "A Noctalia plugin that fetches and displays lyrics with a beautiful animation.",
    features: [
      ["Multi-Provider fetching", "Fetches lyrics from multiple providers simultaneously"],
      ["Player independent", "Works with any and every music player that provides MPRIS data"],
      ["Customizable to YOU", "Customizable to your setup and requirements"],
      ["Open Source", "Completely open source and inviting contributions."],
    ],
    links: [
      { label: "View on GitHub", href: "https://github.com/noctalia-dev/community-plugins/tree/main/synced-lyrics", primary: true },
      { label: "See on Noctalia Store", href: "https://noctalia.dev/plugins/community/synced-lyrics"}
    ],
  },
];

export default function Projects({ isOpen, onClose }) {
  const [index, setIndex] = useState(0);

  const project = projects[index];
//   const isFirst = index === 0;
//   const isLast = index === projects.length - 1;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(projects.length - 1, i + 1));

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // if (e.key === "ArrowLeft") prev();
      // if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    // Robust body scroll lock
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  return (
    <>
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Projects">
        

        {/* <header className={styles.mnav}>
          <button className={styles.arrow} onClick={prev} disabled={isFirst} aria-label="Previous project">
            ‹
          </button>
          <div className={styles.mcount}>
            <b className={styles.title}>{project.title}</b>
            <span>
              {index + 1} of {projects.length}
            </span>
          </div>
          <button className={styles.arrow} onClick={next} disabled={isLast} aria-label="Next project">
            ›
          </button>
        </header> */}

        <div className={styles.scroll}>
          <section className={styles.hero}>
            <div className={styles.eyebrow}>{project.eyebrow}</div>
            <h2>{project.title}</h2>
            <p className={styles.sub}>{project.sub}</p>
            {/* <div className={styles.badges}>
              {project.badges.map((b) => (
                <span key={b} className={styles.badge}>
                  {b}
                </span>
              ))}
            </div> */}
          </section>

          <div className={styles.body}>
            <section>
              <h3>Features</h3>
              <div className={styles.features}>
                {project.features.map(([title, text]) => (
                  <div key={title} className={styles.feat}>
                    <b>{title}</b>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3>Links</h3>
              <div className={styles.links}>
                {project.links.map((l) => (
                  <a target="_blank" key={l.label} href={l.href} className={`${styles.btn} ${l.primary ? styles.primary : ""}`}>
                    {l.label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}