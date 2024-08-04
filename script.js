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
let operand = null;
let value = null;
let count = 0;

// Initial Setup
displayScreen.textContent = '0';

// Arithmetic Operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (a / b).toFixed(6);
const modulo = (a, b) => a % b;

// Check if Operand has Multiple Decimals
const hasMultipleDecimals = (operand) => {
  const str = operand.toString();
  return str.indexOf('.') !== str.lastIndexOf('.');
}

// Evaluate Expression
const evaluate = (operand1, operator, operand2) => {
  if (operator === '/' && operand2 === 0) {
    return 'Cannot divide by zero';
  }
  switch (operator) {
    case '+':
      return Math.round(add(operand1, operand2)*1000000) / 1000000;
    case '-':
      return Math.round(subtract(operand1, operand2)*1000000) / 1000000;
    case '*':
      return Math.round(multiply(operand1, operand2)*1000000) / 1000000;
    case '/':
      return Math.round(divide(operand1, operand2)*1000000) / 1000000;
    case '%':
      return Math.round(modulo(operand1, operand2)*1000000) / 1000000;
    default:
      return 'Invalid operator';
  }
};

// Button Handlers
const handleButtonClick = (event) => {
  const length = displayScreen.textContent.length;
  if (length >= 10) {
    return;
  }
  const buttonText = event.target.textContent;
  const operatorIndex = operationString.search(/[\+\-\*\/\%]/);
  if (operatorIndex !== -1 && ['+', '-', '*', '/', '%'].includes(buttonText)) {
    handleEqualsButton();
  }
  if (displayScreen.textContent === '0' || ['+', '-', '*', '/', '%'].includes(lastButtonPressed)) {
    displayScreen.textContent = buttonText;
  } else {
    displayScreen.textContent += buttonText;
  }
  lastButtonPressed = buttonText;
  operationString += buttonText;
};

// Clear Display
const handleClearButton = () => {
  displayScreen.textContent = '0';
  operationString = '';
  operand1 = operand2 = operator = null;
};

// Backspace
const handleBackButton = () => {
  const displayString = displayScreen.textContent;
  if (displayString.length === 1) {
    displayScreen.textContent = '0';
  } else {
    displayScreen.textContent = displayString.slice(0, -1);
  }
  operationString = operationString.slice(0, -1);
};

// Equals Button
const handleEqualsButton = () => {
  const operatorIndex = operationString.search(/[\+\-\*\/\%]/);
  if (operatorIndex === -1) {
    displayScreen.textContent = operationString;
    return;
  }
  operand1 = operationString.slice(0, operatorIndex);
  operand2 = operationString.slice(operatorIndex + 1);
  if (hasMultipleDecimals(operand1) || hasMultipleDecimals(operand2)) {
    displayScreen.textContent = 'Invalid Input';
    operationString = '';
    return;
  }
  operand1 = parseFloat(operand1);
  operator = operationString[operatorIndex];
  operand2 = parseFloat(operand2);
  displayScreen.textContent = evaluate(operand1, operator, operand2);
  operationString = displayScreen.textContent;
};

// Keyboard Support
const handleKeyPress = (event) => {
  const key = event.key;

  if (key === 'Enter') {
    handleEqualsButton();
  }
  else if (key === 'Backspace') {
    handleBackButton();
  }
  else if (key === 'Escape') {
    handleClearButton();
  }
  else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
    handleButtonClick({ target: { textContent: key } });
  }
  else if (key >= '0' && key <= '9') {
    handleButtonClick({ target: { textContent: key } });
  }
};

// Event Listeners
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

backButton.addEventListener('click', handleBackButton);
clearButton.addEventListener('click', handleClearButton);
equalsButton.addEventListener('click', handleEqualsButton);
document.addEventListener('keydown', handleKeyPress);