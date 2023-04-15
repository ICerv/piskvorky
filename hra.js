// Importing the findWinner function from an external module
import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle'; // Initializing the currentPlayer with a circle
const btnField = document.querySelectorAll('.game__field--btn'); // Selecting all the buttons from the game board

const gameBoard = Array.from(btnField).fill('_'); // Creating an array with '_'

// A function to toggle the class and make moves on the game board
const toggleClass = (event) => {
  const btnIndex = Array.from(btnField).indexOf(event.target); //// Getting the index of the clicked button in the game board array

  if (currentPlayer === 'circle') {
    event.target.classList.add('game__field--circle');
    document.querySelector('span').classList.remove('game__player--circle');
    document.querySelector('span').classList.add('game__player--cross');
    gameBoard[btnIndex] = 'o'; // Updating the game board with the current player's symbol
    currentPlayer = 'cross';
  } else if (currentPlayer === 'cross') {
    event.target.classList.add('game__field--cross');
    document.querySelector('span').classList.remove('game__player--cross');
    document.querySelector('span').classList.add('game__player--circle');
    gameBoard[btnIndex] = 'x'; // Updating the game board with the current player's symbol
    currentPlayer = 'circle';
  }
  event.target.disabled = true; // Disabling the clicked button after a move has been made

  // Checking if there is a winner or a tie after each move
  const winner = findWinner(gameBoard);
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => { // Delaying the display of the alert message
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      location.reload();
    }, 250);
  } else if (winner === 'tie') {
    setTimeout(() => { // Delaying the display of the alert message
      alert('Remíza!');
      location.reload();
    }, 250);
  }
};

// Adding a click event listener to each button 
btnField.forEach((button) => {
  button.addEventListener('click', toggleClass)
});

// Confirming if the user wants to restart the game
const confirmRestart = (event) => {
  if (!confirm('Opravdu chces začit novou hru?')) {
    event.preventDefault();
  }
};

// Adding a click event listener to the restart button
document.querySelector('.game__button--restart').addEventListener('click', confirmRestart);

