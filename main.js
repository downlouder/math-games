const diffButtons = document.querySelectorAll('.difficulty button');
const checkButton = document.querySelector('.check');
const input = document.querySelector('#result');
const currentDiff = document.querySelector('.currentDifficulty');
const expression = document.querySelector('.expression');
const output = document.querySelector('.output');
const roundsStat = document.querySelector('.rounds');
const pointsStat = document.querySelector('.points');
const winRate = document.querySelector('.win-rate');
const settingsButtons = document.querySelectorAll('.settings button');

let arithmeticActions = ['+', '-', '*', '/'];
let points = localStorage.getItem('points') || 0;
let rounds = localStorage.getItem('rounds') || 0;
let winRounds = localStorage.getItem('winRounds') || 0;
let resultExp = '';
let userResult = '';
let diffParams = [0, 10];

setArgsToLocal(rounds, winRounds, points)

function createExp(diffParams) {
  let exp = '';
  let action = arithmeticActions[Math.floor(Math.random() * arithmeticActions.length)];
  let firstNum = Math.floor(Math.random() * diffParams[1] + 1);
  let secondNum = Math.floor(Math.random() * diffParams[1] + 1);
  if (action === '+') {
    exp = `${firstNum} + ${secondNum}`;
    resultExp = firstNum + secondNum;
  } else if (action === '-') {
    exp = `${firstNum} - ${secondNum}`;
    resultExp = firstNum - secondNum;
  } else if (action === '*') {
    exp = `${firstNum} * ${secondNum}`;
    resultExp = firstNum * secondNum;
  } else if (action === '/') {
    resultExp = '.';
    while (resultExp.toString().includes('.') || resultExp === 1 || secondNum === 1) {
      firstNum = Math.floor(Math.random() * diffParams[1] + 1);
      secondNum = Math.floor(Math.random() * diffParams[1] + 1);
      exp = `${firstNum} / ${secondNum}`;
      resultExp = firstNum / secondNum;
    }
  }
  showExpression(exp);
  console.log(resultExp);
}

function showExpression(exp) {
  expression.textContent = exp;
}

function setArgsToLocal(rounds, winRounds, points) {
  localStorage.setItem('rounds', rounds);
  localStorage.setItem('winRounds', winRounds);
  localStorage.setItem('points', points);
  roundsStat.textContent = `Played rounds: ${localStorage.getItem('rounds')}`;
  winRate.textContent = `Win rate: ${(localStorage.getItem('points') / localStorage.getItem('rounds') || 0).toFixed(2)}%`;
  pointsStat.textContent = `Points: ${localStorage.getItem('points')}`;
  winRate.textContent = `Win rate: ${((localStorage.getItem('winRounds') / localStorage.getItem('rounds') || 0).toFixed(2)) * 100}%`;
}

function clearLocalStorage() {
  localStorage.clear();
}

function compareExp(expResult, userResult) {
  if (userResult == '') return;
  if (expResult == userResult) {
    output.className = 'output right';
    output.textContent = 'You are right';
    winRounds++;
    points++;
    createExp(diffParams);
  } else {
    output.className = 'output wrong';
    output.textContent = `You are wrong, last right answer is ${resultExp}`;
    points--;
    createExp(diffParams);
  }
  rounds++;
  setArgsToLocal(rounds, winRounds, points);
}

function checkAnswer() {
  compareExp(resultExp, input.value);
  input.value = '';
}

function showDifficulty(diff) {
  currentDiff.innerHTML = `Current Difficulty: <span class="${diff}">${diff}</span>`;
  if (diff === 'Easy') diffParams = [0, 10];
  else if (diff === 'Medium') diffParams = [2, 50];
  else if (diff === 'Hard') diffParams = [5, 100];
  else if (diff === 'Insane') diffParams = [15, 600];
  createExp(diffParams);
}

function toggleActive(button) {
  if (button.dataset.bool === 'true') button.dataset.bool = false;
  else if (button.dataset.bool === 'false') button.dataset.bool = true;
}

function setArithmeticActions(button) {
  if (button.dataset.bool === 'true') {
    arithmeticActions.push(button.dataset.operation);
  } else if (button.dataset.bool === 'false') {
    arithmeticActions = arithmeticActions.filter(action => !action.includes(button.dataset.operation));
  }
}

diffButtons.forEach(button => button.addEventListener('click', () => {
  showDifficulty(button.textContent);
}));

settingsButtons.forEach(button => {
  button.addEventListener('click', () => toggleActive(button));
  button.addEventListener('click', () => setArithmeticActions(button));
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkAnswer();
});

checkButton.addEventListener('click', checkAnswer);