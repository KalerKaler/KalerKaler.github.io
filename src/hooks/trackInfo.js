import { useEffect, useState } from "react";

export default function useTrackInfo(track){

    const [playCount, setPlayCount] = useState(null);
    const api_key = import.meta.env.VITE_LASTFM_API_KEY;
    useEffect(() => {
        if (!track) return;
        async function fetcher(){
            try {
                const url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${track.artist}&track=${track.name}&format=json&user=cwxesx`;
                const res = await fetch(url);
                const dat = await res.json();
                setPlayCount(dat.track.userplaycount);
            }catch (error){
                console.log(error);
            }
        }
        fetcher();
    }, [track])
    return playCount;
}