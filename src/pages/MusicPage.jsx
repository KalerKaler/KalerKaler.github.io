import { useEffect, useState } from "react";
import "./Music.css";

export default function MusicPage() {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("https://kalerkaler.vercel.app/api/musicFetch?user=cwxesx&limit=14")
      .then(res => res.json())
      .then(setTracks);
      
    fetch("https://kalerkaler.vercel.app/api/topArtists?user=cwxesx&limit=15")
    .then(res => res.json())
    .then(setArtists);
  }, []);
  

  
  return (
    <>
    <div className="flex">
        <div id="music" className="tc">
        <h2 className="heading">Recently scrobbled songs</h2>

      {tracks.map(track => (
        <>
        <hr className='seperator-line' key={track.url + track.artist}/>
        <a target="_blank" href={track.url}>
        <div className="entry">
          <img className="thumbnail" src={track.albumArt || "/fallbackAlbumCover.png"} alt="" />
          <p>
            {(track.isNowPlaying) ? "🎶 " : ""}
            <strong>{track.name}</strong> - {track.artist}
          </p>
        </div>
        </a>
        </>
      ))}
      </div>

        <div id="artists" className="tc">
            <h2 className="heading">Top artists of all time</h2>
            {artists.map(artist => (
                <>
                <a target='_blank' href={artist.link}>
                <hr className='seperator-line'/>
                  <div className='entry'>
                        <img className='thumbnail' src={artist.image || "fallbackAlbumCover.png"}/>
                        <p>
                            <strong>{artist.name}</strong> - {artist.playCount} plays
                        </p>
                  </div>
                </a>    
                </>
            ))}
        </div> 
      </div>
    </>
    
  );
}