let coffeeInd = 0;
const coffeeSlider = document.querySelector(".coffee-pictures");
const coffeeImages = Array.from(coffeeSlider.querySelectorAll(".coffee-card"));
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const coffeeCount = coffeeImages.length;
const controlsArray = Array.from(document.querySelectorAll(".controls__item"));
const main = document.querySelector('main');
const coffeeCards = Array.from(document.querySelectorAll('.coffee-card'));
const coffeeSliderBox = document.querySelector('.coffee-slider');
const imageWidth = coffeeImages[0].clientWidth;

btnPrev.addEventListener("click", () => swipeSlide("prev"));
btnNext.addEventListener("click", () => swipeSlide("next"));
//
coffeeSlider.addEventListener('touchstart', swipeStart);
coffeeSlider.addEventListener('mousedown', swipeStart);

coffeeSliderBox.onmouseenter = () => {
    disableAutoSwitch()
    console.log('onmouseenter')
}

coffeeSliderBox.onmouseleave = () => {
    autoSwitch()
    console.log('onmouseleave')
};

// Переключение слайдов через клавиатуру
window.addEventListener('keydown', function(event) {
     if (event.key === 'ArrowLeft') {
        swipeSlide('prev')
     } else if (event.key === 'ArrowRight') {
        swipeSlide('next')
     }

});


function showNewImages() {
    coffeeSlider.style.transition = 'transform .5s';
    coffeeSlider.style.transform = `translate3d(${-imageWidth * coffeeInd}px, 0, 0)`;

//     Перключение индикаторов под фото
    coffeeImages.forEach((slide, index) => {
            if (index === coffeeInd) {
                controlsArray[index].classList.add('controls__item-active');
            } else {
                controlsArray[index].classList.remove('controls__item-active')
            }
        });
}

showNewImages();

function swipeSlide(direction) {
    switch (direction) {
        case "prev": {
            coffeeInd = (coffeeCount - 1 + coffeeInd) % coffeeCount
            showNewImages();
            break;
        }
        case "next": {
            coffeeInd = (coffeeInd + 1) % coffeeCount
            showNewImages();
            break;
        }
    }
}

    let onAutoSwitch = null;

    function autoSwitch() {
      clearInterval(onAutoSwitch);
      if (!onAutoSwitch) {
        onAutoSwitch = setInterval(()=> showNewImages((coffeeInd + 1) % coffeeCount), 5000);
      }
    }

    autoSwitch()

    function disableAutoSwitch() {
        console.log(onAutoSwitch)
        clearInterval(onAutoSwitch);
        onAutoSwitch = null;
    }


// Прокручивание слайдера пальцем либо движением мышкой
let posX1 = 0;
let posX2 = 0
let posInit = 0;
let posFinal = 0;
let posThreshold = imageWidth * 0.35;
let regExp = /([-0-9.]+(?=px))/

let getEvent = function() {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
}

function swipeStart() {
     let evt = getEvent();

     posInit = posX1 = evt.clientX;

     coffeeSlider.style.transition = 'inherit';

     document.addEventListener('touchmove', swipeAction);
     document.addEventListener('touchend', swipeEnd);

     document.addEventListener('mousemove', swipeAction);
     document.addEventListener('mouseup', swipeEnd);
}

function swipeAction() {
        let evt = getEvent();
        let style = coffeeSlider.style.transform;
        let transform = +style.match(regExp)[0];


        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        coffeeSlider.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
}

function swipeEnd() {
     posFinal = posInit - posX1;

     document.removeEventListener('touchmove', swipeAction);
     document.removeEventListener('mousemove', swipeAction);
     document.removeEventListener('touchend', swipeEnd);
     document.removeEventListener('mouseup', swipeEnd);

     if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
            coffeeInd = (coffeeCount - 1 + coffeeInd) % coffeeCount
          } else if (posInit > posX1) {
            coffeeInd = (coffeeInd + 1) % coffeeCount
          }
     }

     if (posInit !== posX1) {
        showNewImages();
     }
}

// coffeeSlider.style.transform = 'translate3d(0px, 0px, 0px)';