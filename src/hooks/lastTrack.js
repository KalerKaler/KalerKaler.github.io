import { useState, useEffect } from 'react';

export function useLastTrack(username) {
  const [lastTrack, setLastTrack] = useState(null);

  useEffect(() => {
    async function musicFetch() {
      const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1&extended=1`;
      const placeholderFile = '2a96cbd8b46e442fc41c2b86b821562f'
      try {
        const response = await fetch(url);
        const data = await response.json();
        const raw = data.recenttracks.track;
        const track = Array.isArray(raw) ? raw[0] : raw;
        const itunesQuery = encodeURIComponent(`${track.name}  ${track.artist.name}`);
        const image = await fetch(`/api/getAlbumArt?query=${itunesQuery}`);
        const lastFmImage = track.image?.find(img => img.size === 'extralarge')?.['#text'];
        const itunesImage = await image.json();
        setLastTrack({
            artist: track.artist.name,
            name: track.name,
            url: track.url,
            isNowPlaying: track['@attr']?.nowplaying == 'true',
            albumArt: itunesImage?.image || (!lastFmImage.includes(placeholderFile) && lastFmImage) || "fallbackAlbumCover.png",
            loved: track.loved == 1,
        });
      } catch (error) {
        console.error(error);
        setLastTrack(null);
      }
    }
    musicFetch();
  }, [username]);

  return lastTrack;
}