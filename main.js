const diffButtons = document.querySelectorAll('.difficulty button');
const checkButton = document.querySelector('.check');
const input = document.querySelector('#result');
const currentDiff = document.querySelector('.currentDifficulty');

function showDifficulty(diff) {
  currentDiff.textContent = (`Current Difficulty: ${diff}`)
}

diffButtons.forEach(button => button.addEventListener('click', () => {
  showDifficulty(button.textContent);
}));

checkButton.addEventListener('click', () => {
  console.log(input.value);
  input.value = '';
})