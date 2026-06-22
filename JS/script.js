const menuBtn = document.getElementById("menu-btn");
const submenu = document.getElementById("submenu");

function showSubmenu() {
    submenu.classList.add("show");
}

function hideSubmenu() {
    setTimeout(() => {
        isOverMenu = menuBtn.matches(":hover");
        isOverSubmenu = submenu.matches(":hover");

        if (!isOverMenu && !isOverSubmenu) {
            submenu.classList.remove("show");
        }
    }, 100);
}

menuBtn.addEventListener("mouseover", showSubmenu);
menuBtn.addEventListener("mouseout", hideSubmenu);
submenu.addEventListener("mouseover", showSubmenu);
submenu.addEventListener("mouseout", hideSubmenu);