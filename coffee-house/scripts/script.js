const coffeeSlider = document.querySelector('.coffee-pictures');
const coffeeImages = Array.from(coffeeSlider.querySelectorAll('.coffee-card'));
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const coffeeCount = coffeeImages.length;
const controlsArray = Array.from(document.querySelectorAll('.control__progress'));
const coffeeSliderBox = document.querySelector('.coffee-slider');

let imageWidth = coffeeImages[0].clientWidth;
let xStart = 0;
let xEnd = 0;
let coffeeInd = 0;
let xInit = 0;
// const main = document.querySelector('main');
// const coffeeCards = Array.from(document.querySelectorAll('.coffee-card'));
let xFinal = 0;

btnPrev.addEventListener('click', () => swipeSlide('prev'));
btnNext.addEventListener('click', () => swipeSlide('next'));
controlsArray.forEach((control) => {
    control.addEventListener('animationend', () => swipeSlide('next'));
});

coffeeSlider.addEventListener('touchstart', () => {
    document.querySelector('.controls__item-active').classList.add('slider-hover');
    swipeStart();

});

coffeeSlider.addEventListener('mousedown', swipeStart);

coffeeSliderBox.onmouseenter = () => {
    document.querySelector('.controls__item-active').classList.add('slider-hover');
};

coffeeSliderBox.onmouseleave = () => {
    document.querySelector('.controls__item-active').classList.remove('slider-hover');
};

window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        swipeSlide('prev');
    } else if (event.key === 'ArrowRight') {
        swipeSlide('next');
    }

});

function showNewImages() {
    coffeeSlider.style.transition = 'transform .5s';
    imageWidth = coffeeImages[0].clientWidth;
    coffeeSlider.style.transform = `translate3d(${-imageWidth * coffeeInd}px, 0, 0)`;

    coffeeImages.forEach((slide, index) => {
        if (index === coffeeInd) {
            controlsArray[index].classList.add('controls__item-active');
        } else {
            controlsArray[index].classList.remove('controls__item-active');
        }
    });
}

showNewImages();

function swipeSlide(direction) {
    switch (direction) {
        case 'prev': {
            coffeeInd = (coffeeCount - 1 + coffeeInd) % coffeeCount;
            showNewImages();
            break;
        }
        case 'next': {
            coffeeInd = (coffeeInd + 1) % coffeeCount;
            showNewImages();
            break;
        }
    }
}

let getEvent = function () {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
};

function swipeAction() {
    let style = coffeeSlider.style.transform;
    let transform = +style.replace('translate3d(', '').replace('px', '').split(',')[0];
    let evt = getEvent();
    xEnd = xStart - evt.clientX;
    xStart = evt.clientX;
    coffeeSlider.style.transform = `translate3d(${transform - xEnd}px, 0px, 0px)`;
}

function swipeStart() {
    coffeeSlider.style.transition = 'inherit';
    let evt = getEvent();
    xInit = xStart = evt.clientX;
    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('mouseup', swipeEnd);
}

function swipeEnd() {
    let valueAfter = 0.33 * imageWidth;
    document.querySelector('.controls__item-active').classList.remove('slider-hover');
    xFinal = xInit - xStart;
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);

    if (valueAfter < Math.abs(xFinal)) {
        if (xStart > xInit) coffeeInd = (coffeeCount - 1 + coffeeInd) % coffeeCount;
        else if (xInit > xStart) coffeeInd = (coffeeInd + 1) % coffeeCount;
    }
    if (xInit !== xStart) showNewImages();
}