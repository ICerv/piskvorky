// A variable for storing the current player
let currentPlayer = 'circle';

// Getting first 10 buttons of the game field
const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10)');
// Add event listener that adds "circle"class to every button on which the user clicked
firstTenButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.target.classList.add('game__field--circle');
  })
})