// The unordered list where the player’s guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
// The span for the remaining guesses paragraph 
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
// Starting word
const word = "magnolia";
// All the letters the player has guessed
const guessedLettersArray = [];

const createPlaceholder = function (word) {
    let placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

createPlaceholder(word);

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
        console.log(guessedLettersArray);
    }
};
