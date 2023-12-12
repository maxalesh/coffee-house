const burgerLinks = Array.from(document.querySelectorAll('.burger__link'));
const burgerMenu = document.querySelector('.burger');
const burgerBtn = document.querySelector('.header__menu-icon');
const burgerBtnInMenu = document.querySelector('.burger__menu');

burgerBtnInMenu.addEventListener("click", () => toggleBurgerMenu())
burgerBtn.addEventListener("click", () => toggleBurgerMenu());
burgerLinks.forEach((link) => link.addEventListener('click', () => toggleBurgerMenu()))

function toggleBurgerMenuIcon() {
    document.querySelector('.header__menu-icon span:nth-child(1)').classList.toggle('burger-line1-open');
    document.querySelector('.header__menu-icon span:nth-child(2)').classList.toggle('burger-line2-open');
}

function toggleBurgerMenu() {
    window.scrollTo(0, 0);
    toggleBurgerMenuIcon();
    document.querySelector('html').classList.toggle('overflow-hidden');
    burgerMenu.classList.toggle('burger-show');
}