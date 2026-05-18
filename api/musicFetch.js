export default async function handler(req, res){
    console.log(process.env.LASTFM_API_KEY);
    console.log("WAT");
    const apiKey = process.env.LASTFM_API_KEY;
    const username = req.query.user || "cwxesx";
    const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&format=json`;

    try{
        const response = await fetch(lastfmUrl);
        console.log(response);
        const data = await response.json()
        console.log(data);

        const tracks = data.recenttracks.track.map(track => ({
            artist: track.artist['#text'],
            name: track.name,
            url: track.url,
            isNowPlaying: track['@attr']?.nowplaying == 'true'
        }));

        res.status(200).json(tracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetck"});
    }
}