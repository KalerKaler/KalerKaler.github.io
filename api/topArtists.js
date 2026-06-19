export default async function handler(req, res){
    const allowedOrigin = "*";
    const apiKey = process.env.LASTFM_API_KEY;
    const username = req.query.user || "cwxesx";
    const lastfmUrl = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&limit=15&period=overall`;

    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method == 'OPTIONS'){
        return res.status(200).end();
    }

    try{
        const response = await fetch(lastfmUrl);
        const data = await response.json();
        const artists = await Promise.all(
            data.topartists.artist.map(async (artist) => ({
            rank: artist['@attr']?.rank,
            name: artist.name,
            link: artist.url,
            image: await getDeezerImage(artist.name),
        })));

        res.status(200).json(artists);
    }catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to Fetch"});
    }
}

async function getDeezerImage(artistName) {
    try {
        const res = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}&limit=1`);
        const data = await res.json();
        return data.data?.[0]?.picture_xl || null;
    } catch {
        return null;
    }
}