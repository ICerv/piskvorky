// Import the findWinner function from an external module
import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'o';

// Create an array of all buttons
const btnField = Array.from(document.querySelectorAll('.game__field--btn'));

// Disable all buttons before making a request to API
const disableAllButtons = () => {
  btnField.forEach(button => button.disabled = true);
}

// Enable only empty buttons after the response is received
const enableEmptyButtons = () => {
  btnField.forEach(button => {
    if (!button.classList.contains('game__field--o') && !button.classList.contains('game__field--x')) {
      button.disabled = false;
    }
  });
};

//Function to handle 'x' player moves
const makeMove = async (gameBoard, currentPlayer) => {
  disableAllButtons();

  if (currentPlayer === 'x') {
    const response = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: gameBoard,
        player: 'x',
      }),
    });
    enableEmptyButtons();

    const data = await response.json()
    const { x, y } = data.position;

    const field = btnField[x + y * 10]; // Find the element at the corresponding position
    field.click() // Simulate  a click. Trigger the click event on the element
  };
};

// Initialize the game board with '_' if it is not yet defined
const gameBoard = Array(btnField.length).fill('_');

// Function to toggle the class and make moves
const toggleClass = (event) => {
  const btnIndex = btnField.indexOf(event.target); // Get the index of the clicked button 

  event.target.classList.add(`game__field--${currentPlayer}`);

  event.target.disabled = true; // Disable the clicked button after a move has been made

  if (currentPlayer === 'o') {
    currentPlayer = 'x';
    gameBoard[btnIndex] = 'o';
    document.querySelector('span').classList.remove('game__player--o');
    document.querySelector('span').classList.add('game__player--x');
  } else {
    currentPlayer = 'o';
    gameBoard[btnIndex] = 'x';
    document.querySelector('span').classList.remove('game__player--x');
    document.querySelector('span').classList.add('game__player--o');
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
  } else if (currentPlayer === 'x') {
    makeMove(gameBoard, 'x')
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

