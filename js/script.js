// The unordered list where the player’s guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
// The span for the remaining guesses paragraph 
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// Starting word
let word = "magnolia";
// All the letters the player has guessed
let guessedLettersArray = [];
// Number of remaining guesses
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    createPlaceholder(word);
};

// Starts game
getWord();

const createPlaceholder = function (word) {
    let placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message p
    message.innerText = "";
    // Contains what was entered in the input
    const guess = letterInput.value;
    // Make sure input is valid
    const validInput = validateInput(guess);
    
    if (validInput) {
        // Make a guess with the valid letter
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        // Is the input more than one letter?
    message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        // Is the input not a letter?
    message.innerText = "Please enter a letter from A to Z.";
    } else {
        // A valid single letter input
        return input
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLettersArray.includes(guess)) {
        message.innerText = "You've already guessed that letter. Try again.";
    } else {
        guessedLettersArray.push(guess);
        // console.log(guessedLettersArray);
        displayGuessedLetters();
        checkRemainingGuesses(guess);
    }
    updateWordInProgress(guessedLettersArray);
};

const displayGuessedLetters = function () {
    // Clear list
    guessedLetters.innerHTML = "";
    for (const letter of guessedLettersArray) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

const updateWordInProgress = function (guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    console.log(wordArray);

    for (const letter of wordArray) {
        if (guessedLettersArray.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    winStatus();
};

const checkRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = "The word doesn't include that letter.";
        remainingGuesses -= 1;
    } else {
        message.innerText = "Good guess! That letter is in the word.";
    }
    if (remainingGuesses === 0) {
        message.innerText = `Game over. The word is ${word}.`
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = "1 guess";
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const winStatus = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    // Reset original values
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters.innerHTML = "";
    remainingGuesses = 8;
    guessedLettersArray = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    // Show correct UI elements
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    playAgainButton.classList.add("hide");
    // Get new word
    getWord();
});