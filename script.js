const wordList = ["computer", "hangman", "programming", "science", "keyboard", "artificial", "intelligence"];
let selectedWord, guessedLetters, attemptsLeft;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

function startGame() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  attemptsLeft = 6;
  message.textContent = "";
  updateWordDisplay();
  createKeyboard();
  attemptsText.textContent = attemptsLeft;
}

function updateWordDisplay() {
  let display = "";
  for (let letter of selectedWord) {
    display += guessedLetters.includes(letter) ? letter + " " : "_ ";
  }
  wordDisplay.textContent = display.trim();
}

function createKeyboard() {
  keyboard.innerHTML = "";
  for (let i = 97; i <= 122; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.onclick = () => handleGuess(btn.textContent, btn);
    keyboard.appendChild(btn);
  }
}

function handleGuess(letter, button) {
  button.disabled = true;
  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
    updateWordDisplay();

    if (selectedWord.split("").every(l => guessedLetters.includes(l))) {
      message.textContent = "🎉 You Win!";
      disableKeyboard();
    }
  } else {
    attemptsLeft--;
    attemptsText.textContent = attemptsLeft;
    if (attemptsLeft === 0) {
      message.textContent = `💀 Game Over! Word was: ${selectedWord}`;
      disableKeyboard();
    }
  }
}

function disableKeyboard() {
  const buttons = keyboard.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);
}

restartBtn.addEventListener("click", startGame);

startGame();