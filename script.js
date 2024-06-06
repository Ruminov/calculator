const displayTop = document.querySelector(".display-top");
const displayBottom = document.querySelector(".display-bottom");
const btnNumber = document.querySelectorAll("button.number");
const btnOperator = document.querySelectorAll("button.operator");
const btnResult = document.querySelector(".result");

let n1 = "";
let n2 = "";
let operator = "";
let getN2 = false;
let getResult = false;

function getOperand(e) {
  const input = e.target.textContent;

  // Get first operand
  if (!getN2) {
    n1 ? (n1 += input) : (n1 = input);

    // Add first operand to calc display
    displayBottom.textContent = n1;
  }

  // Get second operand
  if (getN2) {
    n2 = input;
    displayBottom.textContent = n2;
  }
}

function getOperator(e) {
  // Get operator
  operator = e.target.textContent;

  // Continue to second operand
  getN2 = true;
  getResult = true;

  // Add first operand and operator to calc top display
  displayTop.textContent = `${n1} ${operator}`;
}

function result() {
  displayTop.textContent = `${n1} ${operator} ${n2} =`;
  if (getResult) n1 = operate(n1, n2, operator);

  // Show result in calc top display
  // displayTop.textContent += ` ${n2} =`;

  displayBottom.textContent = n1;
  getResult = false;
}

function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(n1, n2, op) {
  let a = Number(n1);
  let b = Number(n2);
  console.log(typeof n1);
  switch (op) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return substract(a, b);
      break;
    case "×":
      return multiply(a, b);
      break;
    case "÷":
      return divide(a, b);
  }
}

btnNumber.forEach((item) => item.addEventListener("click", getOperand));

btnOperator.forEach((item) => item.addEventListener("click", getOperator));

btnResult.addEventListener("click", result);
