import { useEffect, useState } from "react";
import "./Music.css";

export default function MusicPage() {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("https://kalerkaler.vercel.app/api/musicFetch?user=cwxesx")
      .then(res => res.json())
      .then(setTracks);
  }, []);

  useEffect(() => {
    fetch("https://kalerkaler.vercel.app/api/topArtists?user=cwxesx")
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
        <hr className='seperator-line' key={track.url}/>
        <div className="entry">
          <img className="thumbnail" src={track.albumArt || "//fallbackAlbumCover.png"} alt="" />
          <p>
            <strong>{track.name}</strong> - {track.artist}
          </p>
        </div>
        </>
      ))}
      </div>

        <div id="artists" className="tc">
            <h2 class="heading">Top artists of all time</h2>
            {artists.map(artist => (
                <>
                <hr class='seperator-line'/>
                <div class='entry'>
                    <p>
                        <img class='thumbnail' src={artist.image}/>
                        <a target='_blank' href={artist.link}>
                            <strong>{artist.name}</strong> - {artist.playCount} plays
                        </a>    
                    </p>
                </div>
            </>
            ))};
        </div> 
      </div>
    </>
    
  );
}