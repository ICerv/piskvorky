// Importing the findWinner function from an external module
import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle'; // Initializing the currentPlayer with 'o'


//Function to handle player moves
const makeMove = async (gameBoard, currentPlayer) => {
  // Creating an array of all buttons
  const btnField = Array.from(document.querySelectorAll('.game__field--btn'));
  // console.log(btnField)

  // Checking if it is the turn of the cross player
  if (currentPlayer === 'cross') {
    // Making a request to the API to get the suggested move
    const response = await fetch(
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
    // console.log(response)

    // Parsing the response data
    const data = await response.json()

    const { x, y } = data.position // x bude 0 a y bude 1, protože to je jediné volné políčko. x 0 odpovídá prvnímu sloupci a y 1 druhému řádku.
    // console.log(data)

    const field = x + (y * 10) // Najde políčko na příslušné pozici.
    gameBoard[field] = 'x'
    btnField[field].click() // Simuluje kliknutí. Spustí událost `click` na políčku.
    // console.log(field)

  }
  // console.log(makeMove(gameBoard, currentPlayer))

}


let gameBoard = []


// Function to toggle the class and make moves
const toggleClass = (event) => {
  // Initializing the game board with '_' if it is not yet defined
  if (gameBoard.length === 0) {
    gameBoard = Array(btnField.length).fill('_'); // Creating an array with '_'
  }
  console.log(gameBoard)
  event.target.classList.add(`game__field--${currentPlayer}`); // Toggling the class of the clicked button
  const btnIndex = btnField.indexOf(event.target); // Getting the index of the clicked button 
  // console.log(btnIndex)
  gameBoard[btnIndex] = currentPlayer === 'circle' ? 'o' : 'x;' // Making a move on the game board
  // console.log(gameBoard[btnIndex])

  event.target.disabled = true; // Disabling the clicked button after a move has been made
  // console.log("Hracuv tah na indexu: ", btnIndex);


  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    setTimeout(() => {        // Delaying the move of the 'x' player
      makeMove(gameBoard, currentPlayer)
    }, 250);
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
// Creating an array of all buttons
const btnField = Array.from(document.querySelectorAll('.game__field--btn'));
// console.log(btnField)

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

