// Importing the findWinner function from an external module
import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle'; // Initializing the currentPlayer with 'o'

// Creating an array of all buttons
const btnField = Array.from(document.querySelectorAll('.game__field--btn'));

//Function to handle player moves
const makeMove = async (gameBoard, currentPlayer) => {
  // Disable all buttons before making a request to the API
  btnField.forEach(button => button.disabled = true);

  // Checking if it is the turn of the 'x' player
  if (currentPlayer === 'cross') {
    const response = await fetch( // Making a request to the API to get the suggested move
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: gameBoard,
        player: 'x', // Looking for a move for 'x'
      }),
    });

    const data = await response.json()     // Parsing the response data
    const { x, y } = data.position;

    const field = btnField[x + y * 10]; // Finds the element at the corresponding position
    field.click() // Simulates a click. Triggers the click event on the elemen
  };

  // Enable only empty buttons after the response is received
  btnField.forEach(button => {
    if (!button.classList.contains('game__field--circle') && !button.classList.contains('game__field--cross')) {
      button.disabled = false;
    }
  })
};

// Creating an array with '_' to represent the game board
let gameBoard = []

// Function to toggle the class and make moves
const toggleClass = (event) => {
  // Initializing the game board with '_' if it is not yet defined
  if (gameBoard.length === 0) {
    gameBoard = Array(btnField.length).fill('_');
  }
  const btnIndex = btnField.indexOf(event.target); // Getting the index of the clicked button 

  event.target.classList.add(`game__field--${currentPlayer}`); // Toggling the class of the clicked button
  // console.log(btnIndex)
  gameBoard[btnIndex] = currentPlayer === 'circle' ? 'o' : 'x'; // Making a move on the game board

  event.target.disabled = true; // Disabling the clicked button after a move has been made

  // Checking if it is the turn of the cross player
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    setTimeout(() => {        // Delaying the move of the 'x' player
      makeMove(gameBoard, currentPlayer)
    }, 500);
  } else {
    currentPlayer = 'circle';
  }

  // Checking if there is a winner or a tie after each move
  const winner = findWinner(gameBoard);
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => { // Delaying the display of the alert message
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      location.reload();
    }, 250);
  } else if (winner === 'tie') {
    setTimeout(() => {
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

