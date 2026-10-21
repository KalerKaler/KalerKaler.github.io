import ParticleImage from './ParticleImage';
import GithubContributions from './GithubStats';
import hero from '/my pfp.png';
import styles from './About.module.css';
import mainStyles from "../App.module.css"
import { useState } from 'react';


const traits = [
    'Enthusiastic',
    'Hard-Worker',
    'Logical Thinker',
    'Always ready for more',
    'Creative Programmer',
];

const skills = [
    { src: '/java.png', alt: 'Java' },
    { src: '/Python.png', alt: 'Python' },
    { src: '/C.png', alt: 'C' },
    { src: '/React.png', alt: 'React' },
    { src: '/Nyarch.png', alt: 'Nyarch Linux' },
    { src: '/NVim.png', alt: 'NeoVim' },
    { src: '/Lua.png', alt: 'Lua' },
    { src: '/Hyprland.png', alt: 'Hyprland' },
];

const LAST_UPDATED = '20-10-2026';

export default function AboutSection() {

    const [yearTotal, setYearTotal] = useState(null);
    const year = new Date().getFullYear();

    return (
        <section className={styles.about} style={{paddingTop: '5vh'}}>
            <h1 className={styles.title}>About my Professional Life</h1>

            <div className={styles.grid}>
                {/* Profile card */}
                <div className={styles.profile}>
                    <div className={`${styles.photoWrap} swiper-no-swiping`}>
                        <ParticleImage src={hero} gap={5} className={styles.photo} />
                    </div>

                    <div className={styles.contactRow}>
                        <a target="_blank" className={mainStyles.hiddenLink} href="https://cal.com/rajveer-singh-kaler/15min"><svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" className={styles.contactIcon} viewBox="0 0 24 24">
                            <path  d="M16.57 22a2 2 0 0 0 1.43-.59l2.71-2.71a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0l-1.6 1.59a7.55 7.55 0 0 1-3-1.59a7.6 7.6 0 0 1-1.59-3l1.59-1.6a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0L2.59 6A2 2 0 0 0 2 7.43A15.28 15.28 0 0 0 6.3 17.7A15.28 15.28 0 0 0 16.57 22M6 5.41L8.59 8L7.3 9.29a1 1 0 0 0-.3.91a10.1 10.1 0 0 0 2.3 4.5a10.1 10.1 0 0 0 4.5 2.3a1 1 0 0 0 .91-.27L16 15.41L18.59 18l-2 2a13.28 13.28 0 0 1-8.87-3.71A13.28 13.28 0 0 1 4 7.41zM20 11h2a8.81 8.81 0 0 0-9-9v2a6.77 6.77 0 0 1 7 7"></path>
                            <path  d="M13 8c2.1 0 3 .9 3 3h2c0-3.22-1.78-5-5-5z"></path>
                        </svg></a>
                        <a target='_blank' className={mainStyles.hiddenLink} href='mailto:photosrajveer93@gmail.com'><svg className={styles.contactIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1 1 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2m-7 6.75L6.666 6h12.668z"></path>
                            <path fill="currentColor" d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path>
                        </svg></a>
                    </div>

                    <ul className={styles.traits}>
                        {traits.map(trait => (
                            <li key={trait}>{trait}</li>
                        ))}
                    </ul>
                </div>

                {/* GitHub stats */}
                <div style={{display: 'flex', gap: '2rem'}}>
                <div className={styles.github}>
                    <div className={styles.githubBody}>
                        <div className={styles.heatmap}>
                            <GithubContributions
                                username="kalerkaler"
                                onTotal={(total) => setYearTotal(total.lastYear ?? null)}
                            />
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.yearStats}>
                            <b className={styles.bigNumber}>{yearTotal ?? '--'}</b>
                            <span className={styles.subtext}>contributions in {year}</span>
                        </div>
                    </div>
                </div>

                </div>

                {/* Skills */}
                <div className={styles.skills}>
                    {skills.map(skill => (
                        <img key={skill.alt} src={skill.src} alt={skill.alt} className={styles.skillIcon} />
                    ))}
                </div>
            </div>

            {/* Bottom row */}
            <div className={styles.bottomRow}>
                <div className={styles.joined}>
                    <div className={styles.half}>
                        <svg className={styles.bottomIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 14h-5v-1h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h4v1H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2M5 11V4h14v7zm-1 9v-4h16v4z" className="b"></path>
                            <path fill="currentColor" d="M6 17h8v2H6zm11 0a1 1 0 1 0 0 2a1 1 0 1 0 0-2" className="b"></path>
                        </svg>
                        <b className={styles.bottomLabel}>My Current Rig</b>
                    </div>

                    <div className={styles.half}>
                        <svg className={styles.bottomIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                            <path fill="currentColor" d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h15l.57-.7l.93-1.14l-.09-.16H4V8h28v8.56a8.4 8.4 0 0 1 2 1.81V8a2 2 0 0 0-2-2" className="clr-i-outline clr-i-outline-path-1"></path>
                            <path fill="currentColor" d="M7 12h17v1.6H7z" className="clr-i-outline clr-i-outline-path-2"></path>
                            <path fill="currentColor" d="M7 16h11v1.6H7z" className="clr-i-outline clr-i-outline-path-3"></path>
                            <path fill="currentColor" d="M7 23h10v1.6H7z" className="clr-i-outline clr-i-outline-path-4"></path>
                            <path fill="currentColor" d="M27.46 17.23a6.36 6.36 0 0 0-4.4 11l-1.94 2.37l.9 3.61l3.66-4.46a6.26 6.26 0 0 0 3.55 0l3.66 4.46l.9-3.61l-1.94-2.37a6.36 6.36 0 0 0-4.4-11Zm0 10.68a4.31 4.31 0 1 1 4.37-4.31a4.35 4.35 0 0 1-4.37 4.31" className="clr-i-outline clr-i-outline-path-5"></path>
                            <path fill="none" d="M0 0h36v36H0z"></path>
                        </svg>
                        <b className={styles.bottomLabel}>My Certificates</b>
                    </div>
                </div>

                <div className={styles.updated}>
                    <b className={styles.updatedLabel}>Last Updated</b>
                    <b className={styles.updatedDate}>{LAST_UPDATED}</b>
                </div>
            </div>
        </section>
    );
}