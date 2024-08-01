let operand1;
let operand2;
let operator;
let displayScreen = document.querySelector('.display-screen');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function evaluate(operand1, operator, operand2) {
  if (operand2===0) {
    return 'Cannot divide by zero';
  }
  switch (operator) {
    case '+':
      return add(operand1, operand2);
    case '-':
      return subtract(operand1, operand2);
    case '*':
      return multiply(operand1, operand2);
    case '/':
      return divide(operand1, operand2);
    case '%':
      return modulo(operand1, operand2);
    default:
      return 'Invalid operator';
  }
}

displayScreen.textContent = '0';

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (displayScreen.textContent === '0') {
      displayScreen.textContent = button.textContent;
    } else {
      displayScreen.textContent += button.textContent;
    }
  });
});

const clearButton = document.getElementById('clearButton');
const backButton = document.getElementById('backButton');
const equalsButton = document.getElementById('equalsButton');

function handleClearButton() {
  displayScreen.textContent = '0';
}

function handleBackButton() {
  const displayString = displayScreen.textContent;
  if (displayString.length === 1) {
    displayScreen.textContent = '0';
  } else {
    displayScreen.textContent = displayString.slice(0, displayString.length - 1);
  }
}

function handleEqualsButton() {
  const displayString = displayScreen.textContent;
  console.log(displayString);
  const operatorIndex = displayString.search(/[\+\-\*\/\%]/);
  if (operatorIndex === -1) {
    displayScreen.textContent = displayString;
    return;
  }
  operand1 = parseFloat(displayString.slice(0, operatorIndex));
  console.log(displayString.slice(0, operatorIndex));
  console.log(operand1);
  operator = displayString[operatorIndex];
  operand2 = parseFloat(displayString.slice(operatorIndex + 1));
  console.log(operand2);
  displayScreen.textContent = evaluate(operand1, operator, operand2);  
}

backButton.addEventListener('click', handleBackButton);
clearButton.addEventListener('click', handleClearButton);
equalsButton.addEventListener('click', handleEqualsButton);