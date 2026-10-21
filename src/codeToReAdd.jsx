    <div className={styles.musicBlock}>
                    <div className={styles.musicAndArtist}>
                        {/* ARTIST CARD */}
                        {isDesktop && <div className={styles.artistCards}>
                            <b className={styles.artistsText}>Top Artists</b>
                            <div className={styles.flex}>
                                <a href={topArtists && topArtists[0].link} target='_blank' className={styles.hiddenLink}><img loading='lazy' className={styles.mostArtist} src={(topArtists && topArtists[0].image) || "FUByEvil.jpg"} alt="" /></a>
                                <div className={styles.felxCol}>
                                    <a href={topArtists && topArtists[1].link} target='_blank' className={styles.hiddenLink}><img loading='lazy' className={styles.secMostArtist} src={(topArtists && topArtists[1].image) || "FUByEvil.jpg"} alt="" /></a>
                                    <div className={`${styles.flex} ${styles.rm1} ${styles.minArtists}`}>
                                        <a href={topArtists && topArtists[2].link} target='_blank' className={styles.hiddenLink}><img loading='lazy' className={styles.thirMostArtist} src={(topArtists && topArtists[2].image) || "FUByEvil.jpg"} alt="" /></a>
                                        <a href={topArtists && topArtists[3].link} target='_blank' className={styles.hiddenLink}><img loading='lazy' className={styles.forMostArtist} src={(topArtists && topArtists[3].image) || "FUByEvil.jpg"} alt="" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {/* MUSIC PLAYER */}
                        <div className={styles.musicPlayer}>
                            <img
                                className={styles.albumArt}
                                style={lastTrack && lastTrack.isNowPlaying ? {} : { animationPlayState: "paused" }}
                                src={lastTrack && lastTrack.albumArt}
                                alt=""
                            />

                            <div className={styles.trackInfo}>
                                <b className={styles.playingStatus}>
                                {lastTrack && lastTrack.isNowPlaying ? "NOW PLAYING" : "LAST PLAYED"}
                                </b>

                                <a href={lastTrack && lastTrack.url} className={styles.hiddenLink} target="_blank"><b className={styles.songName}>
                                {(lastTrack && lastTrack.name) || "Loading.."}
                                </b></a>

                                <div className={styles.byRow}>
                                <img className={styles.cutenurosing} src="cuteNuroSing.gif" alt="" />
                                <b className={styles.by}>by</b>
                                <a href={lastTrack && `https://last.fm/music/${lastTrack.artist}`} className={styles.hiddenLink} target='_blank'><b className={styles.artistName}>{lastTrack && lastTrack.artist}</b></a>
                                </div>
                            </div>
                            {isDesktop && <><div className={styles.seperatorLine} />

                            <div className={styles.totalPlays}>
                                <b className={styles.total}>Total</b>
                                <b className={styles.playCount}>{playCount || "-"}</b>
                                <b className={styles.plays}>Plays</b>
                            </div></>}
                        </div>
                    </div>
                    {/* Here starts AI code */}
                {isDesktop && <div className={styles.statsContainer}>
                {/* Background SVG defining the 180° rotated L-shape with continuous outer border */}
                <svg
                    className={styles.shapeBg}
                    viewBox="0 0 526 602"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="
                        M 34 0
                        H 492
                        A 34 34 0 0 1 526 34
                        V 538
                        A 34 34 0 0 1 492 572
                        H 185
                        A 34 34 0 0 1 151 538
                        V 275
                        H 34
                        A 34 34 0 0 1 0 245
                        V 34
                        A 34 34 0 0 1 34 0
                        Z
                        "
                        fill="#222224"
                        stroke="#6B3265"
                        strokeWidth="1"
                    />
                </svg>
                {/* Content Overlay */}
                <div className={styles.content}>
                    <h2 className={styles.totalListeningStats}>All my listening habits that are on record</h2>

                    <div className={styles.statItemH}>
                    <span className={styles.value}>{(userInfo && userInfo.playTime) || "--"}</span>
                    <span className={styles.unit}>h</span>
                    </div>

                    <div className={styles.statItemSongs}>
                        <span className={styles.value}>{(userInfo && userInfo.trackCount) || "--"}</span>
                        <span className={styles.unit}>songs</span>
                    </div>

                    <div className={styles.statItemArtists}>
                    <span className={styles.value}>{(userInfo && userInfo.artistCount) || "--"}</span>
                    <span className={styles.unit}>Artists</span>
                    </div>
                </div>
                </div>}

            {/* Here ends AI code */}
                {isDesktop && <div className={styles.mostPlayedTrack}>
                    <b className={styles.topTrack}>Top Track</b>
                    <a href={topSong && topSong.url} className={styles.hiddenLink} target='_blank'><img className={styles.topImage} src={(topSong && topSong.image) || "image.png"} loading='lazy' alt="" /></a>
                    <a href={topSong && topSong.url} className={styles.hiddenLink} target='_blank'><b className={styles.topSong}>{(topSong && topSong.name) || "Loading..."}</b></a>
                </div>}
            </div>

            {/* Cetificates */}

            <div className={styles.certifications}>
                <div className={styles.certLabels}>
                    <div className={styles.dropdown} ref={wrapperRef}>
                        <b onClick={() => setSubmenu(o => !o)} className={styles.dropdownSelection}>{certCat}</b>
                        <ul className={`${styles.certsSubmenu} ${submenu ? styles.open: ""}`}>
                            {certCategories.map(category => (
                                <li onClick={() => handleSelect(category)}>{category}</li>
                            ))}
                        </ul>
                        
                    </div>
                    <b className={styles.certHeading}>CERTIFICATIONS</b>
                </div>
                <div className={styles.certContainer}>
                    {certs.map(cert => (
                        (certCat == "ALL" || cert.category == certCat) && <div className={styles.certDiv}><p className={styles.certDivHeader}>{cert.label}</p><img className={styles.certImage} src={cert.src}/></div>
                    ))}
                </div>
            </div>
            <ParticleImage src={hero} className={styles.fuq}/>
            <GithubContributions username='kalerkaler'/>