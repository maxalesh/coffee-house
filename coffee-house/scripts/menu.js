const coffeeMenuLink = document.querySelector('.coffee-menu__link');
const tabCoffeeBtn = document.querySelector('.tab-coffee');
const tabTeaBtn = document.querySelector('.tab-tea');
const tabDessertBtn = document.querySelector('.tab-dessert');
let tabInd = 0;
const tabsBtn = [tabCoffeeBtn, tabTeaBtn, tabDessertBtn];
const cupsCards = Array.from(document.querySelector('.menu__container').children);
const closeButtons = Array.from(document.querySelectorAll('.close__btn'));
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const menuCardsFirst = Array.from(document.querySelectorAll('.cup-card__first'));
const page = document.querySelector('html')

tabCoffeeBtn.addEventListener('click', () => switchTabs(0));
tabTeaBtn.addEventListener('click', () => switchTabs(1));
tabDessertBtn.addEventListener('click', () => switchTabs(2));

for (let closeButton of closeButtons) {
    closeButton.addEventListener('click', () => closeModal())
}

for (let cardFirst of menuCardsFirst) {
    cardFirst.addEventListener('click', () => openModal())
}

function showUnderline() {
    let currentUrl = window.location.href;
    if (currentUrl.split('/').at(-1) === 'menu.html') {
        coffeeMenuLink.classList.toggle('coffee-menu__link_current');
    }
};

function switchTabs(cupInd = 0) {
    tabInd = cupInd;
    cupsCards.forEach((item, ind) => {
        if (ind === tabInd) {
            item.style.display = 'flex';
            tabsBtn[ind].classList.add('active');
        } else {
            item.style.display = 'none';
            tabsBtn[ind].classList.remove('active');
        }
    })
}

function closeModal() {
    modalWindow.style.display = 'none';
    overlay.style.display = 'none';
    page.style.overflow = 'inherit';
}

function openModal() {
    window.scrollTo(0, 0)
    modalWindow.style.display = 'flex';
    overlay.style.display = 'table';
    page.style.overflow = 'hidden';

}

showUnderline()
switchTabs()
