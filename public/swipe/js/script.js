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
    './swipe/accounts/sam-hibberts/sam-hibberts.jpg',
    './swipe/accounts/daniel-markusson/daniel-markusson.jpg',
    './swipe/accounts/fraser-bryant/fraser-bryant.jpg',
    './swipe/accounts/mikel-campbell/mikel-campbell.jpg',
    './swipe/accounts/liam-fu/liam-fu.jpg',
    './swipe/accounts/warsame-houssein/warsame-houssein.jpg',
];

// variables
let cardCount = 0;
let compCalc = document.getElementById("compatability-calculator")
let compCalcCounter = 0;
var favMovie
var leastFavMovie
var favMovieShower
var leastFavMovieShower

// functions

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateCompatabilityCalculator() {

    if (compCalcCounter == urls.length - 1) {

        for (let i = 0; i < 3; i++) {
            favMovieShower = document.getElementById(`fav-movie-${i}`)
            leastFavMovieShower = document.getElementById(`least-fav-movie-${i}`)

            favMovieShower.innerHTML = "Loading..."
            leastFavMovieShower.innerHTML = "Loading..."
        }

        compCalc.innerHTML = "Netflix-compatability: Calculating..."
        setTimeout(function () {
            compCalc.innerHTML = `Netflix-compatability: ${getRandomInt(100)}%`;
            updateFavMovies()
        }, getRandomInt(3) * 1000);
    } else {
        compCalcCounter++;
    }
}

function getRandomMovie() {
    return movies[getRandomInt(movies.length)]
}

function updateFavMovies() {

    for (let i = 0; i < 3; i++) {
        favMovie = getRandomMovie()
        leastFavMovie = getRandomMovie()

        favMovieShower = document.getElementById(`fav-movie-${i}`)
        leastFavMovieShower = document.getElementById(`least-fav-movie-${i}`)

        favMovieShower.innerHTML = favMovie
        leastFavMovieShower.innerHTML = leastFavMovie
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
    updateFavMovies()
}

// first 5 cards
for (let i = 0; i < urls.length; i++) {
    appendNewCard();
}