import { useState, useEffect } from "react";

export default function useTopSong(username){
    const api_key = import.meta.env.VITE_LASTFM_API_KEY;
    const api = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${api_key}&format=json&period=overall&limit=1`

    const [topTrack, setTopTrack] = useState(null);

    useEffect(() => {
        async function getTopTrack(){
            try{
                const res = await fetch(api);
                const dat = await res.json();
                const itunesQuery = encodeURIComponent(`${dat.toptracks.track['0'].name}  ${dat.toptracks.track['0'].artist.name}`);
                const image = await fetch(`/api/getAlbumArt?query=${itunesQuery}`);
                const itunesImage = await image.json();
                setTopTrack({
                    name: dat.toptracks.track['0'].name,
                    image: itunesImage?.image || dat.toptracks.track['0'].image['3']['#text']
                })
            }catch (error){
                console.log(error);
                return null;
            }
        }
        getTopTrack();
    }, [username])

    return topTrack;
}