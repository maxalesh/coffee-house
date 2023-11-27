let coffeeInd = 0;
const coffeeSlider = document.querySelector('.coffee-pictures');
const coffeeImages = Array.from(coffeeSlider.querySelectorAll('.coffee-card'));
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const coffeeCount = coffeeImages.length;
const controlsArray = Array.from(document.querySelectorAll('.controls__item'));

btnPrev.addEventListener('click', () => swipeSlide('prev'));
btnNext.addEventListener('click', () => swipeSlide('next'));

function showNewImages(currentInd = 0) {
    coffeeInd = currentInd;
    coffeeImages.forEach((slide, index) => {
        if (index === coffeeInd) {
            slide.style.display = 'block';
            controlsArray[index].classList.add('controls__item-active')
        } else {
            slide.style.display = 'none';
            controlsArray[index].classList.remove('controls__item-active')
        }
    });
}

showNewImages()

function swipeSlide(direction) {
    switch (direction) {
        case 'prev': {
            showNewImages((coffeeCount - 1 + coffeeInd) % coffeeCount);
            break;
        }
        case 'next': {
            showNewImages((coffeeInd + 1) % coffeeCount);
            break;
        }
    }
}




