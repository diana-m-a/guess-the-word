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
const messaage = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
// Starting word
const word = "magnolia";

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});