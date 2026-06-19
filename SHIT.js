// test-image.js — run with `node test-image.js "Artist Name"`
async function fetchFromTheAudioDB(artistName) {
    const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(artistName)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const artist = data.artists?.[0];
    let image = artist?.strArtistThumb || artist?.strArtistWideThumb;
    if (image && (image.includes('no-image') || image.includes('placeholder'))) return null;
    return image || null;
}

async function fetchFromDeezer(artistName) {
    const url = `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}&limit=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const imageUrl = data.data?.[0]?.picture_medium;
    if (!imageUrl) return null;

    // Detect Deezer placeholder patterns
    if (imageUrl.includes('250x250-000000-80-0-0') || // specific placeholder
        imageUrl.includes('/default/') ||
        imageUrl.includes('noimage') ||
        imageUrl.match(/\/artist\/[a-f0-9]{32}\/250x250-/)) { // generic placeholder pattern
            console.log(`   ⚠️ Skipping Deezer placeholder for "${artistName}"`);
            return null;
        }
        return imageUrl;
}

async function getArtistImage(artistName) {
    console.log(`🔍 Searching for "${artistName}"...`);

    let image = await fetchFromTheAudioDB(artistName);
    if (image) {
        console.log(`✅ Found on TheAudioDB:`);
        console.log(image);
        return image;
    }

    image = await fetchFromDeezer(artistName);
    if (image) {
        console.log(`✅ Found on Deezer (real image):`);
        console.log(image);
        return image;
    }

    console.log(`❌ No real image found for "${artistName}"`);
    return null;
}

const artist = process.argv[2] || "Neuro sama";
getArtistImage(artist).catch(console.error);
