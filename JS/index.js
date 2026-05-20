const theme= document.getElementById("theme");
const social_icons=document.querySelectorAll(".social");
const logs=document.querySelectorAll(".icon");
const certificates = document.querySelectorAll(".cert");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

theme.onclick=function(){
    document.getElementById("body").classList.toggle("light-mode");
    document.getElementById("name").classList.toggle("light-mode");
    document.getElementById("description").classList.toggle("light-mode");
    document.getElementById("cert_heading").classList.toggle("light-mode");
    document.getElementById("pfp").classList.toggle("light-mode");
    document.getElementById("bannerDark").classList.toggle("light-mode");
    document.getElementById("bannerLight").classList.toggle("light-mode");

    logs.forEach(tag =>{
        tag.classList.toggle("light-mode");
    })
    social_icons.forEach(icon =>{
        icon.classList.toggle("light-mode");
    })
    document.querySelectorAll(".cert-card").forEach(item =>{
        item.classList.toggle("light-mode");
    })
    if (this.classList.contains("fa-moon")){
        this.classList.replace("fa-moon","fa-sun");
    }else{
        this.classList.replace("fa-sun","fa-moon");
    }
}

lightbox.addEventListener('click', () => {
    lightbox.classList.remove("show");
})

lightboxImg.addEventListener('click', (event) => {
    event.stopPropagation();
})

certificates.forEach(certificate => {
    certificate.addEventListener('click', () => {
        lightboxImg.src = certificate.src;
        lightbox.classList.add('show');
    })
})
