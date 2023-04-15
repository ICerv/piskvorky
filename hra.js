import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle';

const toggleClass = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.add('game__field--circle');
    document.querySelector('span').classList.remove('game__player--circle');
    document.querySelector('span').classList.add('game__player--cross');
    currentPlayer = 'cross';
  } else if (currentPlayer === 'cross') {
    event.target.classList.add('game__field--cross');
    document.querySelector('span').classList.remove('game__player--cross');
    document.querySelector('span').classList.add('game__player--circle');
    currentPlayer = 'circle';
  }
  event.target.disabled = true;

};

document.querySelectorAll('.game__field--btn').forEach((button) => {
  button.addEventListener('click', toggleClass)
});

const confirmRestart = (event) => {
  if (!confirm('Opravdu chces začit novou hru?')) {
    event.preventDefault();
  }
};
document.querySelector('.game__button--restart').addEventListener('click', confirmRestart);








/*
const firstTenButtons = document.querySelectorAll('button:nth-child(-n+10)');
for (let i = 0; i < firstTenButtons.length; i++) {
  firstTenButtons[i].addEventListener('click', toggleClass);
};
*/