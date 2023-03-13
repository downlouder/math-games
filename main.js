const diffButtons = document.querySelectorAll('.difficulty button');
const checkButton = document.querySelector('.check');
const input = document.querySelector('#result');
const currentDiff = document.querySelector('.currentDifficulty');
const expression = document.querySelector('.expression');
const arithmeticActions = ['add', 'sub', 'mul', 'div'];

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
    exp = `${firstNum} / ${secondNum}`;
    resultExp = firstNum / secondNum;
  }
  showExpression(exp);
  console.log(exp)
  console.log(resultExp);
}

function showExpression(exp) {
  expression.textContent = exp;
}

function compareExp(expResult, userResult) {
  if (expResult == userResult) {
    console.log('You are right')
  } else {
    console.log('You are wrong')
  }
}

function showDifficulty(diff) {
  currentDiff.textContent = (`Current Difficulty: ${diff}`);
  if (diff === 'Easy') diffParams = [0, 10];
  else if (diff === 'Moderate') diffParams = [0, 50];
  else if (diff === 'Hard') diffParams = [0, 100];
  else if (diff === 'Insane') diffParams = [0, 500];
  createExp(diffParams);
}

diffButtons.forEach(button => button.addEventListener('click', () => {
  showDifficulty(button.textContent);
}));

checkButton.addEventListener('click', () => {
  console.log(input.value);
  compareExp(resultExp, input.value);
  input.value = '';
})