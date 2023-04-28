// Import the findWinner function from an external module
import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle'; // Initialize the currentPlayer with 'o'

// Create an array of all buttons
const btnField = Array.from(document.querySelectorAll('.game__field--btn'));

// Disable all buttons before making a request to API
const disableAllButtons = () => {
  btnField.forEach(button => button.disabled = true);
}

// Enable only empty buttons after the response is received
const enableEmptyButtons = () => {
  btnField.forEach(button => {
    if (!button.classList.contains('game__field--circle') && !button.classList.contains('game__field--cross')) {
      button.disabled = false;
    }
  });
};

//Function to handle player moves
const makeMove = async (gameBoard, currentPlayer) => {
  disableAllButtons();

  // Check if it is the turn of the 'x' player
  if (currentPlayer === 'cross') {
    const response = await fetch( // Make a request to API to get the suggested move
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: gameBoard,
        player: 'x', // Look for a move for 'x'
      }),
    });
    enableEmptyButtons();

    const data = await response.json()     // Parse the response data
    const { x, y } = data.position;

    const field = btnField[x + y * 10]; // Find the element at the corresponding position
    field.click() // Simulate  a click. Trigger the click event on the element
  };
};

let gameBoard = [];

// Function to toggle the class and make moves
const toggleClass = (event) => {
  // Initialize the game board with '_' if it is not yet defined
  if (gameBoard.length === 0) {
    gameBoard = Array(btnField.length).fill('_');
  }
  const btnIndex = btnField.indexOf(event.target); // Get the index of the clicked button 

  event.target.classList.add(`game__field--${currentPlayer}`); // Toggle the class of the clicked button

  event.target.disabled = true; // Disable the clicked button after a move has been made

  // Check whether the current player is "o" or not
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross'; //If the current player is 'o', set the currentPlayer to 'x'
    gameBoard[btnIndex] = 'o';  // Update gameBoard array at the specified index to "o"
    // Update the player indicator to show "x"
    document.querySelector('span').classList.remove('game__player--circle');
    document.querySelector('span').classList.add('game__player--cross');
    setTimeout(() => {        // Delaying the move of the 'x' player
      makeMove(gameBoard, currentPlayer)
    }, 500);
  } else {
    currentPlayer = 'circle';
    gameBoard[btnIndex] = 'x';
    // Update the player indicator to show "o"
    document.querySelector('span').classList.remove('game__player--cross');
    document.querySelector('span').classList.add('game__player--circle');
  };

  // Check if there is a winner or a tie after each move
  const winner = findWinner(gameBoard);
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => { // Delay the display of the alert message
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

// Add a click event listener to each button 
btnField.forEach((button) => {
  button.addEventListener('click', toggleClass)
});

// Confirm if the user wants to restart the game
const confirmRestart = (event) => {
  if (!confirm('Opravdu chces začit novou hru?')) {
    event.preventDefault();
  }
};
// Add a click event listener to the restart button
document.querySelector('.game__button--restart').addEventListener('click', confirmRestart);

