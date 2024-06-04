const wrapper = document.querySelector(".wrapper");
const display = document.querySelector("p.number");

const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];

let n1;
let n2;

function writeNum(e) {
  if (characters.includes(e.key)) n1 ? (n1 += e.key) : (n1 = e.key);
  display.textContent = n1;
}

function deleteNum(e) {
  if (e.key === "Backspace") {
    n1.textContent = n1.textContent.slice(0, -1);
  }
}

function showNum(e) {
  if (e.key === "Enter") console.log(n1.textContent);
}

function operate() {}

document.addEventListener("keydown", writeNum);
document.addEventListener("keydown", deleteNum);
document.addEventListener("keydown", showNum);
