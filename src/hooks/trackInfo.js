import { useEffect, useState } from "react";

export default function trackInfo(track){
    const [playCount, setPlayCount] = useState(null);
    const api_key = import.meta.env.VITE_LAST_FM_API_KEY;
    const url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${track.artist}&track=${track.name}&format=json`;
    useEffect(() => {
        async function fetcher(){
            try {
                const res = await fetch(url);
                const dat = await res.json();
                setPlayCount(dat.userplaycount);
            }catch (error){
                console.log(error);
            }
        }
        fetcher();
    }, [trackInfo])
    return playCount;
}