let coffeeInd = 0;
const coffeeSlider = document.querySelector(".coffee-pictures");
const coffeeImages = Array.from(coffeeSlider.querySelectorAll(".coffee-card"));
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const coffeeCount = coffeeImages.length;
const controlsArray = Array.from(document.querySelectorAll(".controls__item"));
const burgerBtn = document.querySelector('.header__menu-icon');
const burgerMenu = document.querySelector('.burger');
const main = document.querySelector('main');

btnPrev.addEventListener("click", () => swipeSlide("prev"));
btnNext.addEventListener("click", () => swipeSlide("next"));
burgerBtn.addEventListener("click", () => toggleBurgerMenu());

function showNewImages(currentInd = 0) {
    coffeeInd = currentInd;
    coffeeImages.forEach((slide, index) => {
        if (index === coffeeInd) {
            slide.style.display = "block";
            controlsArray[index].classList.add("controls__item-active");
        } else {
            slide.style.display = "none";
            controlsArray[index].classList.remove("controls__item-active");
        }
    });
}

showNewImages();

function swipeSlide(direction) {
    switch (direction) {
        case "prev": {
            showNewImages((coffeeCount - 1 + coffeeInd) % coffeeCount);
            break;
        }
        case "next": {
            showNewImages((coffeeInd + 1) % coffeeCount);
            break;
        }
    }
}

function toggleBurgerMenuIcon() {
    document.querySelector('.header__menu-icon img:nth-child(1)').classList.toggle('burger-line1-open');
    document.querySelector('.header__menu-icon img:nth-child(2)').classList.toggle('burger-line2-open');
}

function toggleBurgerMenu() {
    window.scrollTo(0, 0);
    toggleBurgerMenuIcon();
    console.log('ok');
    document.querySelector('html').classList.toggle('overflow-hidden');
    burgerMenu.classList.toggle('burger-show');
//     let hiddenMain = () => main.classList.toggle('visibility-hidden');
//     setTimeout(main.classList.toggle('visibility-hidden'), 500);
}
