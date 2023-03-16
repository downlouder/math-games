const diffButtons = document.querySelectorAll('.difficulty button');
const checkButton = document.querySelector('.check');
const input = document.querySelector('#result');
const currentDiff = document.querySelector('.currentDifficulty');
const expression = document.querySelector('.expression');
const output = document.querySelector('.output');
const arithmeticActions = ['add', 'sub', 'mul', 'div'];
const roundsStat = document.querySelector('.rounds');
const pointsStat = document.querySelector('.points');
const winRate = document.querySelector('.win-rate');

let points = localStorage.getItem('points') || 0;
let rounds = localStorage.getItem('rounds') || 0;
let resultExp = '';
let userResult = '';
let diffParams = [0, 10];

localStorage.setItem('points', points);
localStorage.setItem('rounds', rounds);
roundsStat.textContent = `Played rounds: ${localStorage.getItem('rounds')}`;
winRate.textContent = `Win rate: ${(localStorage.getItem('points') / localStorage.getItem('rounds') || 0).toFixed(2)}%`;
pointsStat.textContent = `Points: ${localStorage.getItem('points')}`;

function createExp(diffParams) {
  let exp = '';
  let action = arithmeticActions[Math.floor(Math.random() * arithmeticActions.length)];
  let firstNum = Math.floor(Math.random() * diffParams[1] + 1);
  let secondNum = Math.floor(Math.random() * diffParams[1] + 1);
  if (action === 'add') {
    exp = `${firstNum} + ${secondNum}`;
    resultExp = firstNum + secondNum;
  } else if (action === 'sub') {
    exp = `${firstNum} - ${secondNum}`;
    resultExp = firstNum - secondNum;
  } else if (action === 'mul') {
    exp = `${firstNum} * ${secondNum}`;
    resultExp = firstNum * secondNum;
  } else if (action === 'div') {
    resultExp = '.';
    while (resultExp.toString().includes('.') || resultExp === 1 || secondNum === 1) {
      firstNum = Math.floor(Math.random() * diffParams[1] + 1);
      secondNum = Math.floor(Math.random() * diffParams[1] + 1);
      exp = `${firstNum} / ${secondNum}`;
      resultExp = firstNum / secondNum;
    }
  }
  rounds++;
  localStorage.setItem('rounds', rounds);
  roundsStat.textContent = `Played rounds: ${localStorage.getItem('rounds')}`;
  winRate.textContent = `Win rate: ${(localStorage.getItem('points') / localStorage.getItem('rounds') || 0).toFixed(2)}%`;
  showExpression(exp);
  console.log(resultExp);
}

function showExpression(exp) {
  expression.textContent = exp;
}

function compareExp(expResult, userResult) {
  if (userResult == '') return;
  if (expResult == userResult) {
    output.className = 'output right';
    output.textContent = 'You are right';
    points++;
    createExp(diffParams);
  } else {
    output.className = 'output wrong';
    output.textContent = `You are wrong, last right answer is ${resultExp}`;
    points--;
    createExp(diffParams);
  }
  localStorage.setItem('points', points);
  pointsStat.textContent = `Points: ${localStorage.getItem('points')}`;
  winRate.textContent = `Win rate: ${(localStorage.getItem('points') / localStorage.getItem('rounds') || 0).toFixed(2)}%`;
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

diffButtons.forEach(button => button.addEventListener('click', () => {
  showDifficulty(button.textContent);
}));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkAnswer();
});

checkButton.addEventListener('click', checkAnswer);