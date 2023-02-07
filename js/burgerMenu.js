const openMenu = document.querySelector(".head__open-menu")
const menu = document.querySelector(".menu");
const styleOfMenu = getComputedStyle(menu);
openMenu.addEventListener("click", function () {
    if (styleOfMenu.display == "none" || styleOfMenu.display == "") menu.style.display = "flex";
    else menu.style.display = "";
})