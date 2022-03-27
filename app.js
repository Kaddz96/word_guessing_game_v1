// initialize variables and selectors
const buttons = document.querySelectorAll('#qwerty');
const phrase = document.querySelector('#phrase ul');
const startGame = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');
const title = document.getElementsByClassName('title')[0];
const ul = phrase.firstElementChild;
let missed = 0;
const phrases = [
    `down to earth`,
    `wild goose chase`,
    `tug of war`,
    `knock your socks off`,
    `on cloud nine`
];

// Get a random phrase from array and return it as an array
function getRandomPhraseAsArray(arr){
    let randomNum = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomNum].split('');
    return randomPhrase;
}

// Create list item for each character in the array and add it to ul
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++){
        let li = document.createElement('li');
        li.textContent = arr[i];
        phrase.append(li);
        if (li.textContent === ' '){
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}

// Check if the letter chosen by player matches with one of the characters from the phrase
function checkLetter(button){
    const letters = document.querySelectorAll('.letter');
    let letter = null;
    for (let i = 0; i < letters.length; i++){
        if (button.textContent == letters[i].textContent){
            letters[i].classList.add('show');
            letter = letters[i].textContent;
        }
    }
    return letter;
}

// Check if all the correct letters were chosen or if user guessed incorrect 5 times
function checkWin(){
    const shownLetters = document.querySelectorAll('.show');
    const totalLetters = document.querySelectorAll('.letter');
    if (shownLetters.length === totalLetters.length){
        overlay.style.display = '';
        overlay.className = 'win';
        title.textContent = 'YOU WON!';
        startGame.style.display = 'none';
    }
    if (missed > 4){
        overlay.style.display = '';
        overlay.className = 'lose';
        title.textContent = 'YOU LOSE';
        startGame.style.display = 'none';
    }
}

// Hide start screen overlay when start button is clicked
startGame.addEventListener('click', () => {
    startGame.parentElement.style.display = 'none';
});

// Display if the letter clicked was correct or a miss
buttons[0].addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.tagName === 'BUTTON' && btn.className !== 'chosen'){
        btn.className = 'chosen';
        btn.disabled = true;
        const letterFound = checkLetter(btn);
        if (letterFound === null){
            let hearts = document.querySelector('img[src="images/liveHeart.png"]');
            missed++;
            hearts.src = 'images/lostHeart.png';
        }
        checkWin();
    }
})

const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);


