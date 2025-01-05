const menuIcon = document.getElementById('menu-icon');
const menuPage = document.getElementById('menu-page');
const closeMenu = document.getElementById('close-menu');

menuIcon.addEventListener('click', () => {
    menuPage.style.left = '0%';
    menuPage.style.transition = '.4s';
});

closeMenu.addEventListener('click', () => {
    menuPage.style.left = '-100%'; 
    menuPage.style.transition = '.4s'; 
});