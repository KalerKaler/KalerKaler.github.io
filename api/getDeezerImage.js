async function getDeezerImage(req, res) {
    const {artistName} = req.query;
    try {
        const result = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}&limit=1`);
        const data = await result.json();
        const image =  data.data?.[0]?.picture_xl || null;
        return res.status(200).json({image});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"IMAGE FAILED":1});
    }
}