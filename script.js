// DOM Elements
const displayScreen = document.querySelector('.display-screen');
const clearButton = document.getElementById('clearButton');
const backButton = document.getElementById('backButton');
const equalsButton = document.getElementById('equalsButton');

// State Variables
let operand1 = null;
let operand2 = null;
let operator = null;
let lastButtonPressed = '';
let operationString = '';

// Initial Setup
displayScreen.textContent = '0';

// Arithmetic Operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const modulo = (a, b) => a % b;

// Evaluate Expression
const evaluate = (operand1, operator, operand2) => {
  if (operator === '/' && operand2 === 0) {
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
};

// Button Handlers
const handleButtonClick = (event) => {
  const buttonText = event.target.textContent;
  if (displayScreen.textContent === '0' || ['+', '-', '*', '/', '%'].includes(lastButtonPressed)) {
    displayScreen.textContent = buttonText;
  } else {
    displayScreen.textContent += buttonText;
  }
  lastButtonPressed = buttonText;
  operationString += buttonText;
};

const handleClearButton = () => {
  displayScreen.textContent = '0';
  operationString = '';
  operand1 = operand2 = operator = null;
};

const handleBackButton = () => {
  const displayString = displayScreen.textContent;
  if (displayString.length === 1) {
    displayScreen.textContent = '0';
  } else {
    displayScreen.textContent = displayString.slice(0, -1);
  }
  operationString = operationString.slice(0, -1);
};

const handleEqualsButton = () => {
  const operatorIndex = operationString.search(/[\+\-\*\/\%]/);
  if (operatorIndex === -1) {
    displayScreen.textContent = operationString;
    return;
  }
  operand1 = parseFloat(operationString.slice(0, operatorIndex));
  operator = operationString[operatorIndex];
  operand2 = parseFloat(operationString.slice(operatorIndex + 1));
  displayScreen.textContent = evaluate(operand1, operator, operand2);
  operationString = displayScreen.textContent;
};

// Event Listeners
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

backButton.addEventListener('click', handleBackButton);
clearButton.addEventListener('click', handleClearButton);
equalsButton.addEventListener('click', handleEqualsButton);