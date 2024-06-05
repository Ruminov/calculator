const display = document.querySelector("p.display");
const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let n1 = "";
let n2 = "";

function writeNum(e) {
  if (!characters.includes(e.key)) return;
  n1 ? (n1 += e.key) : (n1 = e.key);
}

function writeFloatNum(e) {
  if ([",", "."].includes(e.key) && !n1.includes(",")) n1 += ",";
  display.textContent = n1;
}

function deleteNum(e) {
  if (e.key === "Backspace") {
    n1 = n1.slice(0, -1);
  }
  display.textContent = n1;
}

function clear(e) {
  if (e.key === "r") {
    n1 = "";
    n2 = "";
    display.textContent = "0";
  }
}

function showNum(e) {
  if (e.key === "Enter") return;
  console.log("Boom");
}

function operate() {}

document.addEventListener("keydown", writeNum);
document.addEventListener("keydown", deleteNum);
document.addEventListener("keydown", clear);
