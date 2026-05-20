const musicArea = document.getElementById("music");
const theme= document.getElementById("theme");
const icons = document.querySelectorAll(".icon");

async function addMusic() {
    const response = await fetch("https://portfolioapi-one.vercel.app/api/musicFetch?user=cwxesx")
    const tracks = await response.json();

    for (let i = 0; i < 15; i++){
        musicArea.innerHTML += `<a target="_blank" href=${tracks[i].url}><p>${tracks[i].isNowPlaying ? "<strong>Listening Now - </strong>" : ""}<strong>${tracks[i].name}</strong> - ${tracks[i].artist}</p></a>`;
    }
}

addMusic();


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
