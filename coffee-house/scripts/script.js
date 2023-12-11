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

btnPrev.addEventListener("click", () => swipeSlide("prev"));
btnNext.addEventListener("click", () => swipeSlide("next"));
coffeeSliderBox.onmouseenter = () => {
    disableAutoSwitch()
    console.log('onmouseenter')
}

coffeeSliderBox.onmouseleave = () => {
    autoSwitch()
    console.log('onmouseleave')
};

// coffeeCards.forEach((card) => {
//     card.onmouseenter = () => {
//         disableAutoSwitch()
//         console.log('onmouseenter')
//     }
//     card.onmouseleave = () => {
//         autoSwitch()
//         console.log('onmouseleave')
//     }
// });



function showNewImages(currentInd = 0) {
    const imagesWidth = coffeeImages[0].clientWidth;
    coffeeInd = currentInd;

    coffeeSlider.style.transform = `translateX(${-imagesWidth * coffeeInd}px)`;

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
            showNewImages((coffeeCount - 1 + coffeeInd) % coffeeCount);
            break;
        }
        case "next": {
            showNewImages((coffeeInd + 1) % coffeeCount);
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

