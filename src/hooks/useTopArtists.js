import { useState, useEffect } from "react";

export default function useTopArtists(username){
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    const limit = 3;
    const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&limit=${limit}&period=overall`;
    const [topartists, setTopArtists] = useState(null);

    useEffect(() => {
        async function artists(){
                    // console.log(await fetch(`http://localhost:5173/api/getDeezerImage?name=${encodeURIComponent("neurosama")}`).text());
            try{
                const response = await fetch(lastfmUrl);
                console.log(response);
                const data = await response.json();
                const artists = await Promise.all(
                    data.topartists.artist.map(async (artist) => ({
                    rank: artist['@attr']?.rank,
                    name: artist.name,
                    link: artist.url,
                    image: (await (await fetch(`/api/getDeezerImage?artistName=${encodeURIComponent(artist.name)}`)).json()).image
                })));

                setTopArtists(artists);
        
            }catch (error) {
                console.error(error);
            }

        }
        artists();
    }, [username]);
    return topartists;
}
