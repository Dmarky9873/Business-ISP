// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// constants
const urls = [
    './swipe/accounts/liam-stern/liam-stern.jpg',
    './swipe/accounts/ryder-jackson/ryder-jackson.jpg',
    './swipe/accounts/ryan-michaels/ryan-michaels.jpg',
    './swipe/accounts/lewis-johnson/lewis-johnson.jpg',
    './swipe/accounts/sam-hibberts/sam-hibberts.jpg'
];

// variables
let cardCount = 0;
let compCalc = document.getElementById("compatability-calculator")
let compCalcCounter = 0;

// functions
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateCompatabilityCalculator() {

    if (compCalcCounter == urls.length - 1) {

        compCalc.innerHTML = "Netflix-compatability %: Calculating..."
        setTimeout(function() {
            compCalc.innerHTML = `Netflix-compatability %: ${getRandomInt(100)}%`;
        }, getRandomInt(3) * 1000);
    } else {
        compCalcCounter++;
    }
}

function appendNewCard() {
    const card = new Card({
        imageUrl: urls[cardCount % urls.length],
        onDismiss: appendNewCard,
        onLike: () => {
            like.style.animationPlayState = 'running';
            like.classList.toggle('trigger');
        },
        onDislike: () => {
            dislike.style.animationPlayState = 'running';
            dislike.classList.toggle('trigger');
        }
    });
    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });

    updateCompatabilityCalculator()
}

// first 5 cards
for (let i = 0; i < urls.length; i++) {
    appendNewCard();
}