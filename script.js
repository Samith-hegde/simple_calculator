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

//displayScreen.textContent = '0';


document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (displayScreen.textContent === '0') {
      displayScreen.innerHTML = '';
      displayScreen.textContent = button.textContent;
    } else {
      displayScreen.textContent += button.textContent;
    }
  });
});