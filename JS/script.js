const menuBtn = document.getElementById("menu-btn");
const submenu = document.getElementById("submenu");

menuBtn.addEventListener('click', () => {
    submenu.classList.toggle("active");
})
