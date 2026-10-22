import styles from './Personal.module.css';
import useIsDesktop from '../hooks/useIsDesktop';
import { useLastTrack } from '../hooks/lastTrack';
import useTrackInfo from '../hooks/trackInfo';
import useTopArtists from '../hooks/useTopArtists';
import useUserInfo from '../hooks/useUserInfo';
import useTopSong from '../hooks/useTopSong';
import mainStyles from '../App.module.css';
import lazySizes from 'lazysizes';

// Replace these with your own book covers and files in /public
const favoriteBooks = [
    { title: 'Think & Grow Rich', author: 'Napoleon Hill', cover: '/booksSection/thinkRich.png' },
    { title: 'The Ground Breaker', author: 'Kanwal Rekhi', cover: '/booksSection/groudBreaker.png' },
];

const FALLBACK_ARTIST = 'FUByEvil.jpg';

export default function Personal() {
    const isDesktop = useIsDesktop();
    const lastTrack = useLastTrack('cwxesx');
    const playCount = useTrackInfo(lastTrack, isDesktop);
    const topArtists = useTopArtists(isDesktop);
    const userInfo = useUserInfo(isDesktop);
    const topSong = useTopSong(isDesktop);

    const artist = (i) => topArtists?.[i];
    const artistImg = (i) => artist(i)?.image || FALLBACK_ARTIST;

    return (
        <section className={styles.interests}>

            <div className={styles.layout}>
                {/* Left column: artists + listening stats */}
                <div className={styles.column}>
                    <div className={`${styles.card} ${styles.artists}`}>
                        <h2 className={styles.heading}>Top Artists</h2>

                        <a href={artist(0)?.link} className={`${mainStyles.hiddenLink} ${styles.artistMain}`} target="_blank" rel="noreferrer">
                            <img src={artistImg(0)} alt="" className="lazyload"/>
                        </a>

                        <div className={styles.artistRow}>
                            <a href={artist(1)?.link} className={mainStyles.hiddenLink} target="_blank" rel="noreferrer">
                                <img src={artistImg(1)} alt="" className="lazyload"/>
                            </a>
                            <a href={artist(2)?.link} target="_blank" className={mainStyles.hiddenLink} rel="noreferrer">
                                <img src={artistImg(2)} alt="" className="lazyload"/>
                            </a>
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.stats}`}>
                        <h2 className={styles.heading}>Listening Stats</h2>

                        <div className={styles.statRow}>
                            <span className={styles.statValue}>{userInfo?.playTime ?? '--'}</span>
                            <span className={styles.statUnit}>h</span>
                        </div>

                        <div className={styles.statRow}>
                            <span className={styles.statValue}>{userInfo?.trackCount ?? '--'}</span>
                            <span className={styles.statUnit}>songs</span>
                        </div>
                    </div>
                </div>

                {/* Middle column: now playing + currently reading */}
                <div className={styles.column}>
                    <div className={`${styles.card} ${styles.nowPlaying}`}>
                        <img
                            className={styles.albumRound}
                            src={lastTrack?.albumArt}
                            alt=""
                            style={lastTrack?.isNowPlaying ? undefined : { animationPlayState: 'paused' }}
                        />

                        <div className={styles.trackBlock}>
                            <b className={styles.nowLabel}>
                                {lastTrack?.isNowPlaying ? 'NOW PLAYING' : 'LAST PLAYED'}
                            </b>

                            <a href={lastTrack?.url} target="_blank" rel="noreferrer" className={mainStyles.hiddenLink}>
                                <b className={styles.trackName}>{lastTrack?.name || 'Loading..'}</b>
                            </a>

                            <div className={styles.byRow}>
                                <img className={styles.gif} src="/cuteNuroSing.gif" alt="" />
                                <b className={styles.by}>by</b>
                                <a
                                    href={lastTrack && `https://last.fm/music/${lastTrack.artist}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={mainStyles.hiddenLink}
                                >
                                    <b className={styles.artistName}>{lastTrack?.artist}</b>
                                </a>
                            </div>
                        </div>

                        <div className={styles.plays}>
                            <b className={styles.playsLabel}>Total</b>
                            <b className={styles.playCount}>{playCount || '-'}</b>
                            <b className={styles.playsLabel}>Plays</b>
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.reading}`}>
                        <h2 className={styles.heading}>Currently Reading</h2>

                        <div className={styles.readingImages}>
                            <img className={`${styles.readingIllustration} lazyload`} src="/booksSection/nuroRead.png" alt="" />
                            <img className={`${styles.readingCover} lazyload`} src="/booksSection/steveJobs.png" alt="Steve Jobs book cover" />
                        </div>

                        <div className={styles.readingText}>
                            <b className={styles.bookTitle}>Steve Jobs</b>
                            <b className={styles.bookAuthor}>Walter Isaacson</b>
                        </div>
                    </div>
                </div>

                {/* Right column: top track + favorite books */}
                <div className={styles.column}>
                    <div className={`${styles.card} ${styles.topTrack}`}>
                        <h2 className={styles.heading}>Top Track</h2>

                        <a href={topSong?.url} target="_blank" rel="noreferrer" className={`${styles.topArt} ${mainStyles.hiddenLink}`}>
                            <img src={topSong?.image || 'image.png'} alt="" loading="lazy" />
                        </a>

                        <a href={topSong?.url} target="_blank" rel="noreferrer" className={mainStyles.hiddenLink}>
                            <b className={styles.topSongName}>{topSong?.name || 'Loading...'}</b>
                        </a>
                    </div>

                    <div className={`${styles.card} ${styles.books}`}>
                        <h2 className={styles.heading}>Favorite Books</h2>

                        <div className={styles.bookGrid}>
                            {favoriteBooks.map((book) => (
                                <img key={book.title} src={book.cover} alt={`${book.title} by ${book.author}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}