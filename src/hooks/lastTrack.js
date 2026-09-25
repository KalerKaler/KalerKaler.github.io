import { useState, useEffect } from 'react';

export function useLastTrack(username) {
  const [lastTrack, setLastTrack] = useState(null);

  useEffect(() => {
    async function musicFetch() {
      const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1&extended=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const raw = data.recenttracks.track;
        const track = Array.isArray(raw) ? raw[0] : raw;
        setLastTrack({
            artist: track.artist.name,
            name: track.name,
            url: track.url,
            isNowPlaying: track['@attr']?.nowplaying == 'true',
            albumArt: track.image?.find(img => img.size === 'extralarge')?.['#text'] || null,
            loved: track.loved == 1,
        });
      } catch (error) {
        console.error(error);
      }
    }
    musicFetch();
  }, [username]);

  return lastTrack;
}