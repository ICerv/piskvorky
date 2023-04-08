// A variable for storing the current player
let currentPlayer = 'circle';

//Function returns a function that adds a specified class to the target of the given event
const classToggle = (className) => (event) => event.target.classList.toggle(className);

// Functions to add the 'circle' and 'cross' classes, respectively
const toggleCircleClass = classToggle('game__field--circle');
const toggleCrossClass = classToggle('game__field--cross');

// Variable that keeps track of the number of times the button has been clicked
let switchCount = 0;

// Function is called when a button is clicked, and switches between the circle and cross classes based on the value of switchCount
const switchCircleCross = (event) => switchCount++ % 2 === 1 ? toggleCircleClass(event) : toggleCrossClass(event); // sice jsme se jeste neucily 'ternarni operator', ale pouzila jsem ho zde ze svych predchozich znalosti

// Selects the first 10 buttons and adds the event listener to switch the classes when clicked
document.querySelectorAll('button:nth-child(-n+10)').forEach((button) => button.addEventListener('click', switchCircleCross));












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