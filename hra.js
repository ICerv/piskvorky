// A variable for storing the current player
let currentPlayer = 'circle';

// // Getting first 10 buttons of the game field
// const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10)');
// // Add event listener that adds "circle"class to every button on which the user clicked
// firstTenButtons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     event.target.classList.add('game__field--circle');
//   })
// })

const addCircleClass = (event) => {
  event.target.classList.add('game__field--circle')
};

const addCrossClass = (event) => {
  event.target.classList.add('game__field--cross')
};

let switchCount = 0;

const switchCircleCross = () => {
  switchCount++;
  if (switchCount % 2 === 1) {
    addCircleClass(event);
  } else {
    addCrossClass(event);
  }
};

const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10');
firstTenButtons.forEach((button) => {
  button.addEventListener('click', switchCircleCross);
});