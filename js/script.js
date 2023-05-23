// grid section
function getGridSize() {
  const userValue = prompt("Enter new grid size (128 max):");
  const userValueInt = parseInt(userValue);
  if (!userValue) {
    return;
  } else if (userValueInt > 0 && userValueInt < 128) {
    return userValueInt;
  } else if (userValueInt >= 128) {
    return 128;
  } else {
    alert("Please enter correct value");
    return;
  }
}

function createGrid(size) {
  if (typeof size === "object") {
    size = 16;
  }
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let k = 0; k < size; k++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function deleteGrid() {
  const rows = document.querySelectorAll(".row");
  rows.forEach(row => row.remove());
}

function changeGridSize() {
  let newSize = getGridSize();
  if (!newSize) return;
  deleteGrid();
  createGrid(newSize);
}

function resetGrid() {
  const currentGridSize = container.childNodes.length;
  deleteGrid();
  createGrid(currentGridSize);
}
// draw section
function drawBlack(event) {
  if (event.target.classList == "cell") {
    event.target.style.backgroundColor = "black";
  }
}

function drawWhite(event) {
  if (event.target.classList == "cell") {
    event.target.style.backgroundColor = "white";
  }
}

function drawGrayscale(event) {
  if (event.target.classList == "cell") {
    const currentCell = event.target;
    if (!currentCell.style.backgroundColor) {
      currentCell.style.backgroundColor = "rgb(230, 230, 230)";
    } else if (currentCell.style.backgroundColor === "rgb(0, 0, 0)") {
      return;
    } else {
      const currentRgbValue = parseInt(currentCell.style.backgroundColor.match(/(?:\d+)/));
      const step = 25.5;
      const newRgbValue = currentRgbValue - step;
      currentCell.style.backgroundColor = `rgb(${newRgbValue}, ${newRgbValue}, ${newRgbValue})`;
    }
  }
}

function randomRGB() {
  const random255 = () => Math.floor(Math.random() * 256);
  return `rgb(${random255()}, ${random255()}, ${random255()})`;
}

function drawRandom(event) {
  if (event.target.classList == "cell") {
    const currentCell = event.target;
    let currentColor = randomRGB();
    if (!currentCell.style.backgroundColor) {
      currentCell.style.backgroundColor = currentColor;
    } else {
      currentColor = randomRGB();
      currentCell.style.backgroundColor = currentColor;
    }
  }
}

function applyButtonFX(event) {
  colorButtons.forEach(button => button.classList.remove("active-mode"));
  event.target.classList.add("active-mode");
}

function setColorMode(event) {
  drawColor = event.target.getAttribute("data-mode");
  applyButtonFX(event);
}

function colorCell(event) {
  switch (drawColor) {
    case "black":
      drawBlack(event);
      break;
    case "grayscale":
      drawGrayscale(event);
      break;
    case "random":
      drawRandom(event);
      break;
    case "eraser":
      drawWhite(event);
      break;
    default:
      alert("something went horribly wrong");
  }
}

function startDrawing(event) {
  this.addEventListener("mouseover", colorCell);
  this.addEventListener("mousedown", colorCell);
}

function stopDrawing(event) {
  this.removeEventListener("mouseover", colorCell);
}

let drawColor = "black" // default draw color

const container = document.querySelector(".container");
const gridSizeButton = document.querySelector(".grid-size");
const clearButton = document.querySelector(".clear");
const colorButtons = document.querySelectorAll(".color");

window.addEventListener("load", createGrid);
window.addEventListener("mousedown", startDrawing);
window.addEventListener("mouseup", stopDrawing);
window.addEventListener("mouseleave", stopDrawing);

gridSizeButton.addEventListener("click", changeGridSize);
colorButtons.forEach(button => button.addEventListener("click", setColorMode));
clearButton.addEventListener("click", resetGrid);