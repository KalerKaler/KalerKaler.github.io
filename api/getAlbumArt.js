export default async function getAlbumArt(req, res){
    const {query} = req.query;
    const endpoint = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;

    try{
        const result = await fetch(endpoint);
        const dat = await result.json();
        console.log(dat);
        return res.status(200).json({image: dat.results[0].artworkUrl100.replace("100x100bb", "1000x1000bb")});
    }catch (error){
        console.log(error);
        return res.status(500).json({image:null});
    }

}