const musicArea = document.getElementById("music");


async function addMusic() {
    const response = await fetch("https://portfolioapi-one.vercel.app/api/musicFetch?user=cwxesx")
    const tracks = await response.json();

    for (let i = 0; i < 15; i++){
        musicArea.innerHTML += `<a target="_blank" href=${tracks[i].url}><p>${tracks[i].name}</p></a>`;
    }
}

addMusic();
