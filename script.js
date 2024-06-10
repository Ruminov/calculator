const displayTop = document.querySelector(".display-top");
const displayBottom = document.querySelector(".display-bottom");
const btnNumber = document.querySelectorAll("button.number");
const btnOperator = document.querySelectorAll("button.operator");
const btnResult = document.querySelector(".result");
const btnClear = document.querySelector(".clear");
const btnDelete = document.querySelector(".delete");
const btnFloat = document.querySelector(".float");
const btnNegate = document.querySelector(".negate");

let n1 = "";
let n2 = "";
let operator = "";
let hasN1 = false;
let hasN2 = false;
let hasOperator = false;

function getOperand(e) {
  // Limit number of operands to 8
  // if (n1.length > 8 || n2.length > 8) return;

  // Limit input of 0
  if (e.target.id === "0") {
    if (n1 === "0" && !hasOperator) return;
    if (n2 === "0") return;
  }

  // Get and display first operand
  const input = e.target.textContent;
  if (!hasN1 && n1.length < 9) {
    n1 === "0" ? (n1 = input) : (n1 += input);
    displayBottom.textContent = n1;
  }

  // Get and display second operand
  if (hasN1 && n2.length < 9) {
    n2 === "0" ? (n2 = input) : (n2 += input);
    displayBottom.textContent = n2;
    hasN2 = true;
  }
}

function getOperator(e) {
  if (n1 && operator && n2) {
    result(e);
  }

  // Get operator
  operator = e.target.textContent;

  // Show operand 1 and operator in display-top
  displayTop.textContent = `${n1} ${operator}`;

  // Continue to second operand
  // Enable result() function
  if (n1 && operator) {
    hasN1 = true;
    hasOperator = true;
  }
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

function result(e) {
  let total = n1;
  if (hasN2) {
    if (operator === "÷" && n2 === "0") {
      displayBottom.textContent = "ERROR DIV BY 0";
      n2 = "";
      return;
    }
    // Do math operation
    n1 = operate(n1, n2, operator).toString();

    // Limit float numbers
    if (!Number.isInteger(+n1)) n1 = Number(n1).toFixed(2);

    // Show total in display-bottom
    displayBottom.textContent = n1.length > 13 ? n1.slice(0, 14) : n1;

    // Show operand 1, operator and operand 2 in display-top
    if (e.target.matches(".result")) {
      displayTop.textContent = `${cut(total)} ${operator} ${cut(n2)} =`;
    } else {
      displayTop.textContent = `${cut(n1)} ${operator}`;
    }
  }
  hasOperator = false;
  hasN2 = false;
  n2 = "";
}

function clear() {
  n1 = "";
  n2 = "";
  displayTop.textContent = "";
  displayBottom.textContent = "0";
  operator = "";
  hasN1 = false;
  hasN2 = false;
  hasOperator = false;
}

function cut(n) {
  return n.length > 9 ? n.slice(0, 10) : n;
}

function deleteNum() {
  if (!hasN1) {
    n1 = n1.slice(0, -1);
    displayBottom.textContent = n1 ? n1 : 0;
  }
  if (n1 && n2) {
    n2 = n2.slice(0, -1);
    displayBottom.textContent = n2 ? n2 : 0;
  }
}

function float() {
  if (n1 && !hasN1 && !n1.includes(".")) {
    n1 += ".";
    displayBottom.textContent = n1;
  } else if (n2 && hasN1 && !n2.includes(".")) {
    n2 += ".";
    displayBottom.textContent = n2;
  }
}

function negate() {
  if (n1 && !hasOperator && !hasN2) {
    n1 = n1.includes("-") ? n1.replace("-", "") : `-${n1}`;
    displayBottom.textContent = n1;
  }
  if (hasN1 && n2) {
    n2 = n2.includes("-") ? n2.replace("-", "") : `-${n2}`;
    displayBottom.textContent = n2;
  }
}

const clickEvent = new Event("click");

// Add keyboard support
window.addEventListener("keydown", function (e) {
  const button = document.getElementById(e.key);

  if (button) {
    button.click();

    // Change button background color when clicked.
    button.classList.toggle("clicked");
    setTimeout(() => button.classList.toggle("clicked"), "150");
  }
  if (e.key === ",") {
    btnFloat.click();
    btnFloat.classList.toggle("clicked");
    setTimeout(() => btnFloat.classList.toggle("clicked"), "150");
  }
});

btnNumber.forEach((item) => item.addEventListener("click", getOperand));

btnOperator.forEach((item) => item.addEventListener("click", getOperator));

btnResult.addEventListener("click", result);
btnClear.addEventListener("click", clear);
btnDelete.addEventListener("click", deleteNum);
btnFloat.addEventListener("click", float);
btnNegate.addEventListener("click", negate);
