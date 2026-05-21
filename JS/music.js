const musicArea = document.getElementById("music");
const artistArea = document.getElementById("artists");
const theme= document.getElementById("theme");
const icons = document.querySelectorAll(".icon");

async function addMusic() {
    const response = await fetch("https://portfolioapi-one.vercel.app/api/musicFetch?user=cwxesx")
    const tracks = await response.json();
    // console.log(tracks);

    for (let i = 0; i < 15; i++){
        musicArea.innerHTML += "<div class='entry'><p>";
        if (tracks[i].isNowPlaying){
            musicArea.innerHTML += "<span id='now-playing'>Listening Now - </span>"
        }
        if (tracks[i].albumArt != null){
            musicArea.innerHTML += `<img class='thumbnail' src='${tracks[i].albumArt}'>`;
        }
        musicArea.innerHTML += `<a target="_blank" href=${tracks[i].url}>
            <strong>${tracks[i].name}</strong> - ${tracks[i].artist}
        </a></p>`;
        musicArea.innerHTML += "</div>";
    }
}

async function addArtists() {
    const respose = await fetch("https://portfolioapi-one.vercel.app/api/topArtists?user=cwxesx");
    const artists = await respose.json();
    console.log(artists);

    for (let i = 0; i < 10; i++){
        artistArea.innerHTML += `<div class='entry'><p><a target='_blank' href='${artists[i].link}'>${artists[i].rank} - ${artists[i].name}</a></p></div>`;
        console.log(artists[i].imageUrl);
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
