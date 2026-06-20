const musicArea = document.getElementById("music");
const artistArea = document.getElementById("artists");
const theme= document.getElementById("theme");
const icons = document.querySelectorAll(".icon");

async function addMusic() {
    const response = await fetch("https://portfolioapi-one.vercel.app/api/musicFetch?user=cwxesx")
    const tracks = await response.json();

    for (let i = 0; i < 15; i++){
        musicArea.innerHTML += `<hr class='seperator-line'>
            <div class='entry'>
                <p>
                    ${tracks[i].isNowPlaying ? "<span id='now-playing'>Listening Now - </span>" : ""} 
                    <img class='thumbnail' src=${tracks[i].albumArt != null ? `'${tracks[i].albumArt}'`: 'https://raw.githubusercontent.com/KalerKaler/Portfolio/main/assets/fallbackAlbumCover.png'}>
                    <a target="_blank" href=${tracks[i].url}>
                        <strong>${tracks[i].name}</strong> - ${tracks[i].artist}
                    </a>
                </p>
            </div>`;
    }
}

async function addArtists() {
    const respose = await fetch("https://portfolioapi-one.vercel.app/api/topArtists?user=cwxesx");
    const artists = await respose.json();

    for (let i = 0; i < 15; i++){
        artistArea.innerHTML += `<hr class='seperator-line'>
            <div class='entry'>
                <p>
                    <img class='thumbnail' src='${artists[i].image}'>
                    <a target='_blank' href='${artists[i].link}'>
                        <strong>${artists[i].name}</strong> - ${artists[i].playCount} plays
                    </a>    
                </p>
            </div>`;
    }
}

addMusic();
addArtists();

theme.onclick=function(){
    document.querySelector("body").classList.toggle("light-mode");
    document.getElementById("bannerDark").classList.toggle("light-mode");
    document.getElementById("bannerLight").classList.toggle("light-mode");

    icons.forEach(icon => {
        icon.classList.toggle("light-mode");
    })

    if (this.classList.contains("fa-moon")){
        this.classList.replace("fa-moon","fa-sun");
    }else{
        this.classList.replace("fa-sun","fa-moon");
    }
}
