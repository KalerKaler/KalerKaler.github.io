import React, { createContext, useContext, useState, useEffect } from "react";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch once if data is not already loaded
    if (tracks.length === 0 && artists.length === 0) {
      setLoading(true);

      Promise.all([
        fetch("https://kalerkaler.vercel.app/api/musicFetch?user=cwxesx&limit=15").then((r) => r.json()),
        fetch("https://kalerkaler.vercel.app/api/topArtists?user=cwxesx&limit=15").then((r) => r.json()),
      ])
        .then(([tracksData, artistsData]) => {
          setTracks(tracksData || []);
          setArtists(artistsData || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch music data:", err);
          setError(err);
          setLoading(false);
        });
    }
  }, [tracks.length, artists.length]);

  return (
    <MusicContext.Provider value={{ tracks, artists, loading, error }}>
      {children}
    </MusicContext.Provider>
  );
}

// Custom hook for clean imports
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
