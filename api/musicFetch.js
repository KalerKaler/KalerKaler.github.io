export default async function handler(req, res) {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = req.query.user || "cwxesx";
    const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=5`;

    try {
        const response = await fetch(lastfmUrl);
        const data = await response.json();

        // 👇 LOG THE FULL RESPONSE to see what Last.fm actually returns
        console.log("Last.fm response status:", response.status);
        console.log("Last.fm response data:", JSON.stringify(data, null, 2));

        // 👇 Check if Last.fm returned an error
        if (data.error) {
            console.error("Last.fm API error:", data.message);
            return res.status(400).json({ error: `Last.fm error: ${data.message}` });
        }

        // 👇 Check if the expected structure exists
        if (!data.recenttracks || !data.recenttracks.track) {
            console.error("Unexpected response structure:", data);
            return res.status(500).json({ error: "Invalid response from Last.fm" });
        }

        const tracks = data.recenttracks.track.map(track => ({
            artist: track.artist['#text'],
            name: track.name,
            url: track.url,
            isNowPlaying: track['@attr']?.nowplaying === 'true'
        }));

        res.status(200).json(tracks);
    } catch (error) {
        console.error("Fetch or parsing error:", error);
        res.status(500).json({ error: "Failed to fetch" });
    }
}