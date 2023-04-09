
// sice jsme se jeste neucily 'ternarni operator', ale hodil se mi a pouzila jsem ho zde na zaklade svych predchozich znalosti

/*const toggleClass = (event) => {
  const classToAdd = currentPlayer === 'circle' ? 'game__field--circle' : 'game__field--cross';
  const classToRemove = currentPlayer === 'circle' ? 'game__player--circle' : 'game__player--cross';
  const classToAddPlayer = currentPlayer === 'circle' ? 'game__player--cross' : 'game__player--circle';
*/
let currentPlayer = 'circle';
let switchCount = 0;

const toggleClass = (event) => {
  const classToAdd = 'game__field--' + (currentPlayer === 'circle' ? 'circle' : 'cross');
  const classToRemove = 'game__player--' + (currentPlayer === 'circle' ? 'circle' : 'cross');
  const classToAddPlayer = 'game__player--' + (currentPlayer === 'circle' ? 'cross' : 'circle');

  event.target.classList.add(classToAdd, 'zoom');
  document.querySelector('span').classList.remove(classToRemove);
  document.querySelector('span').classList.add(classToAddPlayer);
  event.target.disabled = true;

  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
  switchCount++;
};

const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10)');
for (let i = 0; i < firstTenButtons.length; i++) {
  firstTenButtons[i].addEventListener('click', toggleClass);
};

const confirmRestart = (event) => {
  if (!confirm('Opravdu chces začit novou hru?')) {
    event.preventDefault();
  }
};
document.querySelector('.game__button--restart').addEventListener('click', confirmRestart);














///////////////////
// const addCircleClass = (event) => {
//   event.target.classList.add('game__field--circle')
// };

// const addCrossClass = (event) => {
//   event.target.classList.add('game__field--cross')
// };

// let switchCount = 0;

// const switchCircleCross = () => {
//   switchCount++;
//   if (switchCount % 2 === 1) {
//     addCircleClass(event);
//   } else {
//     addCrossClass(event);
//   }
// };

// const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10');
// firstTenButtons.forEach((button) => {
//   button.addEventListener('click', switchCircleCross);
// });
/////////////////////////////////////////////////////////////
// // Getting first 10 buttons of the game field
// const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10)');
// // Add event listener that adds "circle"class to every button on which the user clicked
// firstTenButtons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     event.target.classList.add('game__field--circle');
//   })
// })