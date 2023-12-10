'use strict';
const coffeeMenuLink = document.querySelector(".coffee-menu__link");
const tabCoffeeBtn = document.querySelector(".tab-coffee");
const tabTeaBtn = document.querySelector(".tab-tea");
const tabDessertBtn = document.querySelector(".tab-dessert");
let tabInd = 0;
const tabsBtn = [tabCoffeeBtn, tabTeaBtn, tabDessertBtn];
const cupsCards = Array.from(document.querySelectorAll(".menu__container .section"));
const closeButtons = Array.from(document.querySelectorAll(".close__btn"));
const refreshBtn = document.querySelector('.refresh');

//Modal
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const menuCards = Array.from(document.querySelectorAll(".menu__cup-card"));
const page = document.querySelector("html");
const jsonURL = "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/coffee-house/products.json";
const rangeSections = {
    coffee: {
        start: 0,
        end: 7,
    },
    tea: {
        start: 8,
        end: 11,
    },
    dessert: {
        start: 12,
        end: 19,
    },
};
let products;





tabCoffeeBtn.addEventListener("click", () => switchTabs(0));
tabTeaBtn.addEventListener("click", () => switchTabs(1));
tabDessertBtn.addEventListener("click", () => switchTabs(2));
refreshBtn.addEventListener("click", () => showMore(tabInd));

for (let closeButton of closeButtons) {
    closeButton.addEventListener("click", () => closeModal());
}

for (let cardFirst of menuCards) {
    cardFirst.addEventListener("click", () => openModal());
}

function showUnderline() {
    let currentUrl = window.location.href;
    if (currentUrl.split("/").at(-1) === "menu.html") {
        coffeeMenuLink.classList.toggle("coffee-menu__link_current");
    }
}

function switchTabs(cupInd = 0) {
    if (cupInd === 1) {
        cupsCards[1].classList.add("current");
    } else {
        refreshBtn.id = "";
        cupsCards[1].classList.remove("current");
        }
    tabInd = cupInd;
    cupsCards.forEach((item, ind) => {
        if (ind === tabInd) {
            tabsBtn[ind].setAttribute('disabled', '');
            showProducts(tabsBtn[ind].dataset.name)
            item.style.display = "flex";
            tabsBtn[ind].classList.add("active");
        } else {
            tabsBtn[ind].removeAttribute('disabled');
            item.style.display = "none";
            tabsBtn[ind].classList.remove("active");
        }
    });
}

function showMore(section) {
    let currentProducts = Array.from(cupsCards[section].children);
    currentProducts.forEach((card) => card.style.display = "flex");
    refreshBtn.id = "hidden";
}


function closeModal() {
    modalWindow.style.display = "none";
    overlay.style.display = "none";
    page.style.overflow = "inherit";
}

function openModal() {
    window.scrollTo(0, 0);
    modalWindow.style.display = "flex";
    overlay.style.display = "table";
    page.style.overflow = "hidden";
}

showUnderline();
switchTabs();

modalWindow.innerHTML = `
            <div class="modal__image-box">
                <img alt="product image" class="modal__image" src="">
            </div>

            <div class="modal__content">
                <div class="modal__text">
                    <h2 class="modal__title"></h2>
                    <p class="modal__description"></p>
                </div>

                <div class="modal__size size">
                    <h3 class="size__title">Size</h3>
                    <div class="size__btn-box">
                        <button class="size__btn tabs__button">
                            <span class="size__btn-icon button__icon">S</span>
                            <span class="button__name"></span>
                        </button>
                        <button class="size__btn tabs__button"><span class="size__btn-icon button__icon">M</span>
                            <span class="button__name"></span>
                        </button>
                        <button class="size__btn tabs__button"><span class="size__btn-icon button__icon">L</span>
                            <span class="button__name"></span>
                        </button>
                    </div>

                </div>

                <div class="modal__additives additives">
                    <h3 class="additives__title">Additives</h3>
                    <div class="additives__btn-box">
                        <button class="additives__btn tabs__button">
                            <span class="additives__btn-icon button__icon">1</span>
                            <span class="button__name"></span>
                        </button>
                        <button class="additives__btn tabs__button">
                            <span class="additives__btn-icon button__icon">2</span>
                            <span class="button__name"></span>
                        </button>
                        <button class="additives__btn tabs__button">
                            <span class="additives__btn-icon button__icon">3</span>
                            <span class="button__name"></span>
                        </button>
                    </div>
                </div>

                <div class="modal__cost cost">
                    <span class="cost__title">Total:</span>
                    <span class="cost__value"></span>
                </div>

                <div class="modal__note">
                    <img alt="info-empty" class="note__icon" src="pictures/menu/info-empty.svg">
                    <p class="note__text">The cost is not final. Download our mobile app to see the final price and
                        place your order. Earn loyalty points and enjoy your favorite coffee with up to 20%
                        discount.
                    </p>
                </div>

                <div class="modal__close">
                    <button class="close__btn">Close</button>
                </div>
            </div>
`;

async function getProductsJSON() {
        let response = await fetch(jsonURL);
//         products = await response.json();
        return (await response.json());
}

async function showProducts(section = "coffee") {
    let menuSectionEl = document.querySelector(`.menu__${section}`);
    menuSectionEl.innerHTML = '';
//     let response = await fetch(jsonURL);
//     products = await response.json();
    products = products || await getProductsJSON();
    let startInd = rangeSections[section].start;
    let endInd = rangeSections[section].end;
    for (let i = startInd; i <= endInd; i++) {
        const productCard = document.createElement("div");
        productCard.classList.add("menu__cup-card");
        productCard.innerHTML = `
        <div class="menu__cup-card">
             <div class="card__image">
                <img alt="${products[i].category}-${i+1}" src="images/menu/${products[i].category}-${i+1}.png">
             </div>
            <div class="cup-card__info">
                <div><h2 class="cup-card__name">${products[i].name}</h2></div>
                <div>
                    <p class="cup-card__description">${products[i].description}</p>
                </div>
                <div><span class="cup-card__cost">$${products[i].price}</span></div>
            </div>
        </div>
        `;

        productCard.addEventListener("click", () => openModal(i));
        menuSectionEl.appendChild(productCard);
    }
}


class MenuCard {
    constructor(props) { }
}
