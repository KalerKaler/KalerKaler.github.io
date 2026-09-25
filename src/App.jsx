import styles from './App.module.css';

export default function Main(){
    
    return(
        <>
            <nav className={styles.navBar}>
                <h2 className={styles.kalerkaler}>KALERKALER</h2>
                <div className={styles.iconBox}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
                        <path clip-rule="evenodd" d="M1 2.838A1.84 1.84 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.84 1.84 0 0 1 21.161 23H2.838A1.84 1.84 0 0 1 1 21.161zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708zm-5.5 10.403h3.208V9.25H4.208zM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none">
                            <g clip-path="url(#SVGXv8lpc2Y)">
                                <path fill="#b5d0ea" fill-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12" clip-rule="evenodd" />
                            </g>
                            <defs>
                                <clipPath id="SVGXv8lpc2Y">
                                    <path fill="#fff" d="M0 0h24v24H0z" />
                                </clipPath>
                            </defs>
                        </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={styles.icon}>
                        <path d="M0 0h128v128H0z" fill="none" />
                        <path fill="#b5d0ea" d="M76.992.002C75.171-.035 73.362.627 72 1.998l-53.432 53.87c-5.19 5.237-7.904 12.464-7.904 20.454s2.715 15.447 7.904 20.674l23.004 23.26c5.19 5.221 12.363 7.744 20.283 7.744s15.095-2.731 20.295-7.969l13.803-14.064c2.72-2.742 2.625-7.281-.207-10.135s-7.334-2.948-10.049-.207l-14.273 13.904c-2.464 2.491-5.878 3.532-9.649 3.532s-7.18-1.04-9.654-3.532L29.197 86.26c-2.47-2.49-3.71-6.134-3.71-9.937s1.24-7.237 3.71-9.728l22.856-23.362c2.47-2.49 5.953-3.439 9.718-3.439c3.766 0 7.18 1.038 9.649 3.53l14.271 13.9c2.72 2.746 7.223 2.65 10.055-.203c2.832-2.86 2.927-7.398.207-10.14L82.15 32.823c-3.461-3.445-7.845-5.952-12.757-7.093l-.182-.04l13.05-13.35c2.732-2.74 2.636-7.284-.197-10.138a7.36 7.36 0 0 0-5.072-2.2M56.937 69.379c-3.712 0-6.718 3.22-6.718 7.178s3.001 7.18 6.718 7.18h53.678c3.712.005 6.72-3.217 6.72-7.18c0-3.958-3.008-7.178-6.72-7.178z" />
                    </svg>


                </div>

            </nav>
        <div className={styles.container}>
            <section className={styles.section}>
                <h2 className={styles.name}>Rajveer Singh Kaler</h2>
                <img className={styles.beegNuro} src='beegNuro.png'/>
            </section>
            <section className={styles.section} style={{ "margin-top": "1.51rem", height: "500vh", "padding-top": "6rem"}}>
                <div className={styles.musicBlock}>
                    <div className={styles.musicAndArtist}>
                        <div className={styles.artistCards}>
                            <b className={styles.artistsText}>Top Artists</b>
                            <div className={styles.flex}>
                                <img className={styles.mostArtist} src="HEH8WGkaAAAeJay.jpg" alt="" />
                                <div className={styles.felxCol}>
                                    <img className={styles.secMostArtist} src="HEH8WGkaAAAeJay.jpg" alt="" />
                                    <div className={`${styles.flex} ${styles.rm1} ${styles.minArtists}`}>
                                        <img className={styles.thirMostArtist} src="HEH8WGkaAAAeJay.jpg" alt="" />
                                        <img className={styles.forMostArtist} src="HEH8WGkaAAAeJay.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.musicPlayer}>
                            <img className={styles.nowPlayingIcon} src="image.png" alt="" />
                            <b className={styles.nowPlayingTitle}>Colorful Array</b>
                            <b className={styles.nowPlayingArtist}>Neuro-sama</b>
                            <b className={styles.nowPlaying}>NOW PLAYING</b>
                            <b className={styles.by}>by</b>
                            <img className={styles.cutenurosing} src="cuteNuroSing.gif" alt="" />
                        </div>
                    </div>
                    {/* Here starts AI code */}
                <div className={styles.statsContainer}>
                {/* Background SVG defining the 180° rotated L-shape with continuous outer border */}
                <svg
                    className={styles.shapeBg}
                    viewBox="0 0 526 522"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                    d="
                        M 34 0
                        H 492
                        A 34 34 0 0 1 526 34
                        V 488
                        A 34 34 0 0 1 492 522
                        H 185
                        A 34 34 0 0 1 151 488
                        V 270
                        H 34
                        A 34 34 0 0 1 0 236
                        V 34
                        A 34 34 0 0 1 34 0
                        Z
                        "
                    fill="#222224"
                    stroke="#6B3265"
                    strokeWidth="1.5"
                    />
                </svg>

                {/* Content Overlay */}
                <div className={styles.content}>
                    <h2 className={styles.totalListeningStats}>Total Listening Stats on Record</h2>

                    <div className={styles.statItemH}>
                    <span className={styles.value}>125</span>
                    <span className={styles.unit}>h</span>
                    </div>

                    <div className={styles.statItemSongs}>
                    <span className={styles.value}>150</span>
                    <span className={styles.unit}>songs</span>
                    </div>

                    <div className={styles.statItemArtists}>
                    <span className={styles.value}>200</span>
                    <span className={styles.unit}>Artists</span>
                    </div>
                </div>
                </div>

            {/* Here ends AI code */}
                <div className={styles.mostPlayedTrack}>
                    <b className={styles.topTrack}>Top Track</b>
                    <img className={styles.topImage} src="image.png" alt="" />
                    <b className={styles.topSong}>Colorful Array</b>
                </div>
            </div>

            
            </section>
        </div>
        </>
    )
}