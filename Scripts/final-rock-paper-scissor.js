let score = JSON.parse(localStorage.getItem('total2')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElements();

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('total2');
  updateScoreElements();
}

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-reset-confirm-yes reset-confirm-button">
    Yes
    </button>
    <button class="js-reset-confirm-no reset-confirm-button">
    No
    </button>
  `;

  document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  showResetConfirmation();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoplay();
});

let isAutoPlaying = false;
let intervalId;

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playerGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playerGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playerGame('paper');
  });

document.querySelector('.js-scissor-button')
  .addEventListener('click', () => {
    playerGame('scissor');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playerGame('rock');
  } else if (event.key === 'p') {
    playerGame('paper');
  } else if (event.key === 's') {
    playerGame('scissor');
  } else if (event.key === 'a') {
    autoplay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

function playerGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'You Tie';
    } else if (computerMove === 'paper') {
      result = 'You Lose';
    } else if (computerMove === 'scissor') {
      result = 'You Win';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win';
    } else if (computerMove === 'paper') {
      result = 'You Tie';
    } else if (computerMove === 'scissor') {
      result = 'You Lose';
    }
  } else if (playerMove === 'scissor') {
    if (computerMove === 'rock') {
      result = 'You Lose';
    } else if (computerMove === 'paper') {
      result = 'You Win';
    } else if (computerMove === 'scissor') {
      result = 'You Tie';
    }
  }
  if (result === 'You Win') {
    score.wins++;
  } else if (result === 'You Lose') {
    score.losses++;
  } else if (result === 'You Tie') {
    score.ties++;
  }

  localStorage.setItem('total2', JSON.stringify(score));
  updateScoreElements();

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-moves').innerHTML = `You
  <img src="Images/${playerMove}-emoji.png" class="move-icon">
  <img src="Images/${computerMove}-emoji.png" class="move-icon">Computer`;
}

function updateScoreElements() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber > 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber > 2 / 3 && randomNumber < 2) {
    computerMove = 'scissor';
  }
  return computerMove;
}
