// sice jsme se jeste neucily 'ternarni operator', ale hodil se mi a pouzila jsem ho zde na zaklade svych predchozich znalosti

let currentPlayer = 'circle';
let switchCount = 0;

const toggleClass = (event) => {
  const classToAdd = currentPlayer === 'circle' ? 'game__field--circle' : 'game__field--cross';
  const classToRemove = currentPlayer === 'circle' ? 'game__player--circle' : 'game__player--cross';
  const classToAddPlayer = currentPlayer === 'circle' ? 'game__player--cross' : 'game__player--circle';

  event.target.classList.add(classToAdd);
  document.querySelector('span').classList.remove(classToRemove);
  document.querySelector('span').classList.add(classToAddPlayer);
  event.target.disabled = true;

  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
  switchCount++;
};

document.querySelectorAll('.game__field--btn').forEach((button) => {
  button.addEventListener('click', toggleClass)
});

/*
const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10)');
for (let i = 0; i < firstTenButtons.length; i++) {
  firstTenButtons[i].addEventListener('click', toggleClass);
};
*/

const confirmRestart = (event) => {
  if (!confirm('Opravdu chces začit novou hru?')) {
    event.preventDefault();
  }
};
document.querySelector('.game__button--restart').addEventListener('click', confirmRestart);
