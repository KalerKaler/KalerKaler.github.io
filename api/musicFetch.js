export default async function handler(req, res){
    const allowedOrigins = "*";
    // const allowedOrigins = "https://kalerkaler.github.io/music.html";
    const apiKey = process.env.LASTFM_API_KEY;
    const username = req.query.user || "cwxesx";
    const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&format=json`;

    res.setHeader('Access-Control-Allow-Origin', allowedOrigins);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try{
        const response = await fetch(lastfmUrl);
        const data = await response.json()

        const tracks = data.recenttracks.track.map(track => ({
            artist: track.artist['#text'],
            name: track.name,
            url: track.url,
            isNowPlaying: track['@attr']?.nowplaying == 'true',
            albumArt: track.image?.find(img => img.size === 'extralarge')?.['#text'] || null
        }));

        res.status(200).json(tracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetck"});
    }
}