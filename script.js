const theme= document.getElementById("theme");
const social_icons=document.querySelectorAll(".social");
const logs=document.querySelectorAll(".icon");
const certificates = document.querySelectorAll(".cert");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
// var covers=document.querySelectorAll(".cover_cert")]

// console.log(logs);
theme.onclick=function(){
    document.getElementById("body").classList.toggle("is-active");
    document.getElementById("name").classList.toggle("is-active");
    document.getElementById("description").classList.toggle("is-active");
    document.getElementById("cert_heading").classList.toggle("is-active");
    document.getElementById("pfp").classList.toggle("is-active");
    document.getElementById("bannerDark").classList.toggle("is-active");
    document.getElementById("bannerLight").classList.toggle("is-active");

    logs.forEach(tag =>{
        tag.classList.toggle("is-active");
    })
    social_icons.forEach(icon =>{
        icon.classList.toggle("is-active");
    })
    document.querySelectorAll(".cert-card").forEach(item =>{
        item.classList.toggle("is-active");
    })
    if (this.classList.contains("fa-moon")){
        // document.getElementById("banner").src="https://raw.githubusercontent.com/KalerKaler/Portfolio/main/assets/bannerLight.jpeg";
        this.classList.replace("fa-moon","fa-sun");
    }else{
        // document.getElementById("banner").src="https://raw.githubusercontent.com/KalerKaler/Portfolio/main/assets/bannerDark.jpeg";
        this.classList.replace("fa-sun","fa-moon");
    }
}

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
})

certificates.forEach(certificate => {
    certificate.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImage.src = certificate.src;
    })
})