const diffButtons = document.querySelectorAll('.difficulty button');
const checkButton = document.querySelector('.check');
const input = document.querySelector('#result');
const currentDiff = document.querySelector('.currentDifficulty');
const expression = document.querySelector('.expression');
const arithmeticActions = ['add', 'sub', 'mul', 'div'];
const output = document.querySelector('.output');

let resultExp = '';
let userResult = '';
let diffParams = [0, 10];

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
  showExpression(exp);
  console.log(resultExp);
}

function showExpression(exp) {
  expression.textContent = exp;
}

function compareExp(expResult, userResult) {
  if (userResult == '') return;
  if (expResult == userResult) {
    console.log('You are right')
    output.textContent = 'You are right';
    createExp(diffParams);
  } else {
    console.log('You are wrong')
    output.textContent = 'You are wrong';
  }
}

function checkAnswer() {
  compareExp(resultExp, input.value);
  input.value = '';
}

function showDifficulty(diff) {
  currentDiff.textContent = (`Current Difficulty: ${diff}`);
  if (diff === 'Easy') diffParams = [0, 10];
  else if (diff === 'Moderate') diffParams = [5, 50];
  else if (diff === 'Hard') diffParams = [10, 100];
  else if (diff === 'Insane') diffParams = [40, 600];
  createExp(diffParams);
}

diffButtons.forEach(button => button.addEventListener('click', () => {
  showDifficulty(button.textContent);
}));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkAnswer();
});

checkButton.addEventListener('click', () => checkAnswer)

