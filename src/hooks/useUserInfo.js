import { useState, useEffect } from "react";

export default function useUserInfo(username){
    const [userInfo, setUserInfo] = useState(null);
    const api_key = import.meta.env.VITE_LASTFM_API_KEY;

    useEffect(() => {
        async function getInfo(){
            try{
                const api = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${api_key}&format=json`;
                const res = await fetch(api);
                const dat = await res.json();
                console.log(dat);
                const playHours = (dat.user.playcount * 4) / 60;
                setUserInfo({
                    trackCount: dat.user.track_count,
                    artistCount: dat.user.artist_count,
                    playTime: playHours.toFixed(0),
                })
            }catch (error){
                console.log(error);
                return null;
            }
        }
        getInfo();
    }, [username])
    return userInfo;
}